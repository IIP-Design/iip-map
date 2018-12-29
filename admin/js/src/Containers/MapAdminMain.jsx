import React from 'react';

import ConfigureMap from './ConfigureMap';
import FormMapper from './FormMapper';
import Geocoder from '../Components/Metaboxes/Geocoder';

const MapAdminMain = () => (
  <div className="iip-map-admin-column-wide">
    <FormMapper />
    <ConfigureMap />
    <Geocoder />
  </div>
);

export default MapAdminMain;
