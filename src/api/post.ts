import { client } from "./axiosClient";

export default {
  create(postInfo: any): Promise<any> {
    return client
      .post(`/post/create`, postInfo)
      .then(({ data }) => {
        //console.log("POST", data);
        return data;
      })
      .catch((err) => {
        console.log(err);
        return null;
      });
  },
  getOne(postId: string | undefined): Promise<any> {
    return client
      .get(`/post/get/${postId}`)
      .then(({ data }) => {
        //console.log("POST", data);
        return data;
      })
      .catch((err) => {
        console.log(err);
        return null;
      });
  },
  getAll(): Promise<any> {
    return client
      .get(`/post/get`, { responseType: "json" })
      .then(({ data }) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
        return null;
      });
  },
};
