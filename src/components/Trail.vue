<template>
  <g>
    hello
    <path class="svgtrail" :d="svgTrailPath" :key="traildata.id" />
  </g>
</template>

<script>
/* eslint-disable */

import { CurveInterpolator } from 'curve-interpolator';

export default {
  name: "Trail",
  data() {
    return {
      radius: 50,
      location: null
    };
  },
  props: ["traildata"],
  created() {},
  computed: {
    waypoints() {
      return this.$store.state.waypoints;
    },
    svgTrailPath() {
      var self = this;

      try {
        var wpcoords = self.traildata.fields.Waypoints.map(wpid => {
          return [
            self.waypoints[wpid].fields.coordinateX,
            self.waypoints[wpid].fields.coordinateY
          ];
        });
      } catch {
        return "";
      }

      const interp = new CurveInterpolator(wpcoords, { tension: 0.2 });
      const numpts = Object.keys(this.waypoints).length * 8;
      const pts = interp.getPoints(numpts);

      console.log(pts);

      var pathstring = "M";
      pathstring += pts 
        .map(item => {
          return item[0] + " " + item[1];
        })
        .join(" L");

      return pathstring;
    }
  },
  methods: {
  }
};
</script>

<style scoped lang="scss">
svg {
  position: absolute;
  left: 0;
  top: 0;
  width: 500px;
  height: 500px;
}
.svgtrail {
  fill: none;
  stroke: black;
  stroke-width: 4;
  stroke-linejoin: round;
}
</style>
