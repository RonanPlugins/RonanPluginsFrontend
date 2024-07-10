import resourceAPI from "@/api/resource";
import Loading from "@/components/common/Loading";
import {
  ResourceSidebar,
  ResourceSidebarBottom,
} from "@/components/resource/Sidebar";
import { useUserContext } from "@/context/UserContext";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Buffer } from "buffer";
import { ResourceDownload } from "@/components/resource/Download";
import { ResourceDelete } from "@/components/resource/Delete";
import { TextViewer } from "@/components/textEditor/TextViewer";
import usePageTitle from "@/utils/usePageTitle";
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
  // console.log(resource);

  return (
    <div className="max-w-7xl p-3 lg:mx-auto flex lg:flex-row flex-col lg:space-x-2 space-y-3 lg:space-y-0">
      <div className="w-full lg:max-w-80">
        <ResourceSidebar resource={resource} />
      </div>
      <div className="w-full space-y-3">
        <div className="flex flex-row justify-between border-b-8 border-primary">
          <ResourcePages resource={resource} />
          <div className="hidden lg:block my-auto py-2">
            <ResourceDownloadButton resource={resource} />
          </div>
        </div>
        {/* Body of plugin data */}
        <main>
          <TextViewer content={resource.description} />
        </main>
        {resource.tags && (
          <div className="text-muted-foreground text-sm flex flex-col m-3">
            <p className="font-bold">Tags</p>
            <p>{resource.tags}</p>
          </div>
        )}
      </div>
      <div className="lg:hidden w-full lg:w-96">
        <ResourceSidebarBottom resource={resource} />
      </div>
      {/* <div dangerouslySetInnerHTML={{ __html: resource.description }} /> */}
    </div>
  );
}

export function ResourceDownloadButton({ resource }: { resource: any }) {
  const { isAdmin }: { isAdmin: boolean } = useUserContext();

  return (
    <div className="ml-auto flex flex-col md:flex-row justify-center gap-3 lg:min-w-36">
      {isAdmin && <ResourceDelete resource={resource} />}
      <ResourceDownload
        classname="font-bold"
        name={resource.title}
        version={resource.version}
        resource={resource}
      />
    </div>
  );
}
