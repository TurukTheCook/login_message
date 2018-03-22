// ESSENTIALS
import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'
import VueAxios from 'vue-axios'

// COMPONENTS
import Auth from '@/components/auth/Auth'
import Login from '@/components/auth/Login'
import Register from '@/components/auth/Register'
import Home from '@/components/home/Home'
import Send from '@/components/send/Send'
import MessageDetails from '@/components/messages/MessageDetails'

// BOOTSTRAP AND STYLES
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import '@/assets/css/styles.scss'

// DEFINING
Vue.use(BootstrapVue);
Vue.use(Router)
Vue.use(VueAxios, axios)

// Intercepteur de requetes HTTP, pour chaque requete http on defini un header
// qui se nomme 'Authorization' et qui contient le token (depuis le localstorage)
// Le token est donc envoyé pour chacune des requete vers le back-end.
// Vue.http.interceptors.push(function(request) {
//   request.headers.set('Authorization', localStorage.getItem('token'));
// });
axios.defaults.baseURL = 'http://localhost:1407';
axios.interceptors.request.use(function (config) {
  config.headers.Authorization = localStorage.getItem('token');
  return config;
}, function (error) {
  return Promise.reject(error);
});

// ROUTES
const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Auth',
      component: Auth,
      children: [
        {
          path: '',
          name: 'Login',
          component: Login
        },
        {
          path: '/register',
          name: 'Register',
          component: Register
        }
      ]
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/send/:sendingTo',
      name: 'Send',
      component: Send
    },
    {
      path: '/message/:msgId',
      name: 'MessageDetails',
      component: MessageDetails
    },
    {
      path: '*',
      redirect: { name: 'Login' }
    }
  ]
})

// GLOBAL GUARD
// On effectue des actions avant de d'afficher une route
// Ici on verifie que l'utilisateur dispose d'un token valide
router.beforeEach((to, from, next) => {
  if (to.name == 'Login' || to.name == 'Register') next()
  else {
    if (localStorage.getItem('token')) {
      next()
    } else {
      next({ name: 'Login' })
    }
  }
})


// EXPORT
export default router