import { Link } from "react-router-dom";
import { Card, CardContent, CardTitle } from "../ui/card";
import { CalendarDays, Clock8Icon, Download, Edit, User2 } from "lucide-react";
import date from "../../utils/date";
import memberAPI from "@/api/member";
import { useEffect, useState } from "react";
import Loading from "../common/Loading";
import Image from "../common/Image";
import { Button } from "../ui/button";
import purchase from "@/api/purchase";
import { useUserContext } from "@/context/UserContext";

export function ResourceSidebar({ resource }: { resource: any }) {
  const [userProfile, setUser] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const { user } = useUserContext();

  async function getUser() {
    const user = await memberAPI.get(`${resource.authorID._id}`);
    setUser(user);
  }

  useEffect(() => {
    getUser();
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-2">
      {/* Information */}
      <Card>
        <CardContent className="p-3 grid">
          <div className="mx-auto text-center">
            <Link to={`../user/${userProfile?._id}`}>
              <Image
                classname="max-h-[48px] max-w-[48px] hover:ring-4 rounded"
                url={userProfile?.avatarURL}
              />
            </Link>
          </div>
          <div className="flex flex-row">
            <User2 className="mr-1" size={20} />
            <Link
              className="hover:underline"
              to={`../user/${userProfile?._id}`}
            >
              {userProfile?.name}
            </Link>
          </div>
          <div className="flex flex-row items-center">
            <Download className="mr-1" size={20} />
            <p className="my-auto">
              <span className="text-xl font-bold">
                {resource.downloads || "N/A"}
              </span>{" "}
              downloads
            </p>
          </div>
          {/* Last Updated */}
          <dl className="flex flex-row">
            <dt className="mr-2 my-auto">
              <Clock8Icon size={20} aria-label="last updated" />
            </dt>
            <dd>{date(resource.updatedAt)}</dd>
          </dl>
          {/* Created */}
          <dl className="flex flex-row">
            <dt className="mr-2 my-auto">
              <CalendarDays size={20} aria-label="last updated" />
            </dt>
            <dd>{date(resource.createdAt)}</dd>
          </dl>
          {/* TEMP */}
          <Button
            onClick={() => {
              purchase.resource(resource._id);
            }}
          >
            Purchase
          </Button>
        </CardContent>
      </Card>
      {/* Edit Resource */}
      {user?._id === userProfile._id && (
        <Card>
          <CardTitle className="truncate p-2 rounded-t-md flex flex-row">
            <Edit className="mr-2" />
            <h2>Resource Tools</h2>
          </CardTitle>
          <CardContent className="p-3">
            <Link to={"./edit"}>
              <p>Edit Resource</p>
            </Link>
            <p>Edit Icon</p>
            <p>Post Update</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
