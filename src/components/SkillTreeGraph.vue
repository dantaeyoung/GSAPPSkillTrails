<template>
  <div id="graphframe" :class="cursorMode">
    <div id="graphnav">
      <DevInterface />
      <CursorToolbar />
    </div>
    <MouseDialog mouseeventid="graphframe" />
    <div id="graphwindow" :class="{ shiftPressed: shiftPressed, altPressed: altPressed }">
      <div id="graphcontents" @click="onClick">
        <DraggableWaypoint
          v-for="(waypoint, id) in waypoints"
          :key="id"
          :waypointdata="waypoint"
          :zoomscale="zoomScale"
          :id="'waypoint-' + id"
          class="panzoom-exclude"
        />

        <svg id="trails" class="panzoom-exclude">
          <defs>
            <marker
              id="svgtrailarrow"
              markerWidth="4"
              markerHeight="4"
              orient="auto"
              refY="2"
            >
              <path d="M0,0 L4,2 0,4" />
            </marker>
          </defs>
          <Trail
            v-for="(trail, id) in trails"
            :key="id"
            :traildata="trail"
            class="panzoom-exclude"
          />
        </svg>

        <GraphBackground class="panzoom-exclude" />
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */

import Panzoom from "@panzoom/panzoom";

import MouseDialog from "@/components/MouseDialog.vue";
import DevInterface from "@/components/DevInterface.vue";
import CursorToolbar from "@/components/CursorToolbar.vue";

import DraggableWaypoint from "@/components/DraggableWaypoint.vue";
import Trail from "@/components/Trail.vue";
import GraphBackground from "@/components/GraphBackground.vue";

export default {
  name: "SkillTreeGraph",
  data() {
    return {
      panzoom: null,
      shiftPressed: false,
      altPressed: false,
    };
  },
  components: {
    DraggableWaypoint,
    Trail,
    GraphBackground,
    CursorToolbar,
    DevInterface,
    MouseDialog
  },
  props: {},
  mounted() {
    this.initPanZoom();
    this.initKeyHandler();
  },
  created() {},
  computed: {
    zoomScale() {
      return this.$store.state.zoomScale;
    },
    cursorMode() {
      return this.$store.state.cursorMode;
    },
    currentlyViewingWaypoint() {
      return this.$store.state.route.params.wpid;
    },
    trailStatusesToShow() {
      return this.$store.state.trailStatusesToShow;
    },
    waypoints() {
      return this.$store.getters.waypoints;
    },
    trails() {
      return this.$store.getters.trails;
    }
  },
  methods: {
    onClick(e) {
      if(this.cursorMode.navigate) { 
        if (e.target === e.currentTarget) {
          // this presumes that graphbackground isn't clickable. if we want it to be then we can handle that later.
          this.unclickWaypoints();
        }
      }
      if(this.cursorMode.zoom) { 
        if (this.shiftPressed || this.altPressed) {
          this.panzoom.zoomOut();
        } else {
          this.panzoom.zoomIn();
        }
      }
    },
    unclickWaypoints() {
      if (this.currentlyViewingWaypoint) {
        this.$router.push("/map").catch(err => {});
      }
    },
    initKeyHandler() {
      var self = this;

      var keyHandler = function(event) {
        try {
          self.shiftPressed = event.shiftKey;
          self.altPressed = event.altKey;
        } catch {
        }
      };
      
      window.addEventListener("keydown", keyHandler, false);
      window.addEventListener("keyup", keyHandler, false);
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

      window.pz = self.panzoom;

      elem.addEventListener("panzoomzoom", function(event) {
        self.$store.commit("setZoomScale", { zoomScale: event.detail.scale });
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
  width: 100%;

  &.markasdone {
    background-color: blue;
  }


}

#graphnav {
  position: absolute;
  z-index: 100;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;

  & > * {
    pointer-events: auto;
  }
}

#graphwindow {
  height: 100%;
  width: 100%;
}

#graphcontents {
  width: 2000px;
  height: 2000px;

  .markasdone & {
    cursor: cell !important;
  }
  .zoom & {
    cursor: zoom-in !important;
  }
  .zoom .shiftPressed &, .zoom .altPressed & {
    cursor: zoom-out !important;
  }
}

svg#trails {
  height: 2000px;
  width: 2000px;
  pointer-events: none;
}

svg#trails .WPWP {
  background-color: red;
}
</style>
