import React, { Fragment, useEffect, useState } from 'react';
import * as PropTypes from 'prop-types';

import { DragDropContext } from 'react-beautiful-dnd';
import Column from '../../../Column/Column';
import ItemGroupDroppable from '../../../Column/ItemGroupDroppable';
import TabControls from './TabControls';
import ItemGroupSelect from '../../../Column/ItemGroupSelect';
import { useMapState } from '../../../../context/MapProvider';

const MapFields = ( {
  form, mapping, doSave, doNext, getDefaultMapping, getMappingErrors,
  isDirty, setDirty, needsUpdate, setUpdated, publishReminder
} ) => {
  const mappingExists = mapping && mapping.fields && Object.values( mapping.fields ).length > 0;
  const [state, setState] = useState( () => {
    if ( mappingExists ) {
      if ( !mapping.form ) mapping.form = form;
      return mapping;
    }
    if ( form && form.length > 0 ) {
      return getDefaultMapping( form );
    }
    return getDefaultMapping( [] );
  } );
  const [errors, setErrors] = useState( [] );

  const { eventCounts } = useMapState();

  const onDragEnd = ( result ) => {
    const { destination, draggableId, source } = result;
    const { fields } = state;

    if ( !destination ) {
      return;
    }

    if (
      destination.droppableId === source.droppableId
      && destination.index === source.index
    ) {
      return;
    }

    const startGroup = source.droppableId;
    const endGroup = destination.droppableId;

    if ( startGroup === endGroup ) {
      const { [startGroup]: start } = state;

      const newOrder = Array.from( start );
      newOrder.splice( source.index, 1 );
      newOrder.splice( destination.index, 0, fields[draggableId] );

      setState( {
        ...state,
        [startGroup]: newOrder
      } );
    }

    if ( startGroup !== endGroup ) {
      const { [startGroup]: start } = state;
      const { [endGroup]: end } = state;

      const removeFromColumn = Array.from( start );
      const addToColumn = Array.from( end );

      removeFromColumn.splice( source.index, 1 );
      addToColumn.splice( destination.index, 0, fields[draggableId] );

      setState( {
        ...state,
        [startGroup]: removeFromColumn,
        [endGroup]: addToColumn
      } );
    }
    setDirty( true );
  };

  const checkErrors = () => {
    const errs = getMappingErrors( state );
    setErrors( errs );
    return errs.length !== 0;
  };

  const handleClear = () => {
    setState( getDefaultMapping( form ) );
  };

  const handleRevert = () => {
    setState( mapping );
    setDirty( false );
  };

  const handleTopic = ( topicIds ) => {
    setState( { ...state, topicFields: topicIds.map( id => state.fields[id] ) } );
    setDirty( true );
  };

  const handleSave = () => {
    if ( !checkErrors() ) {
      doSave( state )
        .then( () => setDirty( false ) )
        .catch( ( err ) => {
          if ( err.error ) {
            setErrors( [`API Error: ${err.error}`] );
          } else {
            setErrors( [err.toString()] );
          }
        } );
    }
  };

  useEffect( () => {
    if ( needsUpdate ) {
      if ( !mapping ) {
        setState( getDefaultMapping( form ) );
        setDirty( true );
      } else {
        setState( mapping );
        setDirty( false );
      }
      setUpdated();
    }
  }, [
    form, mapping, needsUpdate
  ] );

  useEffect( () => {
    if ( isDirty ) {
      checkErrors();
    }
  }, [state] );

  const {
    availableFields, nameFields, locationFields, dateFields, timeFields, additionalFields, topicFields
  } = state;

  const warningText = 'Warning: Saving a new mapping will delete any existing events associated with this map.';
  const showWarning = eventCounts.total !== '0' && isDirty;

  return (
    <Fragment>
      <div className="react-tabs__tab-panel--inner">
        <div className="iip-map-admin-screendoor-dragdrop">
          <DragDropContext onDragEnd={ onDragEnd }>
            <Column title="Available Fields">
              <ItemGroupDroppable data={ availableFields } id="availableFields" />
            </Column>
            <div className="iip-map-admin-column-vertical">
              <Column title="Map Topic (duplicates allowed):">
                <Fragment>
                  <ItemGroupSelect
                    required
                    data={ availableFields }
                    selected={ topicFields }
                    id="topicField"
                    title="Topic:"
                    subtext="Fields mapped here can also be mapped to other sections."
                    hasError={ errors.includes( 'topic' ) }
                    handleTopic={ handleTopic }
                  />
                </Fragment>
              </Column>
              <Column title="Map To:">
                <ItemGroupDroppable
                  required
                  data={ nameFields }
                  id="nameFields"
                  title="Item Name:"
                  hasError={ errors.includes( 'name' ) }
                />
                <ItemGroupDroppable
                  required
                  data={ locationFields }
                  id="locationFields"
                  title="Location:"
                  hasError={ errors.includes( 'location' ) }
                />
                <ItemGroupDroppable data={ dateFields } id="dateFields" title="Date:" />
                <ItemGroupDroppable data={ timeFields } id="timeFields" title="Time:" />
                <ItemGroupDroppable data={ additionalFields } id="additionalFields" title="Additional Data:" />
              </Column>
            </div>
          </DragDropContext>
        </div>
      </div>
      <TabControls
        publishReminder={ publishReminder }
        handleSave={ handleSave }
        errors={ errors.length > 0 ? ['Sections outlined in red require at least 1 field mapping'] : [] }
        warning={ showWarning ? warningText : null }
      >
        <button
          key="map-fields-clear"
          className="button button-large"
          type="button"
          onClick={ handleClear }
        >
          Clear Mapping
        </button>
        <button
          key="map-fields-revert"
          className="button button-large"
          type="button"
          disabled={ !isDirty || !mappingExists }
          onClick={ handleRevert }
        >
          Revert Changes
        </button>
        <button
          key="map-fields-skip"
          className="button button-large"
          type="button"
          disabled={ isDirty || !mappingExists }
          onClick={ doNext }
        >
          Skip
        </button>
      </TabControls>
    </Fragment>
  );
};

MapFields.propTypes = {
  needsUpdate: PropTypes.bool,
  publishReminder: PropTypes.bool,
  form: PropTypes.array,
  mapping: PropTypes.object,
  doSave: PropTypes.func,
  doNext: PropTypes.func,
  isDirty: PropTypes.bool,
  setDirty: PropTypes.func,
  setUpdated: PropTypes.func,
  getMappingErrors: PropTypes.func,
  getDefaultMapping: PropTypes.func
};

export default MapFields;
