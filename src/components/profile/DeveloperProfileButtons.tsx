import { useUserContext } from "@/context/UserContext";
import { EditSpigot } from "./EditSpigot";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import Links from "@/lib/Links";
import { PERMISSION } from "@/utils/PERMISSION";

export default function SideBar_Developer() {
  const { user }: { user: any } = useUserContext();
  const naviage = useNavigate();
  return (
    <>
      <div className="text-center grid grid-cols-2 place-items-stretch space-x-2">
        {/* <Button className="mb-2 mx-1" onClick={() => naviage("./settings")}>
          Settings
        </Button> */}
        {user.role >= PERMISSION.CREATOR && (
          <Button className="" onClick={() => naviage(Links.ResourceNew)}>
            New Resource
          </Button>
        )}
        {user.role >= PERMISSION.ADMIN && (
          <Button
            className=""
            variant="destructive"
            onClick={() => naviage("../admin")}
          >
            Admin Portal
          </Button>
        )}
      </div>
      <EditSpigot />
    </>
  );
}
