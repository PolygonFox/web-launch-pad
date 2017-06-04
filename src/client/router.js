import VueRouter from 'vue-router';
import { routes } from '../routes';

// Routes
const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
