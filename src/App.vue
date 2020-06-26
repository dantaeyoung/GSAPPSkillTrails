<template>
  <div id="app" :class="{ mobile: isTouchDevice }">

    <HowTo />

    <section id="header">
      <TopHeader />
    </section>

    <section id="center">
      <section id="view">
        <router-view name="view" />
      </section>
      <section id="content">
        <transition>
          <router-view name="content" />
        </transition>
      </section>
    </section>
  </div>
</template>

<script>
/* eslint-disable */

import HowTo from "@/components/HowTo.vue";
import TopHeader from "@/components/TopHeader.vue";
import SkillTreeGraph from "@/components/SkillTreeGraph.vue";

import { is_touch_device } from "@/scripts/detectDevice.js"

export default {
  components: { TopHeader, SkillTreeGraph, HowTo },
  created() {
    this.$store.dispatch("fetch");
    this.$store.commit("setTouchDevice", this.isTouchDevice);
  },
  computed: {
    isTouchDevice() {
      return is_touch_device();
    },
    currentlyViewingWaypoint() {
      return this.$store.state.currentlyViewingWaypoint;
    }
  }
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap');


body,
html {
  margin: 0;
  padding: 0;
}


#app {
  font-family: 'Lato', Arial, sans-serif;
  line-height: 1.5em;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  display: flex;
  flex-direction: column;
  height: 100vh;
}

#header {
  position: fixed;
  width: 100%;
  z-index: 1000;
  top: 0px;
  left: 0px;

  height: 30px;
}
#center {

  position: relative;
  margin-top: 30px;
  overflow-y: scroll;
  /* height: calc(100vh - 30px); */

  #view {
    background-color: #ddd;
    flex-grow: 1;
    overflow: hidden;
  }

  #content {
    position: absolute;
    right: 0px;
    top: 20px;
  }
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
