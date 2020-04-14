import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import EmptyRouter from '../views/EmptyRouter.vue';
import MachineList from '../views/machine/MachineList.vue';
import AddMachine from '../views/machine/AddMachine.vue';
import MouldList from '../views/mould/MouldList.vue';
import AddMould from '../views/mould/AddMould.vue';
import EditMould from '../views/mould/EditMould.vue';
import PartList from '../views/part/PartList.vue';
import AddPart from '../views/part/AddPart.vue';
import EditPart from '../views/part/EditPart.vue';
import CompanyList from '../views/company/CompanyList.vue';
import AddCompany from '../views/company/AddCompany.vue';
import EditCompany from '../views/company/EditCompany.vue';
import UserList from '../views/user/UserList.vue';
import AddUser from '../views/user/AddUser.vue';
import EditUser from '../views/user/EditUser.vue';
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
        path: 'machine',
        component: EmptyRouter,
        children: [
          {
            path: '',
            name: 'MachineList',
            component: MachineList,
            meta: {
              navIndex: '2'
            }
          },
          {
            path: 'add',
            name: 'AddMachine',
            component: AddMachine,
            meta: {
              navIndex: '2'
            }
          }
        ]
      },
      {
        path: 'mould',
        component: EmptyRouter,
        children: [
          {
            path: '',
            name: 'MouldList',
            component: MouldList,
            meta: {
              navIndex: '3'
            }
          },
          {
            path: 'add',
            name: 'AddMould',
            component: AddMould,
            meta: {
              navIndex: '3'
            }
          },
          {
            path: 'edit/:mouldId',
            name: 'EditMould',
            component: EditMould,
            meta: {
              navIndex: '3'
            }
          }
        ]
      },
      {
        path: 'part',
        component: EmptyRouter,
        children: [
          {
            path: '',
            name: 'PartList',
            component: PartList,
            meta: {
              navIndex: '4'
            }
          },
          {
            path: 'add',
            name: 'AddPart',
            component: AddPart,
            meta: {
              navIndex: '4'
            }
          },
          {
            path: 'edit/:partId',
            name: 'EditPart',
            component: EditPart,
            meta: {
              navIndex: '4'
            }
          }
        ]
      },
      {
        path: 'company',
        component: EmptyRouter,
        children: [
          {
            path: '',
            name: 'CompanyList',
            component: CompanyList,
            meta: {
              navIndex: '5'
            }
          },
          {
            path: 'add',
            name: 'AddCompany',
            component: AddCompany,
            meta: {
              navIndex: '5'
            }
          },
          {
            path: 'edit/:companyId',
            name: 'EditCompany',
            component: EditCompany,
            meta: {
              navIndex: '5'
            }
          }
        ]
      },
      {
        path: 'user',
        component: EmptyRouter,
        children: [
          {
            path: '',
            name: 'UserList',
            component: UserList,
            meta: {
              navIndex: '6'
            }
          },
          {
            path: 'add',
            name: 'AddUser',
            component: AddUser,
            meta: {
              navIndex: '6'
            }
          },
          {
            path: 'edit/:userId',
            name: 'EditUser',
            component: EditUser,
            meta: {
              navIndex: '6'
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
