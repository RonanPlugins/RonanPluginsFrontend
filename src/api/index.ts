import { backendApi, backendApiJSON } from "./axiosClient";

export default {
  async loginLocal(email: string, password: string): Promise<any> {
    return backendApiJSON
      .post(`/auth/login`, { email, password })
      .then((response) => {
        if (response.status === 200) return response;
        return null;
      })
      .then((response: any | null) => {
        if (response) return response.data.user;
        return null;
      })
      .catch(() => {
        return null;
      });
  },
  async loginDiscord() {
    location.replace(`${import.meta.env.VITE_API_URL}/auth/discord`);
  },
  async loginGithub() {
    location.replace(`${import.meta.env.VITE_API_URL}/auth/github`);
  },
  async logout() {
    backendApi.post("/auth/logout");
  },
  async signup(email: string, password: string): Promise<any> {
    return backendApiJSON
      .post("/auth/signup", { email, password })
      .then((response) => {
        if (response.status === 200) return response;
        return null;
      })
      .then((response: any | null) => {
        if (response) return response.data.user;
        return null;
      })
      .catch(() => {
        return null;
      });
  },
  async autoLogin(): Promise<any> {
    return backendApi
      .get(`/auth/login/success`)
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
