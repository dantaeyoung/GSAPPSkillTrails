/* eslint-disable */

import Vue from "vue";
import VueRouter from "vue-router";

import About from "@/components/About.vue";
import ViewWaypoint from "@/components/ViewWaypoint.vue";
import SkillTreeGraph from "@/components/SkillTreeGraph.vue";
import ListView from "@/components/ListView.vue";


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/map"
  },
  {
    path: "/map/:wpid?/:slug?",
    name: "MapView",
    components: {
      map: SkillTreeGraph,
      content: ViewWaypoint
    }
  },
  {
    path: "/list/:wpid?/:slug?",
    name: "ListView",
    components: {
      map: ListView,
      content: ViewWaypoint
    }
  },
  {
    path: "/about",
    name: "About",
    components: {
      content: About
    },
    children: [
      { path: 'list', component: ListView }
    ]
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
