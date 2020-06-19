<template>
  <div id="graphframe">
    <div id="graphnav">
      <button @click="panzoom.zoomOut()">-</button>
      <button @click="panzoom.zoomIn()">+</button>
      <button @click="panzoom.reset()">reset</button>
      {{ zoomScale }}
      <DevInterface />
    </div>
    <MouseDialog mouseeventid="graphframe" />
    <div id="graphwindow">
      <div id="graphcontents" @click="onClick">
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

import MouseDialog from "@/components/MouseDialog.vue";
import DevInterface from "@/components/DevInterface.vue";

import DraggableWaypoint from "@/components/DraggableWaypoint.vue";
import Trail from "@/components/Trail.vue";
import GraphBackground from "@/components/GraphBackground.vue";

export default {
  name: "SkillTreeGraph",
  data() {
    return {
      panzoom: null,
      zoomScale: 1
    };
  },
  components: {
    DraggableWaypoint,
    Trail,
    GraphBackground,
    DevInterface,
    MouseDialog
  },
  props: {},
  mounted() {
    this.initPanZoom();
  },
  created() {},
  computed: {
    currentlyViewingWaypoint() {
      return this.$store.state.currentlyViewingWaypoint;
    },
    waypoints() {
      return this.$store.state.waypoints;
    },
    trails() {
      return this.$store.state.trails;
    }
  },
  methods: {
    onClick(e) {
      console.log(e.target ,e.currentTarget) 

      if (e.target === e.currentTarget) {
        // this presumes that graphbackground isn't clickable. if we want it to be then we can handle that later.
        this.unclickWaypoints();
      }
    },
    unclickWaypoints() {
      if (this.currentlyViewingWaypoint) {
        this.$router.push("Graph").catch(err => {});
        this.$store.commit("currentlyViewingWaypoint", { id: null });
      }
    },
    initPanZoom() {
      var self = this;

      const elemw = document.getElementById("graphwindow");
      const elem = document.getElementById("graphcontents");

      self.panzoom = Panzoom(elem, {
        maxScale: 2,
        minScale: 0.1,
        startX: -400,
        startY: -400,
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
        self.zoomScale = self.panzoom.getScale();
      });
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

#graphcontents {
  width: 2000px;
  height: 2000px;
}

svg#trails {
  height: 2000px;
  width: 2000px;
  pointer-events: none
}

svg#trails

.WPWP {
  background-color: red;
}
</style>
