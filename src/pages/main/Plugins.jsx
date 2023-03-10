import React from 'react';
const PluginsData = require('../../mockupData/Plugins.json');
import './AllPlugins.css';

const Plugins = () => {
 return (
  <div className="AllPluginscontainer">
   <div key="1" className='top' >Image</div>
   <div key="2" className='middle'>Selection</div>
   <div key="3"className='bottom'>Discord and reddit</div>
  </div>
 );
};

export default Plugins;
