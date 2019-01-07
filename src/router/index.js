import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import MainApi from '@/components/auto_api/api_main'
import Project from '@/components/auto_api/project'
import Api from '@/components/auto_api/api'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/api/project'
    },{
      path: '/api',
      component: MainApi,
      redirect: '/api/project',
      children: [
        {
          path: 'project',
          component: Project
        },{
          path: '2',
          component: Api
        }
      ]
    }
  ]
})
