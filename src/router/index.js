import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '../views/Dashboard.vue';
import Transactions from '../views/Transactions.vue';
import AddTransaction from '../views/AddTransaction.vue';


export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Dashboard },
    { path: '/transactions', component: Transactions },
    { path: '/transactions/new', component: AddTransaction },
  ],
});