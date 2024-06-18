import Loading from "@/components/common/Loading";
import { ResourcePreview } from "@/components/resource/Preview";
import { useUserContext } from "@/context/UserContext";
import { useEffect, useState } from "react";
import resourceAPI from "@/api/resource";
import { useNavigate } from "react-router-dom";
import api from "@/api";
import { Button } from "@/components/ui/button";
import ProfileSidebar from "@/components/profile/ProfileSidebar";

export default function Profile() {
  const { user, logout }: { user: any; logout: any } = useUserContext();

  const [loading, setLoading] = useState(true);
  const [resources, setResources] = useState<any[] | null>(null);
  const navigate = useNavigate();

  async function getResources() {
    const posts = await resourceAPI.getUser(user?._id);
    // console.log(posts);
    setResources(posts);
    setLoading(false);
  }

  const logoutHandler = async () => {
    logout();
    await api.logout();
    navigate("/home");
  };

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

      <div className="w-full">
        <div className="max-w-6xl mx-auto flex md:flex-row flex-col">
          <div className="resourceContainer max-w-4xl grow mr-2 w-full">
            <div className="resources">
              {resources &&
                resources.map((resource) => (
                  <div key={resource._id} className="resource">
                    <ResourcePreview resource={resource} />
                  </div>
                ))}
            </div>
          </div>
          <div className="max-w-2xl flex flex-col space-y-2 mx-2">
            <Button onClick={logoutHandler}>Logout</Button>
            <ProfileSidebar />
          </div>
        </div>
      </div>
    </div>
  );
}
