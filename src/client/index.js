// TODO: JWT, Authentication, connect JWT to GraphQL
import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import { sync } from 'vuex-router-sync';
import VueApollo from 'vue-apollo';
import { ApolloClient, createNetworkInterface } from 'apollo-client';

// Global style
import './style/bootstrap.scss';

// Layout and pages
import App from './components/layouts/App.vue';

Vue.use(VueApollo);
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
  mode: 'history',
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

// Apollo
const apolloClient = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: 'http://localhost:3000/graphql',
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
