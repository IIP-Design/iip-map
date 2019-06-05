import React, { Component } from 'react';
// Import shortcode parameters
const mapID = iip_map_params.map_id; // eslint-disable-line no-undef, camelcase
const baseURL = '/wp-json/iip-map/v1/maps/' + mapID; // eslint-disable-line prefer-template

class Table extends Component {
  state = {
    isLoading: true,
    filter: '',
    events: [],
    error: null
  };

  componentDidMount() {
    this.fetchEvents();
  }

  handleChange = ( event ) => {
    this.setState( { filter: event.target.value } );
  };

  fetchEvents() {
    fetch( baseURL )
      .then( response => response.json() )
      .then( data => this.setState( {
        events: data,
        isLoading: false
      } ) )
      .catch( error => this.setState( { error, isLoading: false } ) );
  }

  render() {
    const {
      isLoading, events, error, filter
    } = this.state;
    const lowercasedFilter = filter.toLowerCase();
    const filteredData = events.filter( ( event ) => { // eslint-disable-line arrow-body-style
      return Object.keys( event ).some( key => event[key].toLowerCase().includes( lowercasedFilter ) );
    } );

    return (
      <React.Fragment>
        <input className="event-table__filter" placeholder="Filter results..." value={ filter } onChange={ this.handleChange } />
        <div className="event-table">
          { error ? <p>{ error.message }</p> : null }
          { !isLoading ? (
            <React.Fragment>
              <div className="column-labels">
                <div className="label">Event Name</div>
                <div className="label">Event Date</div>
                <div className="label">Venue Address</div>
                <div className="label">Contact Info</div>
              </div>
            </React.Fragment>
          ) : null }
          { !isLoading ? (
            filteredData.map( ( event ) => {
              const cdate = ( new Date( event.event_date ).toLocaleDateString() ); // eslint-disable-line camelcase
              return (
                <div className="event-table__row event">
                  <h3>{ event.event_name }</h3>
                  <div className="date">{ cdate }</div>
                  <div className="location">
                    { event.venue_address }
                    { ', ' }
                    { event.venue_region }
                  </div>
                  <div className="contact">{ event.contact }</div>
                </div>
              );
            } )
          ) : (
            <h3>Loading...</h3>
          ) }
        </div>
      </React.Fragment>
    );
  }
}

export default Table;
