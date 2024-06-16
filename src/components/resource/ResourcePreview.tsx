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

export default function ResourcePreview({ resource }: { resource: any }) {
  // console.log(resource);
  return (
    <div className="p-2 flex flex-row">
      {/* Image */}
      <Link to={`../resource/${resource._id}`}>
        <ResourceImage id={resource.image} />
      </Link>
      {/* Resource Info */}
      <div className="w-full flex flex-col">
        <div className="ml-2 grid">
          <div className="flex">
            <p>
              {/* Title */}
              <span className="text-primary text-lg font-bold hover:text-secondary-foreground hover:underline">
                <Link to={`../resource/${resource._id}`}>{resource.title}</Link>
              </span>
              {/* Author */}
              <span className="mx-2 text-secondary-foreground/80 text-sm my-auto font-normal no-underline hover:underline">
                <Link to={`../user/${resource.authorID?._id}`}>
                  by {resource.authorID?.name}
                </Link>
              </span>
            </p>
          </div>
          <p className="">{resource.tagLine}</p>
          {/* Version */}
          <div className="mt-auto">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <p className="text-sm text-secondary-foreground/50">
                    {resource.version}
                  </p>
                </TooltipTrigger>
                <TooltipContent align="start">
                  <p>Version</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        {/* Last Updated */}
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
    </div>
  );
}
