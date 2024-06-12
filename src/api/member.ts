import { client } from "./axiosClient";

export default {
  getAll(): Promise<any> {
    return client
      .get(`/member/get`)
      .then(({ data }) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
        return null;
      });
  },
  get(userID: string): Promise<any> {
    return client
      .get(`/member/get/${userID}`)
      .then(({ data }) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
        return null;
      });
  },
};
