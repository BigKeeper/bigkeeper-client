import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: require('@/components/landing/LandingPage').default
    },
    {
      path: '/home',
      name: 'home-page',
      component: require('@/components/home/HomePage').default,
      children: [
        {
          path: 'develop',
          name: 'develop-page',
          component: require('@/components/develop/DevelopPage').default,
          children: [
            {
              path: 'info',
              name: 'develop-info-page',
              component: require('@/components/develop/DevelopInfoPage').default

            }
          ]
        }
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
