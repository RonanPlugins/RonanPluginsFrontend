import { useUserContext } from "@/context/UserContext";
import { EditSpigot } from "./EditSpigot";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import Links from "@/lib/Links";
import { PERMISSION } from "@/utils/PERMISSION";

export default function SideBar_Developer({ classname }: { classname: any }) {
  const { user }: { user: any } = useUserContext();
  const naviage = useNavigate();
  return (
    <div className={`${classname}`}>
      <div className="my-2 md:mt-0 text-center flex flex-row justify-center">
        {/* <Button className="mb-2 mx-1" onClick={() => naviage("./settings")}>
          Settings
        </Button> */}
        {user.role >= PERMISSION.CREATOR && (
          <Button className="mx-1" onClick={() => naviage(Links.ResourceNew)}>
            New Resource
          </Button>
        )}
        {user.role >= PERMISSION.ADMIN && (
          <Button
            className="mx-1"
            variant="destructive"
            onClick={() => naviage("../admin")}
          >
            Admin Portal
          </Button>
        )}
      </div>
      <EditSpigot />
    </div>
  );
}
