// const PluginsData = require("../../../mockupData/Plugins.json");
// import { Rating } from "react-simple-star-rating";

export default function Plugin({ plugin }) {
  return (
    <a href={"https://www.spigotmc.org/resources/" + plugin.id}>
      <div className="plugin">
        <img src={"https://www.spigotmc.org/" + plugin.icon.url} />
        <div className="Content">
          <div className="Name">{plugin.name}</div>
          <div className="Stars">
            {plugin.rating.average}
            {/* <Rating
                      initialValue={plugin.rating.average}
                      readonly={true}
                      allowFraction={true}
                      size={20}
                      SVGstyle={{ display: "inline-block" }}
                    /> */}
          </div>
          <div className="Reviews">({plugin.rating.count})</div>
          <div className="Mini-Description">{plugin.tag}</div>
        </div>
      </div>
    </a>
  );
}
