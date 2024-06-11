import resourceAPI from "@/api/resource";
import Loading from "@/components/common/Loading";
import ResourceEditTools from "@/components/resource/ResourceEditTools";
import ResourceImage from "@/components/resource/ResourceImage";
import TextEditor from "@/components/textEditor/TextEditor";
import { Card, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ResourceView() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [resource, setResourceInfo] = useState<any | null>(null);

  async function getPlugin() {
    const pInfo = await resourceAPI.getOne(id);
    setResourceInfo(pInfo);
    setLoading(false);
  }

  useEffect(() => {
    getPlugin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <Loading />;
  if (resource === null) return <>Error!</>;
  // console.log(pluginInfo);

  return (
    <div className="w-full my-2">
      <div className="max-w-6xl mx-auto flex md:flex-row flex-col">
        <Card className="grow mr-2 w-full">
          {/* Plugin Header */}
          <CardTitle className="py-2 mx-2">
            <div className="flex flex-row">
              <ResourceImage
                className="max-h-[120px] max-w-[120px] mr-2"
                image={resource.image}
              />
              <div className="flex flex-col">
                <h2>{resource.title}</h2>
                <p className="text-base font-normal">{resource.tagLine}</p>
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
        <div className="w-full md:w-96">
          <ResourceEditTools resource={resource} />
        </div>
      </div>
    </div>
  );
}
