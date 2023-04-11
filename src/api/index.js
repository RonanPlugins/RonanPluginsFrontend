import axios from 'axios';
const client = axios.create({
    // https://api.ronanplugins.com
    // http://localhost:3001
    baseURL: "http://localhost:3001",
    responseType: "json",
    withCredentials: true,
});

export default {

    // ---------------- User ----------------
    async login({ username, password }) {
        const params = new URLSearchParams({ username, password })

        return client.post(`/user/login`, params.toString())
    },
    async signup({ name, username, email, password }) {
        return client.post(`/user/create`, { name, username, email, password })
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
        return client.get(encodeURI("/permissions/getPermissions"))
    },

    async getPages() {
        return client.get("/page")
    },
    async getPage({ identifier }) {
        return client.get("/page/" + identifier)
    },
    async createPage({ route, name, markdown }) {
        return client.post("/page/create", { route, name, markdown })
    },
    async editPage({ name, markdown }) {
        return client.put("/page/" + name + "/edit", { markdown })
    },
};