<template>
  <div id="graphframe">
    <div id="graphnav">
      <button @click="panzoom.zoomOut()">-</button>
      <button @click="panzoom.zoomIn()">+</button>
      <button @click="panzoom.reset()">reset</button>
      <button @click="toggleDraggable()">draggable: {{ isDraggable }}</button>
    </div>
    <div id="graphwindow">
      <div id="graphcontents">
        <Waypoint
          v-for="(waypoint, id) in waypoints"
          :key="id"
          :waypointdata="waypoint"
          :id="'waypoint-' + id"
          class="dragcandidate panzoom-exclude"
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

import PlainDraggable from "plain-draggable";

import Waypoint from "@/components/Waypoint.vue";
import Trail from "@/components/Trail.vue";
import GraphBackground from "@/components/GraphBackground.vue";

export default {
  name: "SkillTreeGraph",
  data() {
    return {
      panzoom: null,
      isDraggable: false,
      draggablelist: null
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
      var self = this;

      const elemw = document.getElementById("graphwindow");
      const elem = document.getElementById("graphcontents");
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

      console.log(elem);
      self.panzoom = Panzoom(elem, {
        maxScale: 2,
        minScale: 0.1,
        startX: -1000,
        startY: -1000,
        startScale: 1
      });
    },
    toggleDraggable() {
      var self = this;

      self.isDraggable = !self.isDraggable;
      if (self.isDraggable) {
        if (self.draggablelist == null) {
          self.draggablelist = Array.from(
            document.getElementsByClassName("dragcandidate")
          ).map(elem => {
            return new PlainDraggable(document.getElementById(elem.id));
          });
        } else {
          self.draggablelist.forEach(function(dl) {
            dl.setOptions({ disabled: false });
          });
        }
      } else {
        self.draggablelist.forEach(function(dl) {
          dl.setOptions({ disabled: true });
        });
      }
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
}

.WPWP {
  background-color: red;
}
</style>
