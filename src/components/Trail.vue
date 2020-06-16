<template>
  <svg>
    <path class="svgtrail" :d="svgTrailPath" :key="'trailX-' + traildata.id" />
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
import TopHeader from "@/components/TopHeader.vue";

export default {
  name: "Trail",
  data() {
    return {
      polygonvalues: [],
      radius: 50,
      location: null
    };
  },
  props: ["traildata"],
  created() {
    this.polygonvalues = this.randomPointValues();
  },
  computed: {
    svgTrailPath() {
      var self = this;
      //         <path d="M150 0 L75 200 L225 200 Z" />
      var pathstring = "M";
      let pathdata = self.traildata.contents.map(d => {
        let loc = self.getWaypointLocation(d.id);
        return loc.x + " " + loc.y + " ";
      });
      pathstring += pathdata.join(" L");
      return pathstring;
    },
    ThumbUrl() {
      try {
        return this.traildata.image.thumb.url;
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
      let myrng = new seedrandom(this.traildata.id);
      return `position: absolute; top: ${myrng() * 1000}px; left: ${myrng() *
        800}px;`;
    }
  },
  methods: {
    randomPointValues() {
      var myrng = new seedrandom(this.traildata.id);
      return Array.from({ length: 8 }, () => mapToRange(myrng(), 0.5, 1));
    },
    onClickViewLeaf() {
      console.log("going to", this.traildata.id);
      this.$router.push({
        name: "ViewLeaf",
        params: { traildata: this.traildata, id: this.traildata.id }
      });
    },
    getWaypointLocation(data) {
      let myrng = new seedrandom(data.id);
      return { x: myrng() * 1000, y: myrng() * 1000 };
    }
  }
};
</script>

<style scoped lang="scss">

svg {
  position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
.svgtrail {
  fill: none;
  stroke: black;
  stroke-width: 4;
  stroke-linejoin: round;

}

</style>
