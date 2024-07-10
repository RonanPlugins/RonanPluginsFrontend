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
import { ResourceDownloadButton } from "@/pages/resources/View";
import { UploadIcon } from "./UploadIcon";
import { useEffect, useState } from "react";
import discord from "@/api/discord";

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
        <ResourceImage classname="z-10 !bg-card" id={resource._id} />
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
          <Download className="mr-2" size={18} />
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
          <ResourceDownloadButton resource={resource} />
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

  if (!user) return <></>;

  return (
    <>
      {user?._id === resource.authorID?._id && (
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
          className="flex flex-row gap-2 items-center hover:text-primary transition-colors duration-200"
          to={resource.linkSupport}
        >
          <CircleHelp size={18} />
          <p>Support</p>
        </Link>
        <Link
          className="flex flex-row gap-2 items-center hover:text-primary transition-colors duration-200"
          to={resource.linkSource}
        >
          <SquareCodeIcon size={18} />
          <p>Source Code</p>
        </Link>
        {resource.discord && <DiscordLink discordID={resource.discord} />}
      </CardContent>
    </Card>
  );
}

function Contributers({ resource }: { resource: any }) {
  if (!resource.authorID) return <></>;
  return (
    <Card>
      <CardTitle className="truncate p-3 flex flex-row font-bold">
        <LinkIcon className="mr-2" />
        <h2>Contributors</h2>
      </CardTitle>
      <CardContent className="p-3">
        <Separator className="mb-3 h-1" />

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

function DiscordLink({ discordID }: { discordID: string }) {
  //const discordID = "182633513474850818";
  const [onlineCount, setOnlineCount] = useState<number | null>(null);
  const [inviteLink, setInviteLink] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  async function getDiscord() {
    const data = await discord.getDiscord(discordID);
    console.log(data);
    setOnlineCount(data.presence_count);
    setInviteLink(data.instant_invite);
    setLoading(false);
  }

  useEffect(() => {
    getDiscord();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function DiscordBox() {
    return (
      <div className="mt-2 w-full bg-[#7289da] hover:bg-[#5673dc] p-2 rounded-xl flex flex-row flex-wrap items-center">
        <img src="/assets/discord.svg" className="h-6 w-6 mr-2" alt="" />
        <h2 className="text-xl font-bold mr-2">Discord</h2>
        {onlineCount && (
          <p className="ml-auto text-sm">
            <span className="font-bold">{onlineCount}</span> Members Online
          </p>
        )}
      </div>
    );
  }

  if (loading) return <></>;

  if (!inviteLink) return <></>;

  return (
    <a href={inviteLink} target="_blank" rel="noopener noreferrer">
      <DiscordBox />
    </a>
  );
}
