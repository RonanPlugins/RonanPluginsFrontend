import discord from "@/api/discord";
import { isValidDiscordServerId } from "@/utils/discord";
import { useEffect, useState } from "react";

export function DiscordWidget({ discordID }: { discordID: string }) {
  //const discordID = "182633513474850818";
  const [onlineCount, setOnlineCount] = useState<number | null>(null);
  const [inviteLink, setInviteLink] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  async function getDiscord() {
    const data = await discord.getDiscord(discordID);
    try {
      setOnlineCount(data.presence_count);
      setInviteLink(data.instant_invite);
    } catch (err) {
      //
    }
    setLoading(false);
  }

  useEffect(() => {
    if (isValidDiscordServerId(discordID)) getDiscord();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function DiscordBox() {
    return (
      <div className="w-full bg-[#7289da] hover:bg-[#5673dc] p-2 rounded-xl flex flex-row flex-wrap items-center">
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
