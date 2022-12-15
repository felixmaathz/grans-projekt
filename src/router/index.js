import { createRouter, createWebHashHistory } from 'vue-router'
import StartView from '../views/StartView.vue'

const routes = [
  {
    path: '/',
    name: 'Start',
    component: StartView
  },
  {
    path: '/hostorjoin/:lang',
    name: 'HostOrJoinView',
    component: () => import(/* webpackChunkName: "about" */ '../views/HostOrJoinView.vue')
  },
  {
    path: '/choosegamemode/:lang',
    name: 'ChooseGameModeView',
    component: () => import(/* webpackChunkName: "about" */ '../views/ChooseGameModeView.vue')
  },
    {
    path: '/poll/:id/:nick/:lang',
    name: 'PollView',
    component: () => import(/* webpackChunkName: "about" */ '../views/PollView.vue')
  },
  {
    path: '/selectsavedgame/:lang',
    name: 'SelectSavedGame',
    component: () => import(/* webpackChunkName: "about" */ '../views/SelectSavedGame.vue')
  },
  {
    path: '/create/:lang/',
    name: 'CreateView',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/CreateView.vue')
  },
  {
    path: '/result/:id/:lang',
    name: 'ResultView',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/ResultView.vue')
  },
  {
    path: '/hostresult/:id/:lang',
    name: 'HostResultView',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/HostResultView.vue')
  },
  {
    path: '/clientjoingame/:lang',
    name: "ClientJoinGameView",
    component: () => import(/* webpackChunkName: "about" */ '../views/ClientJoinGameView.vue')
  },
  {
    path: '/hostpregame/:lang/:id',
    name: "HostPreGameView",
    component: () => import(/* webpackChunkName: "about" */ '../views/HostPreGameView.vue')
  },
  {
    path: '/lobby/:lang/:id/:nick',
    name: "LobbyView",
    component: () => import(/* webpackChunkName: "about" */ '../views/LobbyView.vue')
  },
  {
    path: '/join/:lang',
    name: "JoinView",
    component: () => import(/* webpackChunkName: "about" */ '../views/JoinView.vue')
  },
  {
    path: '/editquiz/:lang/:id',
    name: "editQuizView",
    component: () => import(/* webpackChunkName: "about" */ '../views/EditQuizView.vue')
  },
  {

    path: '/hostcollablobby/:lang/:id/:nick',
    name: "hostCollabLobbyView",
    component: () => import(/* webpackChunkName: "about" */ '../views/HostCollabLobbyView.vue')
  },
  {

    path: '/collablobby/:lang/:id/:nick',
    name: "collabLobbyView",
    component: () => import(/* webpackChunkName: "about" */ '../views/CollabLobbyView.vue')
  },
  {
    //Add ID
    path: '/choosegameid/:lang/',
    name: "chooseGameIdView",
    component: () => import(/* webpackChunkName: "about" */ '../views/ChooseGameIdView.vue')
  }

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
