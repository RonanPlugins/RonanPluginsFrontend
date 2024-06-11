import ResourceImage from "./ResourceImage";
import { Link } from "react-router-dom";

export default function ResourcePreview({ resource }: { resource: any }) {
  console.log(resource);
  return (
    <Link to={`./${resource._id}`}>
      <div className="m-auto flex flex-row max-w-3xl my-3">
        <ResourceImage
          className="max-h-[80px] max-w-[80px]"
          image={resource.image}
        />

        <div className="flex flex-col ml-2">
          <h2 className="">{resource.title}</h2>
          <p className="">{resource.tagLine}</p>
          <p className="mt-2 h-full text-sm text-transparent/50 align-text-bottom">
            {resource.authorID?.name}
          </p>
        </div>
      </div>
    </Link>
  );
}
