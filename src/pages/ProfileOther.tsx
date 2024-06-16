import Loading from "@/components/common/Loading";
import { ResourcePreview } from "@/components/resource/Preview";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import resourceAPI from "@/api/resource";
import memberAPI from "@/api/member";
import { useUserContext } from "@/context/UserContext";

export default function ProfileOther() {
  const { user }: { user: any } = useUserContext();
  const [userProfile, setUser] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [resources, setResources] = useState<any[] | null>(null);
  const { userID } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (userID === user?._id) navigate("../profile");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getResources() {
    const posts = await resourceAPI.getUser(`${userID}`);
    // console.log("response", posts);
    setResources(posts);
  }

  async function getUser() {
    const user = await memberAPI.get(`${userID}`);
    setUser(user);
  }

  useEffect(() => {
    getResources();
    getUser();
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="w-full text-center my-2">
      <h1 className="scroll-m-20 text-5xl font-extrabold tracking-tight text-center my-8 bg-gradient-to-r from-violet-600 to-rose-400 text-transparent bg-clip-text">
        {`${userProfile?.name}'s Profile`}
      </h1>

      <div className="resourceContainer">
        <h2 className="text-secondary-foreground text-3xl text-left">
          Resources from {userProfile?.name}
        </h2>
        <div className="resources">
          {resources &&
            resources.map((resource) => (
              <ResourcePreview key={resource._id} resource={resource} />
            ))}
        </div>
      </div>
    </div>
  );
}
