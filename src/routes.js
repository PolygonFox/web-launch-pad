import comps from './client/components';

export const routes = [
  {
    path: '/',
    component: comps.layout,
    children: [
      {
        name: 'home',
        path: '/',
        component: comps.pages.Home,
      },
      {
        name: 'auth.login',
        path: 'login',
        meta: { title: 'Login' },
        component: comps.pages.Login,
      },
      {
        name: 'auth.register',
        path: 'register',
        meta: { title: 'Register' },
        component: comps.pages.Register,
      },
      {
        name: 'errors.404',
        path: ':slug',
        meta: { title: 'Not found' },
        component: comps.pages.Error404,
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
