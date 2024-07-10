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
import PremiumIcon from "../common/PremiumIcon";
import { Card } from "../ui/card";

export function ResourcePreview({ resource }: { resource: any }) {
  // console.log(resource);
  return <LayoutList resource={resource} />;
}

function LayoutList({ resource }: { resource: any }) {
  return (
    <Card className="flex flex-col md:flex-row p-3 gap-3">
      <div className="flex flex-row">
        {/* Image */}
        <Link className="relative" to={`../resource/${resource._id}`}>
          <ResourceImage classname="mt-auto" id={resource._id} />
          {resource.premium && <PremiumIcon />}
        </Link>
        {/* Resource Info */}
        <div className="w-full flex flex-row flex-nowrap">
          <div className="ml-3 flex flex-col">
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
            <p className="text-sm md:text-base">{resource.subtitle}</p>
          </div>
        </div>
      </div>
      <div className="md:self-end text-xs flex-shrink-0 flex flex-row md:flex-col items-center md:items-end md:ml-auto justify-between">
        {/* Downloads */}
        <Downloads resource={resource} />

        {/* Last Updated */}
        <Updated resource={resource} />
      </div>
    </Card>
  );
}

function LayoutGallery({ resource }: { resource: any }) {
  return (
    <Card className="flex flex-col md:flex-row p-3">
      <div className="flex flex-row">
        {/* Image */}
        <Link className="relative my-3" to={`../resource/${resource._id}`}>
          <ResourceImage classname="mt-auto" id={resource._id} />
          {resource.premium && <PremiumIcon />}
        </Link>
        {/* Resource Info */}
        <div className="w-full flex flex-row flex-nowrap">
          <div className="ml-3 flex flex-col">
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
            <p className="text-sm md:text-base">{resource.subtitle}</p>
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
    </Card>
  );
}

function Downloads({ resource }: { resource: any }) {
  return (
    <div className="flex flex-row items-center justify-end">
      <Download className="mr-1" size={16} />
      <p className="my-auto">
        <span className="text-lg font-bold">{resource.downloads || "N/A"}</span>{" "}
        downloads
      </p>
    </div>
  );
}

function Updated({ resource }: { resource: any }) {
  return (
    <dl className={`flex flex-row justify-end`}>
      <dt className="mr-1">
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
          Updated {date(resource.updatedAt)}
        </Link>
      </dd>
    </dl>
  );
}
