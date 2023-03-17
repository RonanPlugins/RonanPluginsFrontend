import axios from 'axios';
import { toast } from 'react-toastify';

const client = axios.create({
    baseURL: "http://localhost:3001",
    responseType: "json",
    withCredentials: true,
});

client.interceptors.response.use(function (response) {
}, function (error) {
    // If the user is not logged in on any request.
    // if (error.request.status) {
    //     toast.error("Request error: " + error.request.status)
    // }
    return Promise.reject(error);
})

export default {

    // ---------------- User ----------------
    async login({ username, password }) {
        return client.post(`/user/login`, { username, password })
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
};