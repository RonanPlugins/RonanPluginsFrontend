import { backendApi } from "./axiosClient";

export default {
  create(resourceInfo: any): Promise<any> {
    console.log("New Create Resource Request", resourceInfo);
    return backendApi
      .post(`/resource`, resourceInfo)
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
    console.log("Edit Resource Request", id, info);
    return backendApi
      .put(`/resource/${id}`, info)
      .then(({ data }) => {
        console.log("PUT", data);
        return data;
      })
      .catch((err) => {
        console.log(err);
        return null;
      });
  },
  editIcon(id: any, icon: any): Promise<any> {
    return backendApi
      .put(`/resource/${id}/icon`, icon)
      .then(({ data }) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
        return null;
      });
  },
  delete(id: number): Promise<any> {
    console.log("Delete Resource Request", id);
    return backendApi
      .delete(`/resource/${id}`)
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
    return backendApi
      .get(`/resource/${resourceId}`)
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
    return backendApi
      .get(`/resource`, { responseType: "json", params: { ...filter } })
      .then(({ data }) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
        return null;
      });
  },
  getUser(userID: string): Promise<any> {
    return backendApi
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
    return backendApi
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
    return backendApi
      .get(`/resource/${id}/image`, {
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
    return backendApi
      .get(`/resource/${id}/file`, {
        responseType: "blob",
      })
      .then(({ data }) => {
        return data;
      })
      .catch(() => {
        // console.log(err);
        return null;
      });
  },
};

interface FilterParams {
  sort: string; //FILTERBY enum
  page: number; //Page currently on
  count: number; //How many per page
}
