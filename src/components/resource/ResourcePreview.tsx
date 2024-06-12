import ResourceImage from "./ResourceImage";
import { Link } from "react-router-dom";
import date from "../../utils/date";
import { Clock8 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Button } from "../ui/button";

export default function ResourcePreview({ resource }: { resource: any }) {
  console.log(resource);
  return (
    <div className="p-2 flex flex-row max-w-3xl">
      <Link to={`./${resource._id}`}>
        <ResourceImage
          className="max-h-[80px] max-w-[80px]"
          image={resource.image}
        />
      </Link>
      <div className="ml-2 grid text-left">
        <div className="flex">
          <h3 className="text-primary font-bold text-center hover:text-secondary-foreground hover:underline">
            <Link to={`../resource/${resource._id}`}>{resource.title}</Link>
          </h3>

          <p className="mx-2 text-secondary-foreground/80 text-sm my-auto hover:underline">
            <Link to={`../member/${resource.authorID._id}`}>
              by {resource.authorID?.name}
            </Link>
          </p>
        </div>
        <p className="">{resource.tagLine}</p>
        <p className="text-sm mt-auto">
          <p className="text-secondary-foreground/50">{resource.version}</p>
        </p>
      </div>
      <div className="self-end ml-auto text-xs">
        <dl className="flex flex-row">
          <dt className="text-secondary-foreground/50 mr-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Clock8 size={16} aria-label="last updated" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Last Updated</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </dt>
          <dd className="hover:underline">
            <Link to={`../resource/${resource._id}`}>
              {date(resource.updatedAt)}
            </Link>
          </dd>
        </dl>
      </div>
    </div>
  );
}
