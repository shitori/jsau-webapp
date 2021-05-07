import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Enquetes from '../views/Enquetes'
import Enquete from '../views/Enquete'
import Resultat from '../views/Resultat'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: '/enquetes',
        name: 'Home',
        component: Home
    },
    {
        path: '/enquetes',
        name: 'Enquetes',
        component: Enquetes
    },
    {
        path: '/enquetes/:id',
        name: 'Enquete',
        component: Enquete
    },
    {
        path: '/enquetes/:id/resultats',
        name: 'Resultat',
        component: Resultat
    },
    {
        path: '*',
        name: 'other',
        redirect: '/enquetes',
    }

]

const router = new VueRouter({
    mode: process.env.IS_ELECTRON ? 'hash' : 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
