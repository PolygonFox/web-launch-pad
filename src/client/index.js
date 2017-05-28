// TODO: JWT, Authentication, connect JWT to GraphQL
// TODO: Separate style to its own output

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

import routes from './routes';
import { store as notifications, install as installNotifications } from './notifications';

Vue.use(VueApollo);
Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(Vuex);


// Routes
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
  modules: {
    notifications,
  },
});

Vue.use(installNotifications, store);

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
