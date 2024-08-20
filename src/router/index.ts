import { createRouter, createWebHistory } from 'vue-router'
import homeview from '../views/homeview.vue'
import showsview from '../views/showsview.vue'
import displayshows from '../views/displayshows.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: homeview 
    },
    {
      path: '/shows',
      name: 'shows',
      component: showsview 
    },
    {
      path: '/shows/:id/:name',
      name: 'showItems',
      component: displayshows 
    },
    {
      path: '/shows/:id/:name',
      name: 'showItems',
      component: displayshows 
    },
  ]
})

export default router;
