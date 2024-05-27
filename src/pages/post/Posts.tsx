import post from "@/api/post";
import Loading from "@/components/common/Loading";
import { useEffect, useState } from "react";
import PostPreview from "./PostPreview";

export default function Posts() {
  const [loading, setLoading] = useState(true);
  const [plugins, setPlugins] = useState<any[] | null>(null);

  async function getPlugins() {
    const posts = await post.getAll();
    console.log("response", posts);
    setPlugins(posts);
    setLoading(false);
  }

  useEffect(() => {
    getPlugins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="w-full">
      {plugins &&
        plugins.map((post) => <PostPreview key={post._id} post={post} />)}
    </div>
  );
}
