import resourceAPI from "@/api/resource";
import Loading from "@/components/common/Loading";
import ResourceEditTools from "@/components/resource/ResourceEditTools";
import ResourceImage from "@/components/resource/ResourceImage";
import TextEditor from "@/components/textEditor/TextEditor";
import { Card, CardTitle } from "@/components/ui/card";
import { useUserContext } from "@/context/UserContext";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Buffer } from "buffer";
import ResourceDownload from "@/components/resource/ResourceDownload";
import ResourceDelete from "@/components/resource/ResourceDelete";

export default function ResourceView() {
  const { id } = useParams();
  const { user, isAdmin }: { user: any; isAdmin: boolean } = useUserContext();
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

  useEffect(() => {
    getPlugin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <Loading />;
  if (resource === null) return <>Error!</>;
  // console.log(user?._id, resource.authorID._id);

  return (
    <div className="w-full my-2">
      <div className="max-w-4xl lg:max-w-6xl mx-auto flex lg:flex-row flex-col">
        <Card className="max-w-4xl grow mr-2 w-full">
          {/* Plugin Header */}
          <CardTitle className="py-2 mx-2">
            <div className="flex flex-col-reverse lg:flex-row">
              <div className="flex flex-row">
                <ResourceImage classname="mr-2" id={resource.image} />
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
                  id={resource.jar}
                />
                {isAdmin && <ResourceDelete resource={resource} />}
              </div>
            </div>
          </CardTitle>
          {/* Body of plugin data */}
          <section className="mx-2 pb-2">
            <TextEditor
              className="p-2"
              content={resource.description}
              canEdit={false}
            />
          </section>
        </Card>
        {user?._id === resource.authorID._id && (
          <div className="w-full lg:w-96">
            <ResourceEditTools resource={resource} />
          </div>
        )}
      </div>
      {/* <div dangerouslySetInnerHTML={{ __html: resource.description }} /> */}
    </div>
  );
}
