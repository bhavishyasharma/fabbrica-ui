import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import EmptyRouter from '../views/EmptyRouter.vue';
import MouldList from '../views/mould/MouldList.vue';
import AddMould from '../views/mould/AddMould.vue';
import PartList from '../views/part/PartList.vue';
import AddPart from '../views/part/AddPart.vue';
import Login from '../views/Login.vue';
import store from '../store';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true,
      navIndex: '1'
    },
    children: [
      {
        path: 'mould',
        name: 'Mould',
        component: EmptyRouter,
        children: [
          {
            path: '',
            name: 'MouldList',
            component: MouldList,
            meta: {
              navIndex: '2'
            }
          },
          {
            path: 'add',
            name: 'AddMould',
            component: AddMould,
            meta: {
              navIndex: '2'
            }
          }
        ]
      },
      {
        path: 'part',
        name: 'Part',
        component: EmptyRouter,
        children: [
          {
            path: '',
            name: 'PartList',
            component: PartList,
            meta: {
              navIndex: '3'
            }
          },
          {
            path: 'add',
            name: 'AddPart',
            component: AddPart,
            meta: {
              navIndex: '3'
            }
          }
        ]
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next();
      return;
    }
    next('/login');
  } else {
    next();
  }
});

export default router;
