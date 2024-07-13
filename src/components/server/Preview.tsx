import { Link } from "react-router-dom";
import { Card } from "../ui/card";
import { ServerImage } from "./Image";
import { toCaps } from "@/utils/formatter";

export function ServerPreview({ server }: { server: any }) {
  // console.log(server);
  return <LayoutList server={server} />;
}

function LayoutList({ server }: { server: any }) {
  return (
    <Card className="flex flex-col md:flex-row p-3 gap-3">
      <div className="flex flex-col flex-grow">
        {/* Image */}
        <Link className="w-full" to={`../server/${server._id}`}>
          <ServerImage server={server} classname="flex-grow" />
        </Link>
        {/* Server Info */}
        <div className="w-full flex flex-row flex-nowrap">
          <div className="flex flex-col">
            <div className="flex">
              <p>
                {/* Title */}
                <span className="text-primary md:text-lg font-bold hover:text-secondary-foreground hover:underline">
                  <Link to={`../server/${server._id}`}>{server.title}</Link>
                </span>
              </p>
            </div>
            <p className="text-sm md:text-base">{server.subtitle}</p>
            <p>
              {toCaps(server.address)}:{toCaps(server.port)}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
