import post from "@/api/post";
import MenuBar from "@/components/textEditor/new/Tiptap";
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/context/UserContext";

export default function PostCreate() {
  const { user }: { user: any } = useUserContext();

  const handleCreatePost = () => {
    post.createPost({ test: true });
  };

  return (
    <div className="w-full text-center my-4">
      <h1>Create a Post</h1>
      <MenuBar />
      <Button onClick={handleCreatePost}>Create plugin</Button>
    </div>
  );
}
