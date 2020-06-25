/* eslint-disable */

import Vue from "vue";
import VueRouter from "vue-router";

import ComingSoon from "@/components/ComingSoon.vue";
import About from "@/components/About.vue";
import ViewWaypoint from "@/components/ViewWaypoint.vue";
import SkillTreeGraph from "@/components/SkillTreeGraph.vue";
import ListView from "@/components/ListView.vue";

import store from '@/store'

Vue.use(VueRouter);

var siteName = "GSAPP Skill Trails"

const routes = [
  {
    path: "/",
/*    redirect: "/comingsoon", */
    redirect: "/map",
  },
  {
    path: "/map/:wpid?/:slug?",
    name: "MapView",
    components: {
      view: SkillTreeGraph,
      content: ViewWaypoint
    }
  },
  {
    path: "/list/:wpid?/:slug?",
    name: "ListView",
    components: {
      view: ListView,
      content: ViewWaypoint
    }
  },
  {
    path: "/about",
    name: "About",
    components: {
      view: About
    },
  },
  {
    path: "/comingsoon",
    name: "Coming Soon",
    components: {
      view: ComingSoon 
    },
  },
];

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  let title = "";
  try {
    title += store.state.waypoints[to.params.wpid].fields.Name + " - " ;
  } catch { 
  }
  title += siteName;
  document.title = title;
  next();
});

export default router;
