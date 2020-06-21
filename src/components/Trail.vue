<template>
  <g
    @mouseenter="mouseEnter()"
    @mouseleave="mouseLeave()"
    class="gtrail"
    :class="{ amBeingHovered: amBeingHovered, myWaypointHovered: myWaypointHovered, myWaypointBeingViewed: myWaypointBeingViewed }"
  >
    <path class="svgtrail" :d="svgTrailPath" :key="traildata.id" />
    {{ currentlyViewingWaypoint }}
     
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
      amBeingHovered: false
    };
  },
  props: ["traildata"],
  created() {},
  computed: {
    waypoints() {
      return this.$store.getters.waypoints;
    },
    hoveringWaypoints() {
      return this.$store.state.hoveringWaypoints;
    },
    currentlyViewingWaypoint() {
      return this.$store.state.currentlyViewingWaypoint;
    },
    myWaypointHovered() {
      var self = this;
      return (
        self.hoveringWaypoints.filter(function(t) {
          return self.traildata.fields.Waypoints.indexOf(t) > -1;
        }).length > 0
      );
    },
    myWaypointBeingViewed() {
      var self = this;
      return self.traildata.fields.Waypoints.includes(self.currentlyViewingWaypoint)
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
        console.log("i was caught");
        return "";
      }

      try { 
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
      } catch { 
        return "";
      }

    }
  },
  methods: {
    mouseEnter() {
      this.amBeingHovered = true;
      this.$store.commit("addHoveringTrails", {
        ids: [ this.traildata.id ]
      });
    },
    mouseLeave() {
      this.amBeingHovered = false;
      this.$store.commit("removeHoveringTrails", {
        ids: [ this.traildata.id ]
      });
    }
  }
};
</script>

<style scoped lang="scss">

.gtrail {
  pointer-events: auto;
}
.svgtrail {
  fill: none;
  stroke: black;
  stroke-width: 4;
  stroke-linejoin: round;
  cursor: pointer;

  .amBeingHovered & {
    stroke-width: 20;
  }

  .myWaypointHovered & {
    stroke-width: 20;
  }

  .myWaypointBeingViewed & {
    stroke-width: 20;
  }
}
</style>
