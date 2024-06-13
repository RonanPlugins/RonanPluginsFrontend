import { client } from "./axiosClient";

export default {
  setSpigot(spigotID: string, userID: string): Promise<any> {
    return client
      .post(`/profile/setSpigot/${userID}`, null, { params: { spigotID } })
      .then(({ data }) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
        return null;
      });
  },
};
