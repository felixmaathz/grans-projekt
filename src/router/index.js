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
    path: '/create/:lang',
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
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
