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
  getAll(filter?: FilterParams): Promise<any> {
    return client
      .get(`/resource/get`, { responseType: "json", params: { ...filter } })
      .then(({ data }) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
        return null;
      });
  },
  getUser(userID: string): Promise<any> {
    return client
      .get(`/resource/user/${userID}`, { responseType: "json" })
      .then(({ data }) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
        return null;
      });
  },
  getCount(): Promise<any> {
    return client
      .get(`/resource/count`, {
        responseType: "json",
      })
      .then(({ data }) => {
        return data.count;
      })
      .catch((err) => {
        console.log(err);
        return null;
      });
  },
  getIcon(id: string): Promise<any> {
    return client
      .get(`/resource/file/${id}`, {
        responseType: "blob",
      })
      .then(({ data }) => {
        return URL.createObjectURL(data);
      })
      .catch((err) => {
        console.log(err);
        return null;
      });
  },
  getJar(id: string): Promise<any> {
    return client
      .get(`/resource/file/${id}`, {
        responseType: "blob",
      })
      .then(({ data }) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
        return null;
      });
  },
};

interface FilterParams {
  sort: string; //FILTERBY enum
  page: number; //Page currently on
  count: number; //How many per page
}
