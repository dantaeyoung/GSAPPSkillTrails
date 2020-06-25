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
    >
      <div
        id="graphcontents"
        @click="onClick"
        @mousedown="onMouseDown"
        @mouseup="onMouseUp"
      >
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
      isDragging: false
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
    onMouseDown(e) {
      this.isDragging = true;
    },
    onMouseUp(e) {
      this.isDragging = false;
    },
    onClick(e) {
      if (this.cursorMode.navigate) {
        if (e.target === e.currentTarget) {
          // this presumes that graphbackground isn't clickable. if we want it to be then we can handle that later.
          this.unclickWaypoints();
        }
      }
      if (this.cursorMode.zoom) {
        let transforms = this.panzoom.getTransform();
        console.log(e)
        console.log(transforms);
        let origin = this.panzoom.getTransformOrigin(); // {x: 0.5, y: 0.5}
        console.log(origin);
//        this.panzoom.setTransformOrigin({ x: e.layerX, y: e.layerY }); // now it is topLeft
        //      instance.setTransformOrigin(null); // remove transform origink
        var scalediff = 1.1;
        if (this.shiftPressed || this.altPressed) {
          scalediff = 1/ scalediff;
        }
        this.panzoom.smoothZoomAbs(
          transforms.x,
          transforms.y,
          transforms.scale * scalediff
        ); 
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
        minZoom: 0.1,
        bounds: true,
        boundsPadding: 0.2,
          zoomDoubleClickSpeed: 1, 
        beforeWheel: e => {
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
      /*
      self.panzoom = panzoom(elem, {
        maxZoom: 2,
        minZoom: 0.1,
        beforeWheel: function(e) {
          // allow wheel-zoom only if altKey is down. Otherwise - ignore
          var shouldIgnore = !e.altKey;
          return shouldIgnore;
        }
      });
      self.panzoom.zoomAbs(
        300, // initial x position
        500, // initial y position
        1 // initial zoom
      );
*/
      /*
      elem.parentElement.addEventListener("wheel", function(e) {
        e.preventDefault();
        if (e.ctrlKey) {
          const transforms = self.panzoom.getTransform();
          console.log(transforms);
          console.log(e);
          self.panzoom.zoomTo(transforms.x, transforms.y, transforms.scale - (e.deltaY/50));
        } else {
          const transforms = self.panzoom.getTransform();
          self.panzoom.moveTo(transforms.x - e.deltaX, transforms.y - e.deltaY);
        }
      });*/

      // elem.addEventListener("panzoomzoom", function(event) {
      //   self.$store.commit("setZoomScale", { zoomScale: event.detail.scale });
      // });
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

  .isDragging  &{
    cursor: grabbing;
  }

  .markasdone & {
    cursor: cell !important;
  }
  .zoom & {
    cursor: zoom-in !important;
  }
  .zoom .shiftPressed &,
  .zoom .altPressed & {
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
