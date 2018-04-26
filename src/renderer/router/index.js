import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: require('@/components/LandingPage').default
    },
    {
      path: '/home',
      name: 'home-page',
      component: require('@/components/HomePage').default,
      children: [
        {
          path: 'add_feature_hotfix',
          name: 'add-feature-hotfix-page',
          component: require('@/components/HomePage/FeatureHotfix/AddFeatureHotfixPage').default
        },
        {
          path: 'feature_hotfix',
          name: 'feature-hotfix-page',
          component: require('@/components/HomePage/FeatureHotfix/FeatureHotfixPage').default
        }
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
