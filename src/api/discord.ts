import { discordApi } from "./axiosClient";
export default {
  getDiscord(guild: string): Promise<any> {
    return discordApi
      .get(`/guilds/${guild}/preview?with_counts=true&with_expiration=true`)
      .then(({ data }) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
        return null;
      });
  },
};
