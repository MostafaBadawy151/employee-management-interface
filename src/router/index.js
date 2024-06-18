import { createRouter, createWebHistory } from 'vue-router';
import store from '../store';

import HomePage from '../views/HomePage.vue';
import LoginForm from '../views/LoginForm.vue';
import RegisterForm from '../views/RegisterForm.vue';
import EmployeeList from '../views/EmployeeList.vue';
import EmployeeForm from '../views/EmployeeForm.vue';



const routes = [
  { path: '/', name: 'HomePage', component: HomePage },
  { path: '/login', name: 'LoginFrom', component: LoginForm },
  { path: '/register', name: 'RegisterForm', component: RegisterForm },
  { path: '/employees', name: 'EmployeeList', component: EmployeeList , meta: { requiresAuth: true } },
  { path: '/employees/new', name: 'EmployeeForm', component: EmployeeForm , meta: { requiresAuth: true }},
  { path: '/employees/edit/:id', name: 'EditEmployee', component: EmployeeForm, props: true , meta: { requiresAuth: true, requiresAdmin: true } },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const isLoggedIn = !!store.state.token; 
  const isAdmin = store.state.user && store.state.user.role === 'admin';
 

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isLoggedIn) {
      return next('/login');
    }
    if (to.matched.some(record => record.meta.requiresAdmin) && !isAdmin) {
      return next('/employees');
    }
  }
  next();
});

export default router;