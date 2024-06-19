import { spigotApi } from "./axiosClient";
export default {
  getResources(authorID: string): Promise<any> {
    return spigotApi
      .get(`/authors/${authorID}/resources?size=50`)
      .then(({ data }) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
        return null;
      });
  },
};
