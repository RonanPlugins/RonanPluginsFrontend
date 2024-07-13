import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  CalendarDays,
  Clock8Icon,
  Edit,
  Edit3Icon,
  LinkIcon,
} from "lucide-react";
import date from "../../utils/date";
import { useUserContext } from "@/context/UserContext";
import { PLUGIN_CATEGORY } from "minecentral-api";
import { toTitleCase } from "@/utils/formatter";
import { Separator } from "../ui/separator";

import { ServerUploadIcon } from "./UploadIcon";

import { ServerImage } from "./Image";
import { DiscordWidget } from "../common/DiscordWidget";

export function ServerSidebar({ server }: { server: any }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-1 gap-3">
      <Info server={server} />
      <div className="hidden lg:grid gap-3">
        <Tools server={server} />
        <Links server={server} />
      </div>
    </div>
  );
}

export function ServerSidebarBottom({ server }: { server: any }) {
  return (
    <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-3">
      <Tools server={server} />
      <Links server={server} />
    </div>
  );
}

function Info({ server }: { server: any }) {
  return (
    <Card className="relative">
      {/* Information */}
      <div className="absolute top-0 w-full h-[120px] bg-primary rounded-t-xl" />
      <CardHeader className="mt-[60px]">
        <ServerImage classname="z-10 !bg-card" server={server} />
        <h2 className="font-bold text-2xl">{server.title}</h2>

        <p>{server.subtitle}</p>
        <div className="text-sm text-muted-foreground">
          {toTitleCase(
            PLUGIN_CATEGORY[server.category || PLUGIN_CATEGORY.MISC]
          )}
        </div>
      </CardHeader>
      <CardContent className="relative px-3 grid gap-3">
        <Separator className="h-1" />

        <div className="text-muted-foreground">
          {/* Created */}
          <dl className="flex flex-row">
            <dt className="mr-2 my-auto">
              <CalendarDays size={18} aria-label="last updated" />
            </dt>
            <dd>{`Created ${date(server.createdAt)}`}</dd>
          </dl>
          {/* Last Updated */}
          <dl className="flex flex-row">
            <dt className="mr-2 my-auto">
              <Clock8Icon size={18} aria-label="last updated" />
            </dt>
            <dd>{`Updated ${date(server.updatedAt)}`}</dd>
          </dl>
        </div>
      </CardContent>
    </Card>
  );
}

function Tools({ server }: { server: any }) {
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

  if (!user) return <></>;

  return (
    <>
      {user?._id === server.authorID?._id && (
        <Card>
          <CardTitle className="truncate p-3 rounded-t-xl flex flex-row font-bold">
            <Edit className="mr-2" />
            <h2>Server Tools</h2>
          </CardTitle>
          <CardContent className="p-3">
            <Separator className="mb-2 h-1" />
            <Link
              className="flex flex-row items-center gap-2 hover:text-primary"
              to={"./edit"}
            >
              <Edit3Icon size={16} />
              <p>Edit Server</p>
            </Link>
            <ServerUploadIcon resource={server} />
          </CardContent>
        </Card>
      )}
    </>
  );
}

function Links({ server }: { server: any }) {
  if (!server.discord) return <></>;
  return <>{server.discord && <DiscordWidget discordID={server.discord} />}</>;
}
