import axios from 'axios';

const client = axios.create({
    baseURL: "http://localhost:3001/api",
    responseType: "json",
    withCredentials: true,
});

export default {

    // Main User Api Methods.
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
    async changePassword(oldPassword, newPassword) {
        return client.post(`/user/create`, { oldPassword, newPassword })
    },
    async deleteUser(confirmPassword) {
        return client.delete(`/user/delete`, { confirmPassword })
    },
    async logout() {
        return client.get("/user/logout")
    },
};