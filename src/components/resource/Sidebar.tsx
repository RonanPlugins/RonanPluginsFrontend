import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  CalendarDays,
  CircleHelp,
  Clock8Icon,
  Download,
  Edit,
  LinkIcon,
  SquareCodeIcon,
} from "lucide-react";
import date from "../../utils/date";
import { useUserContext } from "@/context/UserContext";
import { ResourceImage } from "./Image";
import { PLUGIN_CATEGORY } from "minecentral-api";
import { formatToTitleCase } from "@/utils/formatter";
import { Separator } from "../ui/separator";
import { ImageSmall } from "../common/Image";
import { Button } from "../ui/button";
import { ResourceDownloadCard } from "@/pages/resources/View";
import { UploadIcon } from "./UploadIcon";

export function ResourceSidebar({ resource }: { resource: any }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-1 gap-3">
      <Info resource={resource} />
      <div className="hidden lg:grid gap-3">
        <Tools resource={resource} />
        <Links resource={resource} />
        <Contributers resource={resource} />
      </div>
    </div>
  );
}

export function ResourceSidebarBottom({ resource }: { resource: any }) {
  return (
    <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-3">
      <Tools resource={resource} />
      <Links resource={resource} />
      <Contributers resource={resource} />
    </div>
  );
}

function Info({ resource }: { resource: any }) {
  return (
    <Card className="relative">
      {/* Information */}
      <div className="absolute top-0 w-full h-[120px] bg-primary rounded-t-xl" />
      <CardHeader className="mt-[60px]">
        <ResourceImage
          classname="z-10 !bg-primary-foreground -ml-2"
          id={resource._id}
        />
        <h2 className="font-bold text-2xl">{resource.title}</h2>

        <p>{resource.subtitle}</p>
        <div className="text-sm text-muted-foreground">
          {formatToTitleCase(
            PLUGIN_CATEGORY[resource.category || PLUGIN_CATEGORY.MISC]
          )}
        </div>
      </CardHeader>
      <CardContent className="relative px-3 grid gap-3">
        <Separator className="h-1" />

        <div className="flex flex-row items-center">
          <Download className="mr-1" size={18} />
          <p className="my-auto">
            <span className="text-xl font-bold">
              {resource.downloads || "N/A"}
            </span>{" "}
            downloads
          </p>
        </div>
        <div className="text-muted-foreground">
          {/* Created */}
          <dl className="flex flex-row">
            <dt className="mr-2 my-auto">
              <CalendarDays size={18} aria-label="last updated" />
            </dt>
            <dd>{`Created ${date(resource.createdAt)}`}</dd>
          </dl>
          {/* Last Updated */}
          <dl className="flex flex-row">
            <dt className="mr-2 my-auto">
              <Clock8Icon size={18} aria-label="last updated" />
            </dt>
            <dd>{`Updated ${date(resource.updatedAt)}`}</dd>
          </dl>
        </div>
        <div className="absolute bottom-0 right-0 p-3 lg:hidden">
          <ResourceDownloadCard resource={resource} />
        </div>
      </CardContent>
    </Card>
  );
}

function Tools({ resource }: { resource: any }) {
  // const [userProfile, setUser] = useState<any>({});
  // const [loading, setLoading] = useState(true);
  const { user } = useUserContext();

  // async function getUser() {
  //   const user = await memberAPI.get(`${resource.authorID._id}`);
  //   setUser(user);
  // }

  // useEffect(() => {
  //   getUser();
  //   setLoading(false);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // if (loading) return <></>;

  return (
    <>
      {user?._id === resource.authorID._id && (
        <Card>
          <CardTitle className="truncate p-3 rounded-t-xl flex flex-row font-bold">
            <Edit className="mr-2" />
            <h2>Resource Tools</h2>
          </CardTitle>
          <CardContent className="p-3">
            <Separator className="mb-2 h-1" />
            <Link className="hover:text-muted-foreground" to={"./edit"}>
              <p>Edit Resource</p>
            </Link>
            <UploadIcon resource={resource} />
            <p>Post Update</p>
          </CardContent>
        </Card>
      )}
    </>
  );
}

function Links({ resource }: { resource: any }) {
  return (
    <Card>
      <CardTitle className="truncate p-3 flex flex-row font-bold">
        <LinkIcon className="mr-2" />
        <h2>Links</h2>
      </CardTitle>
      <CardContent className="p-3">
        <Separator className="mb-2 h-1" />
        <Link
          className="flex flex-row gap-3 items-center hover:underline"
          to={resource.linkSupport}
        >
          <CircleHelp size={18} />
          <p>Support</p>
        </Link>
        <Link
          className="flex flex-row gap-3 items-center hover:underline"
          to={resource.linkSource}
        >
          <SquareCodeIcon size={18} />
          <p>Source Code</p>
        </Link>
      </CardContent>
    </Card>
  );
}

function Contributers({ resource }: { resource: any }) {
  return (
    <Card>
      <CardTitle className="truncate p-3 flex flex-row font-bold">
        <LinkIcon className="mr-2" />
        <h2>Contributors</h2>
      </CardTitle>
      <CardContent className="p-3">
        <Separator className="mb-2 h-1" />

        <Link to={`../user/${resource.authorID?._id}`}>
          <Button
            variant="ghost"
            className="flex flex-row w-full h-16 items-center justify-start"
          >
            <div className="text-center">
              <ImageSmall url={resource.authorID?.avatarURL} />
            </div>
            <div className="ml-1 flex flex-col justify-start">
              <p className="hover:underline self-start font-bold text-lg">
                {resource.authorID?.name}
              </p>
              Publisher
            </div>
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
