import resourceAPI from "@/api/resource";
import Loading from "@/components/common/Loading";
import {
  ResourceSidebar,
  ResourceSidebarBottom,
} from "@/components/resource/Sidebar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useUserContext } from "@/context/UserContext";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Buffer } from "buffer";
import { ResourceDownload } from "@/components/resource/Download";
import { ResourceDelete } from "@/components/resource/Delete";
import { TextViewer } from "@/components/textEditor/TextViewer";
import usePageTitle from "@/utils/usePageTitle";
import { Button } from "@/components/ui/button";
import { ResourcePages } from "@/components/resource/Pages";

export function ResourceView() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [resource, setResourceInfo] = useState<any | null>(null);

  async function getPlugin() {
    const pInfo = await resourceAPI.getOne(id);
    if (pInfo.description) {
      pInfo.description = Buffer.from(pInfo.description, "base64").toString(
        "utf-8"
      );
      // console.log(pInfo.description);
    }
    setResourceInfo(pInfo);
    setLoading(false);
  }

  usePageTitle(resource ? resource.title : "");

  useEffect(() => {
    getPlugin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <Loading />;
  if (resource === null) return <>Error!</>;
  console.log(resource);

  return (
    <div className="max-w-7xl my-3 mx-2 lg:mx-auto flex lg:flex-row flex-col lg:space-x-2 space-y-3 lg:space-y-0">
      <div className="w-full lg:max-w-80">
        <ResourceSidebar resource={resource} />
      </div>
      <div className="w-full space-y-3">
        <div className="flex flex-col md:flex-row gap-3">
          <Card className="grow">
            {/* Plugin Header */}
            <CardHeader>
              {/* <ResourceMenuBar resource={resource} /> */}
              <ResourcePages resource={resource} />
            </CardHeader>
          </Card>
          <div className="hidden lg:block my-auto mr-2">
            <ResourceDownloadCard resource={resource} />
          </div>
        </div>
        <Card className="grow">
          <CardContent className="py-2 mx-2">
            {/* Body of plugin data */}
            <main>
              <TextViewer content={resource.description} />
            </main>
            <div className="mt-2 text-muted-foreground text-sm">
              {resource.tags && (
                <>
                  <p className="font-bold">Tags</p>
                  <p>{resource.tags}</p>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="lg:hidden w-full lg:w-96">
        <ResourceSidebarBottom resource={resource} />
      </div>
      {/* <div dangerouslySetInnerHTML={{ __html: resource.description }} /> */}
    </div>
  );
}

export function ResourceDownloadCard({ resource }: { resource: any }) {
  const { isAdmin }: { isAdmin: boolean } = useUserContext();

  return (
    <div className="ml-auto flex flex-col md:flex-row justify-center gap-2  lg:min-w-36">
      {isAdmin && <ResourceDelete resource={resource} />}
      <ResourceDownload
        classname=""
        name={resource.title}
        version={resource.version}
        resource={resource}
      />
    </div>
  );
}
