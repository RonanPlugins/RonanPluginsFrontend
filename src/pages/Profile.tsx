import { Button } from "@/components/ui/button";
import { useUserContext } from "@/context/UserContext";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { user }: { user: any } = useUserContext();
  const naviage = useNavigate();

  return (
    <div className="w-full text-center my-4">
      <h1>Welcome Back</h1>
      <h1>{user.name}</h1>

      <Button onClick={() => naviage("/resource/create")}>New Resource</Button>
    </div>
  );
}
