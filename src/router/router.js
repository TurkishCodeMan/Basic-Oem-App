import VueRouter from "vue-router"
import Vue from "vue"
import Home from "../components/Home"
Vue.use(VueRouter);

const routes=[
    {path:"/",component:Home}
]

export const router= new VueRouter({
    routes:routes,
    mode:"hash"
})