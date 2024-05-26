import post from "@/api/post";
import Loading from "@/components/common/Loading";
import { useEffect, useState } from "react";

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

  console.log(plugins);

  return (
    <>{plugins && plugins.map((post) => <Post key={post._id} post={post} />)}</>
  );
}

const Post = ({ post }: { post: any }) => {
  const blob = new Blob([...post.image64.data], { type: "image/png" }); // Adjust MIME type if necessary

  // Create an Object URL from the Blob
  const imageUrl = URL.createObjectURL(blob);
  // CHANGE THIS IF THE IMAGE YOU ARE WORKING WITH IS .jpg OR WHATEVER
  // const mimeType = "image/png"; // e.g., image/png
  console.log("Base 64:", imageUrl);
  return (
    <>
      <img src={imageUrl} />
      <h2>{post.title}</h2>
    </>
  );
};
