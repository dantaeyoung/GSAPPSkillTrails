<template>
  <svg
    class="waypoint"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    xml:space="preserve"
    style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality;"
    viewBox="0 0 100 100"
    :style="positionStyle"
    @click="onClick"
  >
    <g>
      <clipPath class="polygonMask" :id="'polygonMask-' + waypointdata.id">
        <polygon :points="polygonPoints"></polygon>
      </clipPath>
      <polygon
        :points="polygonPoints"
        class="polygonBorder"
        :id="'polygonBorder-' + waypointdata.id"
      ></polygon>
      <foreignObject
        x="0%"
        y="0%"
        width="100%"
        height="100%"
        :clip-path="'url(#polygonMask-' + waypointdata.id + ')'"
      >
        <div class="circle colorfilter">
          <img :src="ThumbUrl" />
          <div class="text">{{ waypointdata.fields.Name }}</div>
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
  name: "Waypoint",
  data() {
    return {
      polygonvalues: [],
      radius: 50,
      location: null,
      isBeingDragged: false,
      startCoords: { x: 0, y: 0 },
      dragCoords: { x: 0, y: 0 },
      parentListenerElement: null,
    };
  },
  props: ["waypointdata", "zoomscale"],
  created() {
    this.polygonvalues = this.randomPointValues();
  },
  computed: {
    waypointsDraggable() {
      return this.$store.state.waypointsDraggable;
    },
    sidelength() {
      return this.$store.state.sidelength;
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
    },
    positionStyle() {
      return `position: absolute; 
      top: ${this.currentPosition.y}px; 
      left: ${this.currentPosition.x}px;`;
    },
    currentPosition() {
      return { 
        x: this.waypointdata.fields.coordinateX + this.dragCoords.x,
        y: this.waypointdata.fields.coordinateY + this.dragCoords.y,
      }
    }
  },
  methods: {
    randomPointValues() {
      var myrng = new seedrandom(this.waypointdata.id);
      return Array.from({ length: 8 }, () => mapToRange(myrng(), 0.5, 1));
    },
    onClick(event) {
      if (!this.waypointsDraggable) {
        this.onClickViewWaypoint();
      } else {
        if(this.isBeingDragged == false) {
          this.startDragging(event);
        } else {
          this.endDragging();
        }
      }
    },
    onClickViewWaypoint() {
      var self = this;
      console.log("going to", self.waypointdata.id);
      self.$router.push({
        name: "ViewWaypoint",
        params: { waypointdata: self.waypointdata, id: self.waypointdata.id }
      });
    },
    startDragging(event) {
      var self = this;
      this.parentListenerElement = event.currentTarget.parentElement;
      this.parentListenerElement.addEventListener("mousemove", self.mouseMove);
      this.isBeingDragged = true;
      this.startCoords = { x: event.pageX, y: event.pageY };
    },
    mouseMove(event) {
      if (!this.isBeingDragged) {
        return;
      }
      event.stopPropagation();
      if (this.isBeingDragged) {
        this.dragCoords = {
          x: (event.pageX - this.startCoords.x) / this.zoomscale,
          y: (event.pageY - this.startCoords.y) / this.zoomscale
        };
      }
    },
    endDragging(e) {
      this.parentListenerElement.removeEventListener('mousemove', self.mouseMove);
      this.$store.commit('setWaypointCoordinates', {
        waypointid: this.waypointdata.id,
        x: this.currentPosition.x,
        y: this.currentPosition.y
      });
      this.isBeingDragged = false;
      this.dragCoords = { x: 0, y: 0 };
    },
  }
};
</script>

<style scoped lang="scss">
.waypoint {
  width: 100px;
  height: 100px;
  margin-left: -50px;
  margin-top: -50px;
  cursor: pointer;
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

.polygonBorder {
  stroke: black;
  stroke-width: 4;
  stroke-linejoin: round;
  fill: none;
}

.polygonMask {
}
</style>
