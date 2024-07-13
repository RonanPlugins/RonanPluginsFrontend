import { backendApi, mcstatusioAPI } from "./axiosClient";

export default {
  getAll(filter?: FilterParams): Promise<any> {
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
  create(data: any): Promise<any> {
    return backendApi
      .post(`/server`, data)
      .then(({ data }) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
        return null;
      });
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
  editIcon(id: string, icon: File): Promise<any> {
    return backendApi
      .put(`/server/${id}/icon`, icon)
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
  search: string | null; //Search string
}
