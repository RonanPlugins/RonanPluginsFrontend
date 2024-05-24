import post from "@/api/post";
import Loading from "@/components/common/Loading";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function PostView() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [pluginInfo, setPluginInfo] = useState(null);

  async function getPlugin() {
    const pInfo = await post.getOne(id);
    setPluginInfo(pInfo);
    setLoading(false);
  }

  useEffect(() => {
    getPlugin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <Loading />;

  console.log(pluginInfo);

  return <>WOOH</>;
}
