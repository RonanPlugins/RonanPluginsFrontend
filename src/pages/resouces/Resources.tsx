import resourceAPI from "@/api/resource";
import Loading from "@/components/common/Loading";
import { useEffect, useState } from "react";
import ResourcePreview from "@/components/resource/ResourcePreview";

export default function Resources() {
  const [loading, setLoading] = useState(true);
  const [resources, setResources] = useState<any[] | null>(null);

  async function getResources() {
    const posts = await resourceAPI.getAll();
    console.log("response", posts);
    setResources(posts);
    setLoading(false);
  }

  useEffect(() => {
    getResources();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="w-full">
      {resources &&
        resources.map((resource) => (
          <ResourcePreview key={resource._id} resource={resource} />
        ))}
    </div>
  );
}
