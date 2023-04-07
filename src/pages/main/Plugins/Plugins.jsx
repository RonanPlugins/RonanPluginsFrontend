import React, { useEffect, useState } from 'react';
const PluginsData = require('../../../mockupData/Plugins.json');
import './AllPlugins.css';
import { Rating } from 'react-simple-star-rating';
import DiscordAndReddit from '../components/DiscordAndReddit/DiscordAndReddit';
import Messages from '../../../libs/Messages';
import axios from 'axios';

const Plugins = () => {

const [plugins, setPlugins] = useState([]);
  useEffect(() => {
      const fetchData = async () => {
        const response = await axios.get("https://api.spiget.org/v2/authors/13025/resources?size=1000&sort=-downloads").catch((err) => {
      setLoading(false)
        });
          if (response.status === 200) {
              setPlugins(response.data);
              setLoading(false)
          }
    };

    fetchData();
  }, []);

 return (
  <div className="AllPluginscontainer">
   <div key="1" className="top">
    <img src='/assets/plugins.webp'/>
   </div>
   <div key="2" className="plugins">
    {plugins.map((plugin) => {
        return (
            <a href={'https://www.spigotmc.org/resources/'+plugin.id} >
                
      <div className="plugin">
       <img src={"https://www.spigotmc.org/"+plugin.icon.url} />
       <div className="Content">
        <div className="Name">{plugin.name}</div>
        <div className="Stars">
         <Rating
          initialValue={plugin.rating.average}
          readonly={true}
          allowFraction={true}
          size={20}
          SVGstyle={{ display: 'inline-block' }}
          />
        </div>
        <div className="Reviews">({plugin.rating.count})</div>
        <div className="Mini-Description">{plugin.tag}</div>
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
