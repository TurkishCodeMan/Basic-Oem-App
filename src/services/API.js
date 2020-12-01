import Vue from "vue"
import axios from "axios"


axios.defaults.withCredentials=true;

export default () => {
    const axiosInstance=axios.create({
        baseURL: `/api`
    });
    Vue.use(axiosInstance);
    return axiosInstance;
}