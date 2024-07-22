import { backendApi, mcstatusioAPI } from "./axiosClient";

export default {
  getAll(filter?: FilterParams): Promise<any> {
    console.log("Filter", filter);
    return backendApi
      .get(`/server`, { responseType: "json", params: { ...filter } })
      .then(({ data }) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
        return null;
      });
  },
  create(data: any) {
    return backendApi.post(`/server`, data);
  },
  getStatus(address: string): Promise<any> {
    return mcstatusioAPI
      .get(`/status/java/${address}`)
      .then(({ data }) => {
        return data;
      })
      .catch(() => {
        // console.log(err);
        return null;
      });
  },
  getOne(serverId: string | undefined): Promise<any> {
    return backendApi
      .get(`/server/${serverId}`)
      .then(({ data }) => {
        //console.log("POST", data);
        return data;
      })
      .catch((err) => {
        console.log(err);
        return null;
      });
  },
  getUser(userID: string): Promise<any> {
    return backendApi
      .get(`/server/user/${userID}`, { responseType: "json" })
      .then(({ data }) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
        return null;
      });
  },
  edit(id: string, info: any): Promise<any> {
    console.log("Edit Server Request", id, info);
    return backendApi
      .put(`/server/${id}`, info)
      .then(({ data }) => {
        // console.log("PUT", data);
        return data;
      })
      .catch((err) => {
        console.log(err);
        return null;
      });
  },
  editIcon(id: string, image: FormData): Promise<any> {
    return backendApi
      .put(`/server/${id}/icon`, image)
      .then(({ data }) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
        return null;
      });
  },
  getIcon(id: string): Promise<string | null> {
    return backendApi
      .get(`/server/${id}/image`, {
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
};

interface FilterParams {
  sort: string; //FILTERBY enum
  page: number; //Page currently on
  count: number; //How many per page
  search: string | null; //Search string
  category: number | null; //Server category
}
