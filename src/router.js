import gql from "graphql-tag";
import { createRouter, createWebHistory } from "vue-router";
import {ApolloClient,createHttpLink, InMemoryCache} from '@apollo/client/core'

import LogIn from './components/LogIn.vue'
import SignUp from './components/SignUp.vue'
import Home from './components/Home.vue'
import SearchTour from './components/SearchTour.vue'
import ProfileGuide from './components/ProfileGuide.vue'
import AddTour from './components/AddTour.vue'
import Reservation from './components/ReservationTour.vue'
import LoadReservation from './components/Reservations.vue'
import LoadReservationT from './components/TouristReservations.vue'


const routes = [
    {
        path: '/user/logIn',
        name: "logIn",
        component: LogIn,
        meta:{requiresAuth:false}
    },
    {
        path: '/user/signUp',
        name: "signUp",
        component: SignUp,
        meta:{requiresAuth:false}
    },
    {
        path: '/user/home',
        name: "home",
        component: Home,
        meta:{requiresAuth:true}
    },
    {
        path: '/user/searchTour',
        name: "search",
        component: SearchTour,
        meta:{requiresAuth:true}
    },
    {
        path: '/user/profileGuide',
        name: "profileG",
        component: ProfileGuide,
        meta:{requiresAuth:true}
    },
    {
        path: '/user/addTour',
        name: "addTour",
        component: AddTour,
        meta:{requiresAuth:true}
    },
    {
        path: '/user/Tour',
        name: "reservationTour",
        component: Reservation,
        meta:{requiresAuth:true}
    },
    {
        path: '/user/Reservations',
        name: "loadReservations",
        component: LoadReservation,
        meta:{requiresAuth:true}
    },  
    {
        path: '/user/ReservationsT',
        name: "loadReservationsT",
        component: LoadReservationT,
        meta:{requiresAuth:true}
    }    
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});
const apolloClient = new ApolloClient({
    link:createHttpLink({uri:'https://api-gateway-myguide.herokuapp.com/'}),
    cache:new InMemoryCache()
})
async function isAuth(){
    if(localStorage.getItem("token_access")===null ||
    localStorage.getItem("token_refresh")===null){
        return false;
    }
    try{
        var result=await apolloClient.mutate({
            mutation:gql`
                mutation($refresh: String!){
                    refreshToken(refresh: $refresh){
                        access
                    }
                }
            `,
            variables:{
                refresh:localStorage.getItem("token_refresh"),
            }
        })
        localStorage.setItem("token_access",result.data.refreshToken.access);
        return true;
    }catch{
        localStorage.clear();
        alert("Su sesion expiro por favor volver a iniciar sesion")
        return false
    }
}
router.beforeEach(async(to,from)=>{
    var is_auth=await isAuth();
    if(is_auth==to.meta.requiresAuth) return true
    if(is_auth) return {name:"home"};
    return {name:"logIn"};
})
export default router;