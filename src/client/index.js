import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import { sync } from 'vuex-router-sync';

// Global style
import './style/bootstrap.scss';

// Layout and pages
import App from './components/layouts/App.vue';

Vue.use(VueRouter);
Vue.use(Vuex);

// Routes
const routes = [
  {
    name: 'home',
    path: '/',
    component: App,
  },
  {
    name: 'test',
    path: '/test',
    component: App,
  },
];

const router = new VueRouter({
  routes,
});

// Store
const store = new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
});

sync(store, router);

new Vue({
  router,
  store,
}).$mount('#app');
