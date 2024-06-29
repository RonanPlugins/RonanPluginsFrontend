import { backendApi } from "./axiosClient";

export default {
  async loginDiscord() {
    // const params = new URLSearchParams({ username, password });
    location.replace(`${import.meta.env.VITE_API_URL}/auth/discord`);
    // return client.get(`/auth/discord`);
  },
  async loginGithub() {
    // const params = new URLSearchParams({ username, password });
    location.replace(`${import.meta.env.VITE_API_URL}/auth/github`);
    // return client.get(`/auth/discord`);
  },
  async logout() {
    backendApi.post("/auth/logout");
  },
  async autoLogin(): Promise<any> {
    return backendApi
      .get(`${import.meta.env.VITE_API_URL}/auth/login/success`)
      .then((response) => {
        if (response.status === 200) return response;
        return null;
        //throw new Error("authentication failed!");
      })
      .then((response: any | null) => {
        // console.log("DATA", response);
        if (response) return response.data.user;
        return null;
      })
      .catch(() => {
        // console.log("Cant login auto login!", err);
        return null;
        // throw new Error("authentication failed!");
      });
  },
};
