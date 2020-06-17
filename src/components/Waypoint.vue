<template>
  <svg class="waypoint"
    xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality;"
    viewBox = "0 0 100 100"
    :style="positionStyle" >
    <g @click="onClickViewWaypoint">
      <clipPath class="polygonMask" :id="'polygonMask-' + waypointdata.id">
        <polygon :points="polygonPoints"></polygon>
      </clipPath>
      <polygon :points="polygonPoints" class="polygonBorder" :id="'polygonBorder-' + waypointdata.id"></polygon>
      <foreignObject x="0%" y="0%" width="100%" height="100%" :clip-path="'url(#polygonMask-' + waypointdata.id + ')'">
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
  var tx = x * cos - y * sin + (radius);
  var ty = x * sin + y * cos + (radius);
  return {
    x: tx,
    y: ty
  };
}


function mapToRange(val, min, max) {
  // assume val is from 0 to 1
  return (val * (max - min)) + min; 
}

import seedrandom from 'seedrandom'
import TopHeader from '@/components/TopHeader.vue'

export default {
  name: 'Waypoint',
  data() {
    return {
      polygonvalues: [],
      radius: 50,
      location: null,
    };
  },
  props: ['waypointdata'],
  created() {
    this.polygonvalues = this.randomPointValues();
  },
  computed: {
    ThumbUrl() {
      try { return this.waypointdata.image.thumb.url; }
      catch { return "" }
    },
    polygonPoints() {
      var rpv = this.randomPointValues;
      var total = rpv.length;
      var self = this;
      return self.polygonvalues
        .map(function(v, i) {
          var point = valueToPoint(v, i, self.polygonvalues.length, self.radius);
          return point.x + "," + point.y;
        })
        .join(" ");
    },
    positionStyle() {
      return `position: absolute; top: ${ this.waypointdata.fields.coordinateY }px; left: ${ this.waypointdata.fields.coordinateX }px;`;
    }
  },
  methods: {
    randomPointValues() {
      var myrng = new seedrandom(this.waypointdata.id);
      return Array.from({length: 8}, () => mapToRange(myrng(), 0.5, 1));
    },
    onClickViewWaypoint() {
      var self = this;
      console.log("going to", self.waypointdata.id);
      self.$router.push({ name: "ViewWaypoint", params: { waypointdata: self.waypointdata, id: self.waypointdata.id } });
    }
  }
}
</script>

<style scoped lang="scss">

.waypoint {
  width: 100px; 
  height: 100px;
  margin-left: -50px;
  margin-top: -50px;
}

img {
  opacity: 0.5;
  position: absolute;
}

.circle{
  display: flex;
  align-items: center;
  border-radius: 100%;
  height: 90%;
  width: 90%;
  padding: 5%
}
.text {
  z-index: 100;
  font-weight: bold;
  font-size: 0.5em;
  text-align: center;
  width: 100%;
  overflow-wrap: break-word;
}



.colorfilter{
  position: relative;
}

.colorfilter:after{
  position: absolute; content: ''; 
  display: block; top: 0; left: 0; height: 100%; width: 100%;
    background: #A3A7ce;
    mix-blend-mode: multiply;
}

.polygonBorder {
  stroke: black;
  stroke-width: 4;
  stroke-linejoin: round;
}
.polygonMask {
}


</style>
