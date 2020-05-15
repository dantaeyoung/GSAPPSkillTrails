/* eslint-disable */

import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import ViewLeaf from '../views/ViewLeaf.vue'
import SkillTreeGraph from '@/components/SkillTreeGraph.vue'
import ForceGraph from '@/components/ForceGraph.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    redirect: '/graph',
  },
  {
    path: '/graph',
    name: 'Graph',
  },
  {
    path: '/forcegraph',
    name: 'ForceGraph',
    components: {
      content: ForceGraph,
    }
  },
  {
    path: '/about',
    name: 'About',
    components: {
      content: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
  },
  {
    path: '/ViewLeaf/:id',
    name: 'ViewLeaf',
    components: {
      content: ViewLeaf,
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
