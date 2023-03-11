import React from 'react';
const PluginsData = require('../../mockupData/Plugins.json');
import './AllPlugins.css';
import { Rating } from 'react-simple-star-rating';
import { Button } from '@chakra-ui/react';
import { FaDiscord, FaReddit } from 'react-icons/fa';
import DiscordAndReddit from './components/DiscordAndReddit';

const Plugins = () => {
 return (
  <div className="AllPluginscontainer">
   <div key="1" className="top">
    <img src='https://imgur.com/v2qrbEo.png'/>
   </div>
   <div key="2" className="plugins">
    {PluginsData.map((plugin) => {
        return (
            <a href={'plugin/'+plugin.name} >
                
      <div className="plugin">
       <img src={plugin.icon} />
       <div className="Content">
        <div className="Name">{plugin.name}</div>
        <div className="Stars">
         <Rating
          initialValue={plugin.ratings.average}
          readonly={true}
          allowFraction={true}
          size={20}
          SVGstyle={{ display: 'inline-block' }}
          />
        </div>
        <div className="Reviews">({plugin.ratings.total})</div>
        <div className="Mini-Description">{plugin.description}</div>
       </div>
      </div>
          </a>
     );
    })}
   </div>
   <div key="3" className="bottom">
    <DiscordAndReddit/>
   </div>
  </div>
 );
};

export default Plugins;
