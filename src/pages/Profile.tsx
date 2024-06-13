import Loading from "@/components/common/Loading";
import ResourcePreview from "@/components/resource/ResourcePreview";
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/context/UserContext";
import { PERMISSION } from "@/utils/PERMISSION";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import resourceAPI from "@/api/resource";
import Links from "@/lib/Links";
import { EditSpigot } from "@/components/profile/EditSpigot";

export default function Profile() {
  const { user }: { user: any } = useUserContext();
  const naviage = useNavigate();

  const [loading, setLoading] = useState(true);
  const [resources, setResources] = useState<any[] | null>(null);

  async function getResources() {
    const posts = await resourceAPI.getUser(user?._id);
    // console.log(posts);
    setResources(posts);
    setLoading(false);
  }

  useEffect(() => {
    getResources();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="w-full my-2">
      <h1 className="scroll-m-20 text-5xl font-extrabold tracking-tight text-center my-8 bg-gradient-to-r from-violet-600 to-rose-400 text-transparent bg-clip-text">
        Welcome Back {user.name}
      </h1>

      <div className="text-center">
        {/* <Button className="mb-2 mx-1" onClick={() => naviage("./settings")}>
          Settings
        </Button> */}
        {user.role >= PERMISSION.CREATOR && (
          <Button
            className="mb-2 mx-1"
            onClick={() => naviage(Links.ResourceNew)}
          >
            New Resource
          </Button>
        )}
        {user.role >= PERMISSION.ADMIN && (
          <Button className="mb-2 mx-1" onClick={() => naviage("../admin")}>
            Admin Portal
          </Button>
        )}
      </div>

      <div className="w-full">
        <div className="max-w-6xl mx-auto flex md:flex-row flex-col">
          <div className="resourceContainer max-w-4xl grow mr-2 w-full">
            <h2 className="text-secondary-foreground text-3xl text-left">
              Resources from {user.name}
            </h2>
            <div className="resources">
              {resources &&
                resources.map((resource) => (
                  <ResourcePreview key={resource._id} resource={resource} />
                ))}
            </div>
          </div>
          <EditSpigot />
        </div>
      </div>
    </div>
  );
}
