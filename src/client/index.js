// TODO: JWT, Authentication, connect JWT to GraphQL
// TODO: Separate style to its own output

import Vue from 'vue';
import Vuex from 'vuex';
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
import { sync } from 'vuex-router-sync';
import VueApollo from 'vue-apollo';
import { ApolloClient, createNetworkInterface } from 'apollo-client';

import settings from 'settings';
import { guestRoutes } from '../routes';

// Global style
import './style/bootstrap.scss';

import router from './router';
import { store as notifications, install as installNotifications } from './store/modules/notifications';
import { store as authentication } from './store/modules/authentication';

Vue.use(VueApollo);
Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(Vuex);

// Store
const store = new Vuex.Store({
  modules: {
    notifications,
    authentication,
  },
});

Vue.use(installNotifications, store);


router.beforeEach((to, from, next) => {
  document.title = to.meta.title ? `${to.meta.title} - ${settings.projectName}` : settings.projectName;

  const isAuthenticated = store.state.authentication.authenticated;

  if (isAuthenticated) {
    if (guestRoutes.includes(to.name)) {
      router.push({ name: 'home' });
      return;
    }
  } else if (!guestRoutes.includes(to.name)) {
    router.push({ name: 'auth.login' });
    return;
  }
  next();
});

sync(store, router);

// Apollo
const networkInterface = createNetworkInterface({
  uri: `${settings.api}/graphql`,
  transportBatching: true,
});

networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {}; // Create the header object if needed.
    }

    // get the authentication token from local storage if it exists.

    const token = window.localStorage.getItem('token');
    console.log(token);
    req.options.headers.authorization = token ? `${token}` : null;
    next();
  },
}]);

const apolloClient = new ApolloClient({
  networkInterface,
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
