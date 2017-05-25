import Vue from 'vue';
import VueRouter from 'vue-router';


// Global style
import './style/bootstrap.scss';

// Layout and pages
import App from './components/layouts/App.vue';

Vue.use(VueRouter);

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

new Vue({
  router,
}).$mount('#app');
