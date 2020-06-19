/* eslint-disable */

import Vue from "vue";
import VueRouter from "vue-router";


import About from "@/components/About.vue";
import Home from "@/components/Home.vue";
import ViewWaypoint from "@/components/ViewWaypoint.vue";
import SkillTreeGraph from "@/components/SkillTreeGraph.vue";
import ForceGraph from "@/components/ForceGraph.vue";
import ListView from "@/components/ListView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/graph"
  },
  {
    path: "/graph",
    name: "Graph"
  },
  {
    path: "/list",
    name: "ListView",
    components: {
      content: ListView
    }
  },
  {
    path: "/forcegraph",
    name: "ForceGraph",
    components: {
      content: ForceGraph
    }
  },
  {
    path: "/about",
    name: "About",
    components: {
      content: About
    }
  },
  {
    path: "/ViewWaypoint/:id",
    name: "ViewWaypoint",
    components: {
      content: ViewWaypoint
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;