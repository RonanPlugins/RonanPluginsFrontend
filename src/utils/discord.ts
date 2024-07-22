export function isValidDiscordServerId(serverId: string) {
  const discordServerIdRegex = /^\d{18}$/;
  return discordServerIdRegex.test(serverId);
}
