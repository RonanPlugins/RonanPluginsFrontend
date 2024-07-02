import { backendApi, backendApiJSON } from "./axiosClient";

export default {
  async loginLocal(email: string, password: string): Promise<any> {
    return backendApiJSON
      .post(`/auth/login`, { email, password })
      .then((response) => {
        return response;
      })
      .catch((err) => {
        console.log(err);
        return err.response;
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
  async register(email: string, password: string, name: string): Promise<any> {
    return backendApiJSON
      .post("/auth/register", { email, password, name })
      .then((response) => {
        if (response.status === 200) return response.data;
        return null;
      })
      .catch((err) => {
        if (err.response?.data) return err.response?.data || null;
      });
  },
  async resendRegister(email: string): Promise<any> {
    return backendApiJSON
      .post("/auth/register-resend", { email })
      .then((response) => {
        if (response.status === 200) return response.data;
        return null;
      })
      .catch((err) => {
        if (err.response?.data) return err.response?.data || null;
      });
  },
  async verifyEmail(token: string): Promise<any> {
    return backendApiJSON.post("/auth/email-verify", { token });
    // .then((response) => {
    //   if (response.status === 200) return response.data;
    //   return null;
    // })
    // .catch((err) => {
    //   console.log(err);
    //   return null;
    // });
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
