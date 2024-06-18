import { client } from "./axiosClient";

export default {
  setSpigot(spigotID: string): Promise<any> {
    return client
      .post(`/profile/spigot`, null, { params: { spigotID } })
      .then(({ data }) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
        return null;
      });
  },
  resyncSpigot(): Promise<any> {
    return client
      .post(`/profile/spigot/sync`)
      .then(({ data }) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
        return null;
      });
  },
  createStripeAccount(): Promise<any> {
    return client
      .get("/profile/stripe/create")
      .then(({ data }) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
        return null;
      });
  },
  createStripeAccountLink(account_id: string): Promise<any> {
    return client
      .get(`/profile/stripe/link/${account_id}`)
      .then(({ data }) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
        return null;
      });
  },
  getStripeStatus(): Promise<any> {
    return client
      .get(`/profile/stripe/status`)
      .then(({ data }) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
        return null;
      });
  },
};
