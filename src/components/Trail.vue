<template>
  <g>
    hello
    <path class="svgtrail" :d="svgTrailPath" :key="'trailXx-' + traildata.id" />
  </g>
</template>

<script>
/* eslint-disable */

import seedrandom from "seedrandom";

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
    svgTrailPath() {
      return "M150 0 L75 200 L225 200 Z";
      var self = this;
      //         <path d="M150 0 L75 200 L225 200 Z" />
      //         <path d="M150 0 L75 200 L225 200 Z" />
      var pathstring = "M";
      let pathdata = self.traildata.contents.map(d => {
        let loc = self.getWaypointLocation(d.id);
        return loc.x + " " + loc.y + " ";
      });
      pathstring += pathdata.join(" L");
      return pathstring;
    }
  },
  methods: {
    getWaypointLocation(seed) {
      console.log(seed);
      let myrng = new seedrandom(seed);
      return { x: myrng() * 800, y: myrng() * 800 };
    }
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
