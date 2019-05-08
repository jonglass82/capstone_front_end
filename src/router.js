import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Route from './views/Route.vue'
import Login from './views/Login.vue'
import Logout from './views/Logout.vue'
import Dashboard from './views/Dashboard.vue'
import NewListing from './views/NewListing.vue'
import ListingConfirmation from './views/ListingConfirmation.vue'
import ShowListing from './views/ShowListing.vue'
import NewRoute from './views/NewRoute.vue'
import CreateRoute from './views/CreateRoute.vue'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/route',
      name: 'route',
      component: Route
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/logout',
      name: 'logout',
      component: Logout
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/new_listing',
      name: 'new_listing',
      component: NewListing
    },
    {
      path: '/listingConfirmation',
      name: 'listingConfirmation',
      component: ListingConfirmation
    },
    {
      path: '/showListing',
      name: 'showListing',
      component: ShowListing
    },
    {
      path: '/newroute',
      name: 'newRoute',
      component: NewRoute
    },
    {
      path: '/createroute',
      name: 'createRoute',
      component: CreateRoute
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})
