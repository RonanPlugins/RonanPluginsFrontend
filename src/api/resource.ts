import { client } from "./axiosClient";

export default {
  create(resourceInfo: any): Promise<any> {
    console.log("New Create Resource Request", resourceInfo);
    return client
      .post(`/resource/create`, resourceInfo)
      .then(({ data }) => {
        //console.log("POST", data);
        return data;
      })
      .catch((err) => {
        console.log(err);
        return null;
      });
  },
  getOne(resourceId: string | undefined): Promise<any> {
    return client
      .get(`/resource/get/${resourceId}`)
      .then(({ data }) => {
        //console.log("POST", data);
        return data;
      })
      .catch((err) => {
        console.log(err);
        return null;
      });
  },
  getAll(filter?: string): Promise<any> {
    return client
      .get(`/resource/get`, { responseType: "json", params: { filter } })
      .then(({ data }) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
        return null;
      });
  },
  // getImage(imageID: string): Promise<any> {
  //   return client
  //     .get(`/post/get/image/${imageID}`)
  //     .then(({ data }) => {
  //       return data;
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       return null;
  //     });
  // },
};
