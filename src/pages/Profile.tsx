import { Button } from "@/components/ui/button";
import { useUserContext } from "@/context/UserContext";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { user }: { user: any } = useUserContext();
  const naviage = useNavigate();

  return (
    <div className="w-full text-center my-4">
      <h1>Welcome Back {user.displayName}</h1>

      <Button onClick={() => naviage("/post/create")}>Create a Post</Button>
    </div>
  );
}
