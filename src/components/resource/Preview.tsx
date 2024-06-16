import { ResourceImage } from "./Image";
import { Link } from "react-router-dom";
import date from "../../utils/date";
import { Clock8Icon, Download } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

export function ResourcePreview({ resource }: { resource: any }) {
  // console.log(resource);
  return (
    <div className="flex flex-col md:flex-row">
      <div className="flex flex-row">
        {/* Image */}
        <Link className="my-auto" to={`../resource/${resource._id}`}>
          <ResourceImage id={resource.image} />
        </Link>
        {/* Resource Info */}
        <div className="w-full flex flex-row flex-nowrap">
          <div className="ml-2 grid">
            <div className="flex">
              <p>
                {/* Title */}
                <span className="text-primary md:text-lg font-bold hover:text-secondary-foreground hover:underline">
                  <Link to={`../resource/${resource._id}`}>
                    {resource.title}
                  </Link>
                </span>
                {/* Author */}
                <span className="mx-2 text-secondary-foreground/80 text-sm my-auto font-normal no-underline hover:underline">
                  <Link to={`../user/${resource.authorID?._id}`}>
                    by {resource.authorID?.name}
                  </Link>
                </span>
              </p>
            </div>
            <p className="text-sm md:text-base">{resource.tagLine}</p>
          </div>
        </div>
      </div>
      <div className="self-end ml-auto text-xs flex-shrink-0 flex flex-col">
        {/* Last Updated */}
        <dl className="flex flex-row justify-end">
          <dt className="mr-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Clock8Icon size={16} aria-label="last updated" />
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

        {/* Downloads */}
        <div className="flex flex-row items-center justify-end">
          <Download className="mr-1" size={16} />
          <p className="my-auto">
            <span className="text-lg font-bold">
              {resource.downloads || "N/A"}
            </span>{" "}
            downloads
          </p>
        </div>
      </div>
    </div>
  );
}
