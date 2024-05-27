import PluginImage from "@/components/plugins/PluginImage";
import { Link } from "react-router-dom";

export default function PostPreview({ post }: { post: any }) {
  console.log(post);
  return (
    <div className="m-auto flex flex-row max-w-3xl my-3">
      <PluginImage className="max-h-[80px] max-w-[80px]" image={post.image} />

      <Link to={`../post/${post._id}`}>
        <div className="flex flex-col ml-2">
          <h2 className="">{post.title}</h2>
          <p className="">{post.tagLine}</p>
          <p className="mt-2 h-full text-sm text-transparent/50 align-text-bottom">
            {post.authorID?.displayName}
          </p>
        </div>
      </Link>
    </div>
  );
}
