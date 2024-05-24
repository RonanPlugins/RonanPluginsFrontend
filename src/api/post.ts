import { client } from "./axiosClient";

export default {
  createPost(postInfo: any): Promise<any> {
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
  get(postId: string | undefined): Promise<any> {
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
};
