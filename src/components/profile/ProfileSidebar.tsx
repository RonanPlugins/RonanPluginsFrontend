import { useUserContext } from "@/context/UserContext";
import { ImportSpigotSidebar } from "./ImportSpigotSidebar";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import Links from "@/lib/Links";
import { PERMISSION } from "@/utils/PERMISSION";
import { EditStripe } from "./EditStripe";
import api from "@/api/index";

export default function ProfileSidebar() {
  const { user }: { user: any } = useUserContext();
  const navigate = useNavigate();
  const { logout }: { user: any; logout: any } = useUserContext();

  const logoutHandler = async () => {
    logout();
    await api.logout();
    navigate("/home");
  };

  return (
    <>
      <div className="text-center flex flex-row place-items-stretch space-x-2">
        {/* <Button className="mb-2 mx-1" onClick={() => naviage("./settings")}>
          Settings
        </Button> */}
        <Button className="w-full" onClick={() => navigate(Links.ResourceNew)}>
          New Resource
        </Button>
        {user.role >= PERMISSION.ADMIN && (
          <Button
            className=""
            variant="destructive"
            onClick={() => navigate("../admin")}
          >
            Admin Portal
          </Button>
        )}
      </div>
      <ImportSpigotSidebar />
      <EditStripe />

      <Button variant="secondary" onClick={logoutHandler}>
        Logout
      </Button>
    </>
  );
}
