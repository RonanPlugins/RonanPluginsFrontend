// const PluginsData = require("../../../mockupData/Plugins.json");
// import { Rating } from "react-simple-star-rating";

import { Star } from "lucide-react";
import { Card, CardContent, CardFooter, CardTitle } from "../ui/card";
import { Ratings } from "../ui/rating";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { useEffect, useState } from "react";
import Loading from "../common/Loading";
import axios from "axios";
import { Buffer } from "buffer";

export default function SPIGET({ pluginData }: { pluginData: any }) {
  //console.log(plugin);
  const [plugin, setPlugin] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      axios
        .get(`https://api.spiget.org/v2/resources/${pluginData.id}`)
        .then((response) => {
          if (response.status === 200) {
            setPlugin(response.data);
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

  console.log(
    "PLUGIN DATA:",
    Buffer.from(plugin?.description, "base64").toString("utf-8")
  );

  return (
    <Card className="text-center">
      <CardTitle className="truncate mx-2 my-2">
        {plugin?.name}
        <p className="text-sm font-normal">
          {new Date(plugin?.updateDate * 1000).toLocaleString()}
        </p>
      </CardTitle>
      <CardContent>
        <img
          className="mx-auto my-2 h-20 hover: border rounded-xl bg-white bg-gradient-to-r from-cyan-500 to-blue-500"
          src={"https://www.spigotmc.org/" + plugin?.icon.url}
        />
        <div className="flex">
          <Ratings rating={plugin?.rating.average} />
        </div>

        <p className="text-sm text-gray-500">{plugin?.rating.count} ratings</p>
        <p className="">{plugin?.downloads} downloads</p>
      </CardContent>
      <CardFooter className="pr-2 pb-2 flex justify-between">
        {plugin?.premium && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Star className="fill-current text-yellow-500"></Star>
              </TooltipTrigger>
              <TooltipContent>Premium</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
        <a
          href={"https://www.spigotmc.org/resources/" + plugin?.id}
          target="_blank"
          className="text-right ml-auto text-sm hover:underline"
        >
          View on Spigot...
        </a>
      </CardFooter>
    </Card>
  );
}
