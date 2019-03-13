import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import MainApi from '@/components/auto_api/api_main'
import Project from '@/components/auto_api/project'
import API from '@/components/auto_api/api'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/autoapi/project'
    },{
      path: '/autoapi',
      component: MainApi,
      redirect: '/autoapi/project',
      children: [
        {
          path: 'project',
          component: Project
        },{
          path: 'api',
          component: API
        }
      ]
    }
  ]
})
