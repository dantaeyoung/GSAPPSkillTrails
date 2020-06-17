<template>
  <div id="graphframe">
    <div id="graphnav">
      <button @click="panzoom.zoomOut()">-</button>
      <button @click="panzoom.zoomIn()">+</button>
      <button @click="panzoom.reset()">reset</button>
    </div>
    <div id="graphwindow">
      <div id="graphcontents">
        <Waypoint
          v-for="(waypoint, id) in waypoints"
          :key="id"
          :waypointdata="waypoint"
        />
        <!--
        <svg id="trails">
          <Trail
            v-for="(childchan, index) in childChannels"
            v-bind:index="index"
            v-bind:key="childchan.id"
            :traildata="childchan"
          />
        </svg> -->

        <GraphBackground />
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */

const Arena = require("are.na");

import Panzoom from "@panzoom/panzoom";

import Waypoint from "@/components/Waypoint.vue";
import Trail from "@/components/Trail.vue";
import GraphBackground from "@/components/GraphBackground.vue";

export default {
  name: "SkillTreeGraph",
  data() {
    return {
      panzoom: null
    };
  },
  components: {
    Waypoint,
    Trail,
    GraphBackground
  },
  props: {},
  mounted() {
    this.initPanZoom();
  },
  created() {},
  computed: {
    waypoints() {
      return this.$store.state.waypoints;
    },
    trails() {
      return this.$store.state.trails;
    }
  },
  methods: {
    initPanZoom() {
      const elem = document.getElementById("graphcontents");
      console.log(elem);
      this.panzoom = Panzoom(elem, {
        maxScale: 2,
        minScale: 0.5
      });
      elem.parentElement.addEventListener("wheel", this.panzoom.zoomWithWheel);
    }
  }
};
</script>

<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

#graphframe {
  height: 100%;
  width: 100%;
}

#graphnav {
  position: absolute;
  z-index: 100;
}

#graphwindow {
  height: 100%;
  width: 100%;
}

svg#trails {
  height: 2000px;
  width: 2000px;
}
</style>
