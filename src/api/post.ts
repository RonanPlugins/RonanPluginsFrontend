import { client } from "./axiosClient";

export default {
  async createPost(postInfo: any) {
    client
      .post(`/post/create`, postInfo)
      .then(({ data }) => {
        console.log("POST", data);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
