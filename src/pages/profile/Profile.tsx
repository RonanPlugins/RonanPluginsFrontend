import Loading from "@/components/common/Loading";
import { ResourcePreview } from "@/components/resource/Preview";
import { useUserContext } from "@/context/UserContext";
import { useEffect, useState } from "react";
import resourceAPI from "@/api/resource";
import ProfileSidebar from "@/components/profile/ProfileSidebar";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Links from "@/lib/Links";
import usePageTitle from "@/utils/usePageTitle";
import serverAPI from "@/api/server";
import { ServerPreview } from "@/components/server/Preview";

export default function Profile() {
  usePageTitle("Profile");
  const { user }: { user: any; logout: any } = useUserContext();

  return (
    <div className="w-full my-3">
      <h1
        className="scroll-m-20 text-5xl font-extrabold tracking-tight text-center my-6 bg-gradient-to-r 
        from-violet-600 to-rose-400 text-transparent bg-clip-text"
      >
        Welcome Back {user.name}
      </h1>

      <div className="w-full">
        <div className="max-w-6xl mx-auto flex md:flex-row flex-col md:space-x-3 px-2">
          <div className="max-w-4xl w-full flex flex-col gap-3">
            <h2 className="font-bold text-2xl">Resources</h2>
            <Resources />
            <h2 className="font-bold text-2xl">Servers</h2>
            <Servers />
          </div>
          <div className="w-full lg:max-w-80 flex flex-col space-y-3 mx-auto">
            <ProfileSidebar />
          </div>
        </div>
      </div>
    </div>
  );
}

function Resources() {
  const [loading, setLoading] = useState(true);
  const [resources, setResources] = useState<any[] | null>(null);
  const navigate = useNavigate();

  const { user }: { user: any; logout: any } = useUserContext();

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
  return (
    <div className="resources w-full">
      {resources && resources.length > 0 ? (
        resources.map((resource) => (
          <div key={resource._id}>
            <ResourcePreview resource={resource} />
          </div>
        ))
      ) : (
        <div className="w-full h-full bg-card rounded-xl flex flex-col">
          {loading ? (
            <Loading />
          ) : (
            <>
              <h2 className="mx-auto my-3 font-bold">Quite Empty Here...</h2>
              <Button
                variant="special"
                className="mx-auto my-5"
                onClick={() => navigate(Links.ResourceNew)}
              >
                Post Your First Resource
              </Button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

function Servers() {
  const [loading, setLoading] = useState(true);
  const [servers, setServers] = useState<any[] | null>(null);
  const navigate = useNavigate();

  const { user }: { user: any; logout: any } = useUserContext();

  async function getServers() {
    const posts = await serverAPI.getUser(user?._id);
    // console.log(posts);
    setServers(posts);
    setLoading(false);
  }

  useEffect(() => {
    getServers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="resources w-full">
      {servers && servers.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {servers.map((server) => (
            <div key={server._id}>
              <ServerPreview server={server} />
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full h-full bg-card rounded-xl flex flex-col">
          {loading ? (
            <Loading />
          ) : (
            <>
              <h2 className="mx-auto my-3 font-bold">Quite Empty Here...</h2>
              <Button
                variant="special"
                className="mx-auto my-5"
                onClick={() => navigate(Links.ServerNew)}
              >
                Post Your First Server
              </Button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
