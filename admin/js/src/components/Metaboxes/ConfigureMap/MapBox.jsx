import React from 'react';

const MapBox = () => (
  <div className="iip-map-admin-mapbox">
    <h2 className="iip-map-admin-metabox-header">Select the View</h2>
    <div className="iip-map-admin-mapbox__inner">
      <div id="admin-map">
        <p className="crosshair">+</p>
      </div>
      <p style={ { fontSize: '.8em' } }>
        {
          `Use the red cross to select the centerpoint for your map.
          Note that the final map's dimensions may appear slightly different
          depending on the layout of the page on which it is embedded.`
        }
      </p>
    </div>
  </div>
);

export default MapBox;
