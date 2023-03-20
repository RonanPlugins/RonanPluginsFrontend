import axios from 'axios';
import { toast } from 'react-toastify';

const client = axios.create({
    // https://api.ronanplugins.com
    // http://localhost:3001
    baseURL: "https://api.ronanplugins.com",
    responseType: "json",
    withCredentials: true,
});

export default {

    // ---------------- User ----------------
    async login({ username, password }) {
        const params = new URLSearchParams({ "usernameOrEmail": username, password })

        return client.post(`/user/login`, params.toString())
    },
    async signup({ firstName, lastName, username, email, password }) {
        return client.post(`/user/create`, { firstName, lastName, username, email, password })
    },
    async user() {
        return client.get(`/user`)
    },
    async changePassword({ oldPassword, newPassword }) {
        return client.post(`/user/create`, { oldPassword, newPassword })
    },
    async deleteUser({ confirmPassword }) {
        return client.delete(`/user/delete`, { confirmPassword })
    },
    async logout() {
        return client.get("/user/logout")
    },
    // ---------------- Plugins ----------------
    async getAllPlugins() {
        return client.get("/plugin")
    },
    async getPlugin({ id }) {
        return client.get("/plugin/find", { id })
    },
    async createPlugin({ name, description, version, downloads, versionTested, versionNative, supportedLanguages, nativeLanguage, githubLink, softDependencies, premium }) {
        return client.post("/plugin/create", { name, description, version, downloads, versionTested, versionNative, supportedLanguages, nativeLanguage, githubLink, softDependencies, premium })
    },
    // ---------------- Reviews ----------------
    async getAllReviews() {
        return client.get("/review")
    },
    async getReview({ id }) {
        return client.get("/review/find", { id })
    },
    async createReview({ user, userId, product, productId, rating, description, version }) {
        return client.post("/review/create", { user, userId, product, productId, rating, description, version })
    },


    async getAdminPermissions({ admin_id }) {
        return client.get(encodeURI("/admin/getPermissions?admin_id=" + admin_id))
    },

};