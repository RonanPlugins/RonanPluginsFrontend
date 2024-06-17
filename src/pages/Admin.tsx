import memberAPI from "@/api/member";
import Loading from "@/components/common/Loading";
import {
  TooltipProvider,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Clock8 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import date from "../utils/date";
import Image from "@/components/common/Image";

export default function Admin() {
  const [users, setUsers] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);

  async function getUsers() {
    setUsers(await memberAPI.getAll());
    setLoading(false);
  }

  useEffect(() => {
    getUsers();
  }, []);
  if (loading) return <Loading />;
  return (
    <div className="resourceContainer my-2">
      <h1>Members</h1>
      <div className="resources">
        {users?.map((user) => {
          return (
            <div key={user._id} className="p-2 flex flex-row">
              <Image url={user.avatarURL} />
              <div className="ml-2 grid">
                <h3 className="text-primary font-bold hover:text-secondary-foreground hover:underline">
                  <Link to={`../user/${user._id}`}>{user.name}</Link>
                </h3>
                <p className=" text-secondary-foreground/80 text-sm mt-auto">
                  Resources: 0
                </p>
              </div>
              <div className="self-end ml-auto text-xs">
                <dl className="flex flex-row">
                  <dt className="text-secondary-foreground/50 mr-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Clock8 size={16} aria-label="last seen" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Last Seen</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </dt>
                  <dd className="hover:underline">{date(user.lastLogin)}</dd>
                </dl>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
