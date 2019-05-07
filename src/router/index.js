import Vue from 'vue'
import Router from 'vue-router'
import Civixa from '@/components/Civixa'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Civixa',
      component: Civixa
    }
  ]
})
