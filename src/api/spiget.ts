import { spigotApi } from "./axiosClient";
export default {
  getResource(resourceID: string): Promise<any> {
    return spigotApi
      .get(`/resources/${resourceID}?size=50`)
      .then(({ data }) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
        return null;
      });
  },
  getVersion(resourceID: string): Promise<any> {
    return spigotApi
      .get(`/resources/${resourceID}/versions/542316`)
      .then(({ data }) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
        return null;
      });
  },
};
