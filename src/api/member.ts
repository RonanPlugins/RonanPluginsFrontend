import { backendApi } from "./axiosClient";

export default {
  getAll(): Promise<any> {
    return backendApi
      .get(`/member`)
      .then(({ data }) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
        return null;
      });
  },
  get(userID: string): Promise<any> {
    return backendApi
      .get(`/member/${userID}`)
      .then(({ data }) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
        return null;
      });
  },
};
