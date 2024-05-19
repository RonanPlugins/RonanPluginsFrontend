import Plugin from "@/components/plugins/Plugin";
import axios from "axios";
import { useEffect, useState } from "react";
// const PluginsData = require("../../../mockupData/Plugins.json");
// import { Rating } from "react-simple-star-rating";

const Plugins = () => {
  const [plugins, setPlugins] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      axios
        .get(
          "https://api.spiget.org/v2/authors/13025/resources?size=1000&sort=-downloads"
        )
        .then((response) => {
          if (response.status === 200) {
            setPlugins(response.data);
            setLoading(false);
          }
        })
        .catch(() => {
          setLoading(false);
        });
    };

    fetchData();
  }, []);

  if (loading) return <>Loading...</>;

  return (
    <div className="plugins">
      {plugins.map((plugin) => (
        <Plugin plugin={plugin} />
      ))}
    </div>
  );
};

export default Plugins;
