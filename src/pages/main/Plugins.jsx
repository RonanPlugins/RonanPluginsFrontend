import React from 'react';
const PluginsData = require('../../mockupData/Plugins.json');
import './Plugins.css';

const Plugins = () => {
 return (
  <div className="container">
   <div key="1" className='top' >1</div>
   <div key="2" className='middle'>2</div>
   <div key="3"className='bottom'>3</div>
  </div>
 );
};

export default Plugins;
