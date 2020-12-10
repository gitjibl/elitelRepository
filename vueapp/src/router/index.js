import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Fztx from '@/components/fztx/Fztx'
import FatherPage from '@/components/fztx/FatherPage'
import ChildPage from '@/components/fztx/ChildPage'
import Api from '@/components/api/api'
import Extend from '@/components/api/extend'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      children: [
        //嵌套路由
        {
          path: 'fztx',
          name: 'fztx',
          component: Fztx,
          children: [{
              path: 'fatherPage', //以“/”开头的嵌套路径会被当作根路径，所以子路由上不用加“/”;在生成路由时，主路由上的path会被自动添加到子路由之前，所以子路由上的path不用在重新声明主路由上的path了。
              name: 'fatherPage',
              component: FatherPage
            },
            {
              path: 'childPage',
              name: 'childPage',
              component: ChildPage
            }
          ]
        },
        {
          path: 'api',
          name: 'api',
          component: Api,
          children: [{
              path: 'expend',
              name: 'expend',
              component: Extend
            },
            // {
            //   path: 'childPage',
            //   name: 'childPage',
            //   component: ChildPage
            // }
          ]
        },
      ]
    },

  ]
})
