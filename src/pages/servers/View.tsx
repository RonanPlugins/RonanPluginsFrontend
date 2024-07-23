import Loading from "@/components/common/Loading";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Buffer } from "buffer";
import { TextViewer } from "@/components/textEditor/TextViewer";
import usePageTitle from "@/utils/usePageTitle";
import serverAPI from "../../api/server";
import {
  ServerSidebar,
  ServerSidebarBottom,
} from "@/components/server/Sidebar";
import { ServerImage } from "@/components/server/Image";
import { Card, CardContent } from "@/components/ui/card";
import { Circle, Users } from "lucide-react";
import ServerDataProvider, {
  useServerDataContext,
} from "@/context/ServerDataContext";

export function ServerView() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [server, setServerInfo] = useState<any | null>(null);

  async function getPlugin() {
    const sInfo = await serverAPI.getOne(id);
    if (sInfo.description) {
      sInfo.description = Buffer.from(sInfo.description, "base64").toString(
        "utf-8"
      );
      // console.log(pInfo.description);
    }
    setServerInfo(sInfo);
    setLoading(false);
  }

  usePageTitle(server ? server.title : "");

  useEffect(() => {
    getPlugin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <Loading />;
  if (server === null) return <>Error!</>;
  // console.log(resource);

  return (
    <ServerDataProvider server={server}>
      <div className="max-w-7xl p-3 lg:mx-auto flex lg:flex-row flex-col lg:space-x-2 space-y-3 lg:space-y-0">
        <div className="w-full lg:max-w-80">
          <ServerSidebar server={server} />
        </div>

        <div className="w-full space-y-3">
          {/* Body of server data */}
          <ServerBanner server={server} />
          <main>
            <TextViewer content={server.description} />
          </main>
          {server.tags && (
            <div className="text-muted-foreground text-sm flex flex-col m-3">
              <p className="font-bold">Tags</p>
              <p>{server.tags}</p>
            </div>
          )}
        </div>
        <div className="lg:hidden w-full lg:w-96">
          <ServerSidebarBottom server={server} />
        </div>
        {/* <div dangerouslySetInnerHTML={{ __html: resource.description }} /> */}
      </div>
    </ServerDataProvider>
  );
}

function ServerBanner({ server }: { server: any }) {
  const { loading, status } = useServerDataContext();

  return (
    <Card>
      <CardContent className="p-3 flex flex-row">
        <ServerImage classname="!w-3/4 pb-[calc(15/117*75%)]" server={server} />
        <div className="flex grow ml-3">
          {loading ? (
            <Loading size={28} />
          ) : (
            <>
              {status && status.players ? (
                <div className="flex flex-col">
                  <div className="flex flex-row gap-2">
                    <Users size={20} />
                    {status ? status.players.online : 0}/
                    {status ? status.players.max : 0}
                  </div>
                  <div className="font-bold flex flex-row items-center gap-2">
                    <Circle
                      size={20}
                      className="animate-pulse duration-[4000]"
                      stroke="#008512"
                    />
                    Online
                  </div>
                </div>
              ) : (
                <div className="font-bold flex flex-row items-center gap-2">
                  <Circle
                    size={20}
                    className="animate-pulse duration-[4000]"
                    stroke="#fc0303"
                  />
                  Offline
                </div>
              )}
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
