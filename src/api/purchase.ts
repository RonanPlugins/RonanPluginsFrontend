import { backendApi } from "./axiosClient";

export default {
  resource(id: string): Promise<any> {
    return backendApi
      .post(`/purchase/resource/${id}`)
      .then(({ data }) => {
        console.log("Purchased ", id);
        return data;
      })
      .catch((err) => {
        console.log(err);
        return null;
      });
  },
};
