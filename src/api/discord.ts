import { discordApi } from "./axiosClient";
export default {
  getDiscord(serverId: string): Promise<any> {
    return discordApi
      .get(`/guilds/${serverId}/widget.json`)
      .then(({ data }) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
        return null;
      });
  },
};
