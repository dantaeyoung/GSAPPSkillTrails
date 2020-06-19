<template>
  <div id="graphframe">
    <div id="graphnav">
      <button @click="panzoom.zoomOut()">-</button>
      <button @click="panzoom.zoomIn()">+</button>
      <button @click="panzoom.reset()">reset</button>
      {{ zoomScale }}
      <DevInterface />
    </div>
    <div id="graphwindow">
      <div id="graphcontents">
        <DraggableWaypoint
          v-for="(waypoint, id) in waypoints"
          :key="id"
          :waypointdata="waypoint"
          :zoomscale="zoomScale"
          :id="'waypoint-' + id"
          class="panzoom-exclude"
        />
        <svg id="trails">
          <Trail
            v-for="(trail, id) in trails"
            :key="id"
            :traildata="trail"
            class="panzoom-exclude"
          />
        </svg>

        <GraphBackground />
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */

const Arena = require("are.na");

import Panzoom from "@panzoom/panzoom";

import DraggableWaypoint from "@/components/DraggableWaypoint.vue";
import Waypoint from "@/components/Waypoint.vue";
import Trail from "@/components/Trail.vue";
import GraphBackground from "@/components/GraphBackground.vue";
import DevInterface from "@/components/DevInterface.vue";

export default {
  name: "SkillTreeGraph",
  data() {
    return {
      panzoom: null,
      zoomScale: 1,
    };
  },
  components: {
    DraggableWaypoint,
    Waypoint,
    Trail,
    GraphBackground,
    DevInterface,
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
      var self = this;

      const elemw = document.getElementById("graphwindow");
      const elem = document.getElementById("graphcontents");

      self.panzoom = Panzoom(elem, {
        maxScale: 2,
        minScale: 0.1,
        startX: -1000,
        startY: -1000,
        startScale: 1
      });

      elem.parentElement.addEventListener("wheel", function(e) {
        e.preventDefault();
        if (e.ctrlKey) {
          self.panzoom.zoomWithWheel(e, { step: 0.15 });
        } else {
          self.panzoom.pan(
            -e.deltaX / self.panzoom.getScale(),
            -e.deltaY / self.panzoom.getScale(),
            { relative: true }
          );
        }
      });

      elem.addEventListener("panzoomzoom", function(event) {
        self.zoomScale = self.panzoom.getScale()
      });

      console.log(elem);
    },
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

#graphcontents {
  width: 2000px;
  height: 2000px;
}

svg#trails {
  height: 2000px;
  width: 2000px;
}

.WPWP {
  background-color: red;
}
</style>
