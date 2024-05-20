// const PluginsData = require("../../../mockupData/Plugins.json");
// import { Rating } from "react-simple-star-rating";

import { Star } from "lucide-react";
import { Card, CardContent, CardFooter, CardTitle } from "../ui/card";
import { Ratings } from "../ui/rating";
import { useLocation } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

export default function Plugin({ plugin }) {
  console.log(plugin);
  return (
    // <a href={"https://www.spigotmc.org/resources/" + plugin.id}>
    <Card className="text-center">
      <CardTitle className="truncate mx-2 my-2">
        {plugin.name}
        <p className="text-sm font-normal">
          {new Date(plugin.updateDate * 1000).toLocaleString()}
        </p>
      </CardTitle>
      <CardContent>
        <img
          className="mx-auto my-2 h-20"
          src={"https://www.spigotmc.org/" + plugin.icon.url}
        />
        <div className="flex">
          <div className="grow"></div>
          <div className="grow-0">
            <Ratings rating={plugin.rating.average} />
          </div>
          <div className="grow"></div>
        </div>{" "}
        <p className="text-sm text-gray-500">{plugin.rating.count} ratings</p>
        <p className="">{plugin.downloads} downloads</p>
      </CardContent>
      <CardFooter className="pr-2 pb-2 flex justify-between">
        {plugin.premium && (
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
          href={"https://www.spigotmc.org/resources/" + plugin.id}
          target="_blank"
          className="text-right ml-auto text-sm hover:underline"
        >
          View on Spigot...
        </a>
      </CardFooter>
    </Card>
  );
}
