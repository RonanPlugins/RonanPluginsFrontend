import resourceAPI from "@/api/resource";
import Loading from "@/components/common/Loading";
import { ResourceSidebar } from "@/components/resource/Sidebar";
import { ResourceImage } from "@/components/resource/Image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useUserContext } from "@/context/UserContext";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Buffer } from "buffer";
import { ResourceDownload } from "@/components/resource/Download";
import { ResourceDelete } from "@/components/resource/Delete";
import { TextViewer } from "@/components/textEditor/TextViewer";
import usePageTitle from "@/utils/usePageTitle";

export function ResourceView() {
  const { id } = useParams();
  const { isAdmin }: { isAdmin: boolean } = useUserContext();
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
  // eslint-disable-next-line react-hooks/rules-of-hooks
  // usePageTitle(resource.title);
  // console.log(user?._id, resource.authorID._id);

  return (
    <div className="max-w-6xl my-2 mx-auto flex lg:flex-row flex-col lg:space-x-2 space-y-2 lg:space-y-0">
      <div className="w-full lg:w-96">
        <ResourceSidebar resource={resource} />
      </div>
      <div className="w-full lg:max-w-4xl">
        <Card className=" grow">
          {/* Plugin Header */}
          <CardHeader>
            {/* <ResourceMenuBar resource={resource} /> */}
            <div className="flex flex-col-reverse lg:flex-row">
              <div className="flex flex-row">
                <ResourceImage classname="mr-2" id={resource._id} />
                <div className="flex flex-row w-full">
                  <div className="flex flex-col">
                    <h3 className="text-primary font-bold text-2xl md:text-3xl">
                      {resource.title}
                    </h3>
                    <p className="text-base font-normal">{resource.tagLine}</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-row lg:flex-col ml-auto my-auto space-x-2 lg:space-y-2 lg:space-x-0">
                <ResourceDownload
                  classname="mx-auto my-auto"
                  name={resource.title}
                  version={resource.version}
                  resource={resource}
                />
                {isAdmin && <ResourceDelete resource={resource} />}
              </div>
            </div>
          </CardHeader>
          <CardContent className="py-2 mx-2">
            {/* Body of plugin data */}
            <main className="border-t-4">
              <TextViewer content={resource.description} />
              {/* content={resource.description} canEdit={false} /> */}
            </main>
          </CardContent>
        </Card>
      </div>
      {/* <div dangerouslySetInnerHTML={{ __html: resource.description }} /> */}
    </div>
  );
}
