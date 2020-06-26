<template>
  <div id="graphframe" :class="cursorMode">
    <div id="graphnav">
      <DevInterface />
      <CursorToolbar />
    </div>
    <MouseDialog mouseeventid="graphframe" />
    <div
      id="graphwindow"
      :class="{
        shiftPressed: shiftPressed,
        altPressed: altPressed,
        isDragging: isDragging
      }"
      @click="onClick"
      @mousedown="onMouseDown"
      @mouseup="onMouseUp"
    >
      <div id="graphcontents">
        <DraggableWaypoint
          v-for="(waypoint, id) in waypoints"
          :key="id"
          :waypointdata="waypoint"
          :id="'waypoint-' + id"
          :zoomscale="zoomscale"
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
            :zoomscale="zoomscale"
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

import panzoom from "panzoom";

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
      isDragging: false,
      zoomscale: 1
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
    onMouseDown(e) {
      var self = this;
      setTimeout(() => {
        self.isDragging = true;
      }, 100);
    },
    onMouseUp(e) {
      var self = this;
      setTimeout(() => {
        self.isDragging = false;
      }, 100);
    },
    onClick(e) {
      if (this.cursorMode.navigate) {
        if (e.target.id === "graphcontents") {
          // this is hacky but works
          // this presumes that graphbackground isn't clickable. if we want it to be then we can handle that later.
          this.unclickWaypoints();
        }
      }
      if (this.cursorMode.zoom) {
        if (!this.isDragging) {
          let transforms = this.panzoom.getTransform();

          var scalediff = 2;

          if (this.shiftPressed || this.altPressed) {
            scalediff = 1 / scalediff;
          }
          this.panzoom.smoothZoomAbs(
            e.clientX,
            e.clientY,
            transforms.scale * scalediff
          );
        }
      }
    },
    unclickWaypoints() {
      this.$router
        .push({
          name: "MapViewBoth"
        })
        .catch(err => {
          console.log(err);
        });
    },
    initKeyHandler() {
      var self = this;

      var keyHandler = function(event) {
        try {
          self.shiftPressed = event.shiftKey;
          self.altPressed = event.altKey;
        } catch {}
      };

      window.addEventListener("keydown", keyHandler, false);
      window.addEventListener("keyup", keyHandler, false);
    },
    initPanZoom() {
      var self = this;

      const elemw = document.getElementById("graphwindow");
      const elem = document.getElementById("graphcontents");

      self.panzoom = panzoom(elem, {
        maxZoom: 2,
        minZoom: 0.4,
        bounds: true,
        boundsPadding: 0.4,
        zoomDoubleClickSpeed: 1,
        beforeWheel: e => {
          // return false for normal behavior
          if (e.ctrlKey) {
            return false;
          }

          const { x, y } = self.panzoom.getTransform();
          const { deltaX, deltaY } = e;
          self.panzoom.moveTo(x - deltaX, y - deltaY);
          e.preventDefault();
          return true;
        },
        filterKey: () => true
      });

      self.panzoom.on("zoom", function(e) {
        self.zoomscale = self.panzoom.getTransform().scale;
      });
    },
    logAndDetectScroll(e) {
      if (e.ctrlKey) {
        return "trackpadPinch";
      }
      this.recentMouseDeltas.push({ deltaX: e.deltaX, deltaY: e.deltaY });
      if (this.recentMouseDeltas.length > 3) {
        this.recentMouseDeltas.shift();
      }
      var totX = this.recentMouseDeltas.reduce((tot, item) => {
        return tot + Math.abs(item.deltaX);
      }, 0);
      if (totX == 0) {
        // chances are this is a mouse SCroll
        return "maybeMouseScrollWheel";
      }
      return "trackpadPan";
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
  height: calc(100vh - 30px);

  &.markasdone {
    background-color: #3a3dff;
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

#graphframe {
  &.zoom {
    cursor: zoom-in !important;
  }
  &.zoom .shiftPressed,
  &.zoom .altPressed {
    cursor: zoom-out !important;
  }
  & .isDragging {
    cursor: grabbing;
  }

  &.markasdone {
    cursor: cell !important;
  }
}

#graphcontents {
  width: 2000px;
  height: 2000px;
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
