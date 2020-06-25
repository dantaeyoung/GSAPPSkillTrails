/* eslint-disable */

import Vue from "vue";
import VueRouter from "vue-router";

import ComingSoon from "@/components/ComingSoon.vue";
import About from "@/components/About.vue";
import ViewWaypoint from "@/components/ViewWaypoint.vue";
import SkillTreeGraph from "@/components/SkillTreeGraph.vue";
import ListView from "@/components/ListView.vue";


Vue.use(VueRouter);

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

export default router;
