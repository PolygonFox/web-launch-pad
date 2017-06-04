import App from './components/layouts/App.vue';
import { Error404 } from './components/pages/errors';
import { Login, Register } from './components/pages/auth';
import Home from './components/pages/Home.vue';

export const routes = [
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

export const guestRoutes = [
  'auth.login',
  'auth.register',
  'errors.404',
];

export default { routes, guestRoutes };
