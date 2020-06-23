<template>
  <div id="app">
    <section id="header">
      <TopHeader />
    </section>

    <section id="center">
      <section id="graph">
        <SkillTreeGraph />
      </section>
      <section id="content">
        <router-view name="content" />
      </section>
    </section>

  </div>
</template>

<script>
/* eslint-disable */

import TopHeader from "@/components/TopHeader.vue";
import SkillTreeGraph from "@/components/SkillTreeGraph.vue";

export default {
  components: { TopHeader, SkillTreeGraph },
  created() {
    this.$store.dispatch("fetch");
  },
  computed: {
    currentlyViewingWaypoint() {
      return this.$store.state.currentlyViewingWaypoint;
    },
  }
};
</script>

<style lang="scss">
body,
html {
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  display: flex;
  flex-direction: column;
  height: 100vh;
}

section {
  &#center {

    position: relative;

    #graph {
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
