import resourceAPI from "@/api/resource";
import Loading from "@/components/common/Loading";
import { useEffect, useState } from "react";
import ResourcePreview from "@/components/resource/ResourcePreview";
import { FILTERBY, getTitle } from "@/utils/FILTERBY";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Resources() {
  const [loading, setLoading] = useState(true);
  const [resources, setResources] = useState<any[] | null>(null);
  const [filterBy, setFilterBy] = useState<string>(FILTERBY.LAST_UPDATE);
  async function getResources(filter: string) {
    const posts = await resourceAPI.getAll(filter);
    console.log("response", posts);
    setResources(posts);
    setLoading(false);
  }

  useEffect(() => {
    getResources(filterBy);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getResources(filterBy);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterBy]);

  if (loading) return <Loading />;

  return (
    <div className="resourceContainer my-2">
      <div className="flex flex-row">
        <h1 className="">Resources</h1>
        <div className="flex flex-row ml-auto mb-2">
          <p className="my-auto mr-2">Sort By:</p>
          <Select onValueChange={setFilterBy} value={filterBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.values(FILTERBY).map((filter) => (
                <SelectItem value={filter}>{getTitle(filter)}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="resources">
        {resources &&
          resources.map((resource) => (
            <ResourcePreview key={resource._id} resource={resource} />
          ))}
      </div>
    </div>
  );
}
