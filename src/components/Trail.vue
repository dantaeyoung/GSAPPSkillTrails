<template>
  <g
    @mouseover="mouseOver()"
    @mouseleave="mouseLeave()"
    :class="{ isHovering: hover }"
  >
    <path class="svgtrail" :d="svgTrailPath" :key="traildata.id" />
  </g>
</template>

<script>
/* eslint-disable */

import { CurveInterpolator } from "curve-interpolator";

export default {
  name: "Trail",
  data() {
    return {
      radius: 50,
      location: null,
      hover: false
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
    mouseOver() {
      this.hover = true;
      this.$store.commit("addHoveringTrails", {
        ids: [ this.traildata.id ]
      });
    },
    mouseLeave() {
      this.hover = false;
      this.$store.commit("removeHoveringTrails", {
        ids: [ this.traildata.id ]
      });
    }
  }
};
</script>

<style scoped lang="scss">
.svgtrail {
  fill: none;
  stroke: black;
  stroke-width: 4;
  stroke-linejoin: round;
  cursor: pointer;

  .isHovering & {
    stroke-width: 20;
  }
}
</style>
