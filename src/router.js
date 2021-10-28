import { createRouter, createWebHistory } from "vue-router";
import App from './App.vue';

import LogIn from './components/LogIn.vue'
import SignUp from './components/SignUp.vue'
import Home from './components/Home.vue'
import SearchTour from './components/SearchTour.vue'
import ProfileGuide from './components/ProfileGuide.vue'
import AddTour from './components/AddTour.vue'
import Reservation from './components/ReservationTour.vue'


const routes = [{
        path: '/',
        name: 'root',
        component: App
    },
    {
        path: '/user/logIn',
        name: "logIn",
        component: LogIn
    },
    {
        path: '/user/signUp',
        name: "signUp",
        component: SignUp
    },
    {
        path: '/user/home',
        name: "home",
        component: Home
    },
    {
        path: '/user/searchTour',
        name: "search",
        component: SearchTour
    },
    {
        path: '/user/profileGuide',
        name: "profileG",
        component: ProfileGuide
    },
    {
        path: '/user/addTour',
        name: "addTour",
        component: AddTour
    },
    {
        path: '/user/Tour',
        name: "reservationTour",
        component: Reservation
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;