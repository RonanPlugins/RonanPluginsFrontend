import React from 'react';
const PluginsData = require('../../../mockupData/Plugins.json');
import './AllPlugins.css';
import { Rating } from 'react-simple-star-rating';
import DiscordAndReddit from '../components/DiscordAndReddit/DiscordAndReddit';
import Messages from '../../../libs/Messages';

const Plugins = () => {
 return (
  <div className="AllPluginscontainer">
   <div key="1" className="top">
    <img src='/assets/plugins.webp'/>
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
    <DiscordAndReddit text={Messages.SupportHeadingPlugins} />
   </div>
  </div>
 );
};

export default Plugins;
