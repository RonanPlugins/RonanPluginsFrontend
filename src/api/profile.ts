import { client } from "./axiosClient";

export default {
  setSpigot(spigotID: string): Promise<any> {
    return client
      .post(`/profile/setSpigot`, null, { params: { spigotID } })
      .then(({ data }) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
        return null;
      });
  },
};
