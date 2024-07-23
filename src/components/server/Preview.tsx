import { Link } from "react-router-dom";
import { Card } from "../ui/card";
import { ServerImage } from "./Image";
import { toCaps } from "@/utils/formatter";
import { useEffect, useState } from "react";
import serverAPI from "@/api/server";
import Loading from "../common/Loading";
import { Users } from "lucide-react";
import { CopyServerIP } from "./CopyServerIp";

export interface ServerStatus {
  online: boolean;
  icon: string;
  motd: string;
  players: {
    online: number;
    max: number;
  };
  version: string;
}

export function ServerPreview({ server }: { server: any }) {
  const [loading, setLoading] = useState(true);
  const [serverStatus, setServerStatus] = useState<ServerStatus>();
  useEffect(() => {
    // console.log("Server Loaded", server);
    if (!server.address) return;
    serverAPI
      .getStatus(`${server.address}${server.port ? ":" + server.port : ""}`)
      .then((data) => {
        // console.log("Data", data);
        setServerStatus(data);
      })
      .finally(() => {
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <LayoutList server={server} status={serverStatus} loading={loading} />;
}

function LayoutList({
  server,
  status,
  loading,
}: {
  server: any;
  status: ServerStatus | undefined;
  loading: boolean;
}) {
  return (
    <Card className="flex flex-col md:flex-row gap-3">
      <div className="flex flex-col flex-grow">
        {/* Image */}
        <Link className="w-full" to={`../server/${server._id}`}>
          <ServerImage server={server} />
        </Link>
        {/* Server Info */}
        <div className="w-full flex flex-row flex-nowrap px-3 pb-3">
          <div className="flex flex-col w-full">
            <div className="flex flex-row justify-between items-center">
              {/* Title */}
              <span className="text-primary md:text-lg font-bold hover:text-secondary-foreground hover:underline">
                <Link to={`../server/${server._id}`}>{server.title}</Link>
              </span>
              <div className="flex flex-row gap-1">
                {loading ? (
                  <Loading size={28} />
                ) : (
                  <>
                    {status && status.players ? (
                      <>
                        <Users size={20} />
                        {status ? status.players.online : 0}/
                        {status ? status.players.max : 0}
                      </>
                    ) : (
                      <></>
                    )}
                  </>
                )}
              </div>
            </div>
            <p className="text-sm md:text-base">{server.subtitle}</p>
            <div className="mt-3 flex flex-row justify-between items-center">
              <p>
                {`${toCaps(server.address)}${
                  server.port ? ":" + toCaps(server.port) : ""
                }`}
              </p>
              <CopyServerIP server={server} />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
