import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { CalendarDays, Edit, Edit3Icon, Loader, RssIcon } from "lucide-react";
import date, { getTimePassed } from "../../utils/date";
import { useUserContext } from "@/context/UserContext";
import { SERVER_CATEGORY } from "minecentral-api";
import { Separator } from "../ui/separator";
import { ServerUploadIcon } from "./UploadIcon";
import { DiscordWidget } from "../common/DiscordWidget";
import { Report } from "../common/Report";
import { CategoriesToString } from "../common/CategoriesToString";
import { CopyServerIP } from "./CopyServerIp";
import { Vote } from "./Vote";
import { ServerImageIcon } from "./Image";
import { useServerDataContext } from "@/context/ServerDataContext";
import { useState } from "react";
import { toast } from "sonner";
import serverAPI from "../../api/server";
import Loading from "../common/Loading";

export function ServerSidebar({ server }: { server: any }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-1 gap-3">
      <Info server={server} />
      <CopyServerIP server={server} />
      <Vote server={server} />

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
  const { status } = useServerDataContext();
  return (
    <Card className="relative">
      {/* Information */}
      <div className="absolute top-0 w-full h-[60px] bg-primary rounded-t-xl" />
      <CardHeader className="">
        <ServerImageIcon classname="z-10 !bg-card" base64={status.icon} />
        <h2 className="font-bold text-2xl">{server.title}</h2>

        <p>{server.subtitle}</p>
        <div className="text-sm text-muted-foreground flex flex-row items-center">
          {server.category &&
            CategoriesToString(SERVER_CATEGORY, server.category)}
          {/* Report Button */}
          <Report item={server} />
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
            <dd>{`Released ${date(server.createdAt)}`}</dd>
          </dl>
        </div>
      </CardContent>
    </Card>
  );
}

function Tools({ server }: { server: any }) {
  const { user } = useUserContext();

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
            <Bump server={server} />
          </CardContent>
        </Card>
      )}
    </>
  );
}

function Bump({ server }: { server: any }) {
  const [loading, setLoading] = useState(false);
  const enabled = getTimePassed(server.updatedAt) > 23;
  function bump() {
    if (!enabled) {
      toast.error(
        `Please wait ${
          23 - getTimePassed(server.updatedAt)
        } hours to Bump again!`
      );
    } else {
      setLoading(true);
      serverAPI
        .bump(server._id)
        .then((data) => {
          console.log(data);
          server.updatedAt = new Date();
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }
  return (
    <div
      className={`flex flex-row items-center gap-2 hover:text-primary hover:cursor-pointer ${
        !enabled ? "text-muted-foreground" : ""
      }`}
      onClick={bump}
    >
      {loading ? <Loading size={16} /> : <RssIcon size={16} />}
      <p>Bump Server</p>
    </div>
  );
}

function Links({ server }: { server: any }) {
  if (!server.discord) return <></>;
  return <>{server.discord && <DiscordWidget discordID={server.discord} />}</>;
}
