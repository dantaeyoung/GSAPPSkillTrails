<template>
  <div id="graphframe" :class="cursorMode">
    <div id="graphnav">
      <CursorToolbar />
      <DevInterface />
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
  created() {
    },
  computed: {
    cursorMode() {
      return this.$store.state.cursorMode;
    },
    currentlyViewingWaypoint() {
      if (this.$store.state.route.params.wportrail === "waypoint") {
        return this.$store.state.route.params.id;
      }
    },
    currentlyViewingTrail() {
      if (this.$store.state.route.params.wportrail === "trail") {
        return this.$store.state.route.params.id;
      }
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
  watch: {
    currentlyViewingWaypoint: function(wpid) {
      this.zoomToWaypoint(wpid);
    },
    currentlyViewingTrail: function(trid) {
      this.zoomToTrail(trid);
    }
  },
  methods: {
    zoomToTrail(trid) {
      var self = this;
      if (trid == null || !(self.trails)) return;
      let allwpxy = self.trails[trid].fields.Waypoints.map(wpid => {
        return self.waypointToPanzoomXY(wpid);
      });
      let totwpxy = allwpxy.reduce(
        (tot, item) => {
          return { x: tot.x + item.x, y: tot.y + item.y };
        },
        { x: 0, y: 0 }
      );
      this.panzoom.moveBy( totwpxy.x / allwpxy.length, totwpxy.y / allwpxy.length, 1)
    },
    zoomToWaypoint(wpid) {
      if (wpid == null || !(wpid in this.waypoints)) return;
      let desiredxy = this.waypointToPanzoomXY(wpid);
      this.panzoom.moveBy(desiredxy.x, desiredxy.y, 1);
    },
    waypointToPanzoomXY(wpid) {
      if (wpid == null) return;
      let x = this.waypoints[wpid].fields.coordinateX;
      let y = this.waypoints[wpid].fields.coordinateY;
      return this.coordinateForCenterPanzoomXY(x, y)
    },
    coordinateForCenterPanzoomXY(x, y) {
      let transforms = this.panzoom.getTransform();
      const gfelem = document.getElementById("graphframe");
      var sfelemWidth = 0;
      try {
        sfelemWidth = document.getElementById("sidebarFrame").clientWidth;
      } catch {
      }
      let desiredX =
        -x * transforms.scale + (gfelem.clientWidth - sfelemWidth) / 2;
      let desiredY = -y * transforms.scale + gfelem.clientHeight / 2;
      return { x: desiredX - transforms.x, y: desiredY - transforms.y };
    },
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
        if (this.isDragging) { return }
      if (this.cursorMode.navigate) {
        if (e.target.id === "graphcontents") {
          // this is hacky but works
          // this presumes that graphbackground isn't clickable. if we want it to be then we can handle that later.
          this.unclickWaypoints();
        }
      }
      if (this.cursorMode.zoomin || this.cursorMode.zoomout) {
          let transforms = this.panzoom.getTransform();

          var scalediff = 2;

          if(this.cursorMode.zoomout) { scalediff = 1 / scalediff;  }

          if (this.shiftPressed || this.altPressed) {
            scalediff = 1 / scalediff;
          }
          this.panzoom.smoothZoomAbs(
            e.clientX,
            e.clientY,
            transforms.scale * scalediff
          );
      }
    },
    unclickWaypoints() {
      this.$router
        .push({
          name: "MapViewBoth"
        })
        .catch(err => {
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

      if(this.currentlyViewingWaypoint) {
        this.zoomToWaypoint(this.currentlyViewingWaypoint);
      } else {
        let xycoords = self.coordinateForCenterPanzoomXY(1000, 1000)
        self.panzoom.moveBy(xycoords.x, xycoords.y, 0);
      }


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
  &.zoomin {
    cursor: zoom-in !important;
  }
  &.zoomin .shiftPressed,
  &.zoomin .altPressed {
    cursor: zoom-out !important;
  }
  &.zoomout {
    cursor: zoom-out !important;
  }
  &.zoomout .shiftPressed,
  &.zoomout .altPressed {
    cursor: zoom-in !important;
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
