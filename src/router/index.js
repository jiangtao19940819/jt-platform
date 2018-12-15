import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import MainApi from '@/components/auto_api/api_main'
import Project from '@/components/auto_api/project'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: 'api'
    },{
      path: '/api',
      component: MainApi,
      children: [
        {
          path: 'project',
          component: Project
        }
      ]
    }
  ]
})
