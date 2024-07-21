import memberAPI from "@/api/member";
import Loading from "@/components/common/Loading";
import { Clock8 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import date from "../utils/date";
import Image from "@/components/common/Image";
import usePageTitle from "@/utils/usePageTitle";
import { TooltipWidget } from "@/components/common/TooltipWidget";

export default function Admin() {
  usePageTitle("Admin");
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
  console.log(users);
  return (
    <div className="resourceContainer my-3 max-w-6xl mx-auto">
      <h1>Members</h1>
      <div className="grid grid-cols-3">
        {users?.map((user) => {
          return (
            <div key={user._id} className="p-2 flex flex-row">
              <Link to={`../user/${user._id}`}>
                <Image url={user.avatarURL} />
              </Link>
              <div className="ml-2 grid">
                <h3 className="text-primary font-bold hover:text-secondary-foreground hover:underline">
                  <Link to={`../user/${user._id}`}>{user.name}</Link>
                </h3>
                <p className=" text-secondary-foreground/80 text-sm mt-auto">
                  Resources: {user.resources || 0}
                </p>
              </div>
              <div className="self-end ml-auto text-xs">
                <dl className="flex flex-row">
                  <dt className="text-secondary-foreground/50 mr-2">
                    <TooltipWidget tooltip="Last Seen">
                      <Clock8 size={16} aria-label="last seen" />
                    </TooltipWidget>
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
