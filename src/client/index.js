// TODO: JWT, Authentication, connect JWT to GraphQL
import Vue from 'vue';
import Vuex from 'vuex';
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
import { sync } from 'vuex-router-sync';
import VueApollo from 'vue-apollo';
import { ApolloClient, createNetworkInterface } from 'apollo-client';

import settings from '../settings';

// Global style
import './style/bootstrap.scss';

// Layout and pages
import App from './components/layouts/App.vue';
import { Error404 } from './components/pages/errors';
import { Login, Register } from './components/pages/auth';
import Home from './components/pages/Home.vue';

Vue.use(VueApollo);
Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(Vuex);

// Routes
const routes = [
  {
    path: '/',
    component: App,
    children: [
      {
        name: 'home',
        path: '/',
        component: Home,
      },
      {
        name: 'auth.login',
        path: 'login',
        meta: { title: 'Login' },
        component: Login,
      },
      {
        name: 'auth.register',
        path: 'register',
        meta: { title: 'Register' },
        component: Register,
      },
      {
        name: 'errors.404',
        path: ':slug',
        meta: { title: 'Not found' },
        component: Error404,
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title ? `${to.meta.title} - ${settings.projectName}` : settings.projectName;
  next();
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

// Apollo
const apolloClient = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: `${settings.api}/graphql`,
    transportBatching: true,
  }),
  connectToDevTools: true,
});

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
});

new Vue({
  router,
  store,
  apolloProvider,
}).$mount('#app');
