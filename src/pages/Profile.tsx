import Loading from "@/components/common/Loading";
import ResourcePreview from "@/components/resource/ResourcePreview";
import { useUserContext } from "@/context/UserContext";
import { useEffect, useState } from "react";
import resourceAPI from "@/api/resource";
import SideBar_Developer from "@/components/profile/SideBar_Developer";

export default function Profile() {
  const { user }: { user: any } = useUserContext();

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
          <SideBar_Developer classname="max-w-2xl" />
        </div>
      </div>
    </div>
  );
}
