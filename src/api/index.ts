import { client } from "./axiosClient";

export default {
  async loginDiscord() {
    // const params = new URLSearchParams({ username, password });
    window.open(`${import.meta.env.VITE_API_URL}/auth/discord`);
    // return client.get(`/auth/discord`);
  },
  async logout() {
    client.post("/auth/logout");
  },
  async autoLogin(): Promise<any | null> {
    return client
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
      .catch((err: any) => {
        // console.log("Cant login auto login!", err);
        return null;
        // throw new Error("authentication failed!");
      });
  },
};
