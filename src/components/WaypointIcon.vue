<template>
  <svg
    class="waypoint"
    :class="{ myTrailHovered: myTrailHovered, imBeingViewed: imBeingViewed, imMarkedDone: imMarkedDone }"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    xml:space="preserve"
    style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality;"
    viewBox="0 0 100 100"
  >
    <g
      class="shape"
      @click="onClick"
      :class="{ imBeingHovered: imBeingHovered }"
    >
      <clipPath class="polygonMask" :id="'polygonMask-' + waypointdata.id">
        <polygon :points="polygonPoints"></polygon>
      </clipPath>
      <polygon
        :points="polygonPoints"
        class="polygonBorder"
        :id="'polygonBorder-' + waypointdata.id"
      ></polygon>
      <foreignObject
        @mouseover="mouseEnter()"
        @mouseleave="mouseLeave()"
        x="0%"
        y="0%"
        width="100%"
        height="100%"
        :clip-path="'url(#polygonMask-' + waypointdata.id + ')'"
      >
        <div class="circle colorfilter">
          <img :src="ThumbUrl" />
          <div class="text">
            {{ imMarkedDone }}
            {{ waypointdata.fields.Name }}
          </div>
          <br />
        </div>
      </foreignObject>
    </g>
  </svg>
</template>

<script>
/* eslint-disable */

function valueToPoint(value, index, total, radius) {
  var x = 0;
  var y = -value * radius;
  var angle = ((Math.PI * 2) / total) * index;
  var cos = Math.cos(angle);
  var sin = Math.sin(angle);
  var tx = x * cos - y * sin + radius;
  var ty = x * sin + y * cos + radius;
  return {
    x: tx,
    y: ty
  };
}

function mapToRange(val, min, max) {
  // assume val is from 0 to 1
  return val * (max - min) + min;
}

import seedrandom from "seedrandom";

export default {
  name: "WaypointIcon",
  data() {
    return {
      polygonvalues: [],
      radius: 50,
      location: null,
      imBeingHovered: false
    };
  },
  props: ["waypointdata", "zoomscale"],
  created() {
    this.polygonvalues = this.randomPointValues();
  },
  computed: {
    cursorMode() {
      return this.$store.state.cursorMode;
    },
    waypointsMarkedDone() {
      return this.$store.state.waypointsMarkedDone;
    },
    hoveringTrails() {
      return this.$store.state.hoveringTrails;
    },
    hoveringWaypoints() {
      return this.$store.state.hoveringWaypoints;
    },
    currentlyViewingWaypoint() {
      return this.$store.state.currentlyViewingWaypoint;
    },
    waypointsDraggable() {
      return this.$store.state.waypointsDraggable;
    },
    imBeingViewed() {
      return this.currentlyViewingWaypoint === this.waypointdata.id;
    },
    imMarkedDone() {
      return this.waypointsMarkedDone.includes(this.waypointdata.id);
    },
    myTrailHovered() {
      var self = this;
      return (
        self.hoveringTrails.filter(function(t) {
          return self.waypointdata.fields.Trails.indexOf(t) > -1;
        }).length > 0
      );
    },
    ThumbUrl() {
      try {
        return this.waypointdata.image.thumb.url;
      } catch {
        return "";
      }
    },
    polygonPoints() {
      var rpv = this.randomPointValues;
      var total = rpv.length;
      var self = this;
      return self.polygonvalues
        .map(function(v, i) {
          var point = valueToPoint(
            v,
            i,
            self.polygonvalues.length,
            self.radius
          );
          return point.x + "," + point.y;
        })
        .join(" ");
    }
  },
  methods: {
    mouseEnter() {
      var self = this;
      this.imBeingHovered = true;
      this.$store.commit("addHoveringWaypoint", {
        id: self.waypointdata.id
      });
    },
    mouseLeave() {
      var self = this;
      this.imBeingHovered = false;
      this.$store.commit("removeHoveringWaypoint", {
        id: self.waypointdata.id
      });
    },
    randomPointValues() {
      var myrng = new seedrandom(this.waypointdata.id);
      return Array.from({ length: 8 }, () => mapToRange(myrng(), 0.5, 0.95));
    },
    onClick(event) {
      if (this.waypointsDraggable == false) {
        if (this.cursorMode["navigate"] == true) {
          this.onClickViewWaypoint();
        }
        if (this.cursorMode["markasdone"] == true) {
          this.onClickToggleWaypointAsDone();
        }
      }
    },
    onClickViewWaypoint() {
      var self = this;
      this.$store.commit("currentlyViewingWaypoint", {
        id: self.waypointdata.id
      });
      self.$router
        .push({
          name: "ViewWaypoint",
          params: { id: self.waypointdata.id }
        })
        .catch(err => {});
    },
    onClickToggleWaypointAsDone() {
      var self = this;
      this.$store.dispatch("toggleWaypointDone", {
        id: self.waypointdata.id
      });
    }
  }
};
</script>

<style scoped lang="scss">
svg.waypoint {
  width: 100px;
  height: 100px;
}

foreignObject {
  pointer-events: auto;
}

img {
  opacity: 0.5;
  position: absolute;
}

.circle {
  display: flex;
  align-items: center;
  border-radius: 100%;
  height: 90%;
  width: 90%;
  padding: 5%;
}
.text {
  z-index: 100;
  font-weight: bold;
  font-size: 0.5em;
  text-align: center;
  width: 100%;
  overflow-wrap: break-word;
}

.colorfilter {
  position: relative;
}

.colorfilter:after {
  position: absolute;
  content: "";
  display: block;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: #a3a7ce;
  mix-blend-mode: multiply;
}

g.shape {
  cursor: pointer;
}

.polygonBorder {
  border: 1px solid blue;
  stroke: black;
  stroke-width: 4;
  stroke-linejoin: round;
  fill: none;

  .myTrailHovered & {
    stroke-width: 10;
  }

  .imBeingViewed & {
    stroke: red;
  }

  .imBeingHovered & {
    stroke-width: 8;
  }

  .imMarkedDone & {
    stroke: orange;
  }
}

.polygonMask {
}
</style>
