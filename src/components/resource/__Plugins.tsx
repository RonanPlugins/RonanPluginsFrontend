import Loading from "@/components/common/Loading";
import axios from "axios";
import { useEffect, useState } from "react";
import SPIGET from "./__Plugin";

const SPIGETS = () => {
  const [plugins, setPlugins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      axios
        .get(
          "https://api.spiget.org/v2/authors/13025/resources?size=32&sort=-downloads"
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

  if (loading) return <Loading />;

  const pluginsPremium = plugins.filter((plugin) => (plugin as any).premium);
  const pluginsFree = plugins.filter((plugin) => !(plugin as any).premium);

  return (
    <div className="mx-4 my-4">
      <h1 className="text-center font-bold text-secondary px-4 bg-primary rounded-xl">
        Premium Plugins
      </h1>
      {/* Premium Plugins */}
      <div className="my-10 grid grid-cols-2 sm:grid-cols-3 gap-3 mx-5">
        {pluginsPremium.map((plugin) => (
          <SPIGET key={(plugin as any).id} pluginData={plugin} />
        ))}
      </div>
      {/* Free Plugins */}
      <h1 className="text-center font-bold text-secondary px-4 bg-primary rounded-xl">
        Free Plugins
      </h1>
      <div className="my-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mx-5">
        {pluginsFree.map((plugin) => (
          <SPIGET key={(plugin as any).id} pluginData={plugin} />
        ))}
      </div>
    </div>
  );
};

export default SPIGETS;
