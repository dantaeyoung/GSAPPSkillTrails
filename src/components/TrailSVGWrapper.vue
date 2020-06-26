<template>
  <svg class="svgtrailwrapper" 
  v-if="isLoadedWaypoints"
  :viewBox="viewBox" xmlns="http://www.w3.org/2000/svg"
  :style="svgStyle">
    <slot></slot>
  </svg>
</template>

<script>
/* eslint-disable */

export default {
  name: "TrailSVGWrapper",
  data() {
    return {
      boundsPadding: 40,
      svgScale: 0.8,
    };
  },
  props: ["traildata"],
  created() {},
  computed: {
    waypoints() {
      return this.$store.state.waypoints;
    },
    viewBox() {
      return `${this.svgBounds.xMin - this.boundsPadding } ${this.svgBounds.yMin - this.boundsPadding } ${this.viewBoxWidth} ${this.viewBoxHeight}`;
    },
    viewBoxWidth() {
      return this.svgBounds.xMax - this.svgBounds.xMin + (this.boundsPadding * 2);
    },
    viewBoxHeight() {
      return this.svgBounds.yMax - this.svgBounds.yMin + (this.boundsPadding * 2);
    },
    svgStyle() {
      return `width: ${this.viewBoxWidth * this.svgScale}px;
      height: ${this.viewBoxHeight * this.svgScale}px`
    },
    svgBounds() {
      var self = this;
      var bounds = { xMin: 999, xMax: -999, yMin: 999, yMax: -999}

      try {
        var wpcoords = self.traildata.fields.Waypoints.map(wpid => {
          return {
          x: self.waypoints[wpid].fields.coordinateX,
          y: self.waypoints[wpid].fields.coordinateY,
          }
        });
      } catch (e) {
        console.log("i was caught");
        return "";
      }

      var bounds = {
        xMin : Math.min(...wpcoords.map(o => o.x)),
        yMin : Math.min(...wpcoords.map(o => o.y)),
        xMax : Math.max(...wpcoords.map(o => o.x)),
        yMax : Math.max(...wpcoords.map(o => o.y)),
      }
      return bounds;
    },
    isLoadedWaypoints() {
      return Object.keys(this.waypoints).length > 0;
    },
  },
  methods: {
  }
};
</script>

<style lang="scss">

.svgtrailwrapper {

}
</style>
