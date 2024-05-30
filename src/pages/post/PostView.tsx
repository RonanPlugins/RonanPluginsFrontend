import postAPI from "@/api/post";
import Loading from "@/components/common/Loading";
import PluginEditTools from "@/components/plugins/PluginEditTools";
import PluginImage from "@/components/plugins/PluginImage";
import TextEditor from "@/components/textEditor/TextEditor";
import { Card, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function PostView() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [post, setPostInfo] = useState<any | null>(null);

  async function getPlugin() {
    const pInfo = await postAPI.getOne(id);
    setPostInfo(pInfo);
    setLoading(false);
  }

  useEffect(() => {
    getPlugin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <Loading />;
  if (post === null) return <>Error!</>;
  // console.log(pluginInfo);

  return (
    <div className="w-full my-2">
      <div className="max-w-4xl mx-auto flex flex-row">
        <Card className="grow mr-2">
          {/* Plugin Header */}
          <CardTitle className="py-2 mx-2">
            <div className="flex flex-row">
              <PluginImage
                className="max-h-[120px] max-w-[120px] mr-2"
                image={post.image}
              />
              <div className="flex flex-col">
                <h2>{post.title}</h2>
                <p className="text-base font-normal">{post.tagLine}</p>
              </div>
            </div>
          </CardTitle>
          {/* Body of plugin data */}
          <section className="mx-2 pb-2">
            <TextEditor content={post.description} canEdit={true} />
          </section>
        </Card>
        <div className="w-96 max-w-4xl">
          <PluginEditTools post={post} />
        </div>
      </div>
    </div>
  );
}
