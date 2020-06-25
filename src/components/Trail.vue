<template>
  <g
    @mouseenter="mouseEnter()"
    @mouseleave="mouseLeave()"
    class="gtrail"
    :class="{
      amBeingHovered: amBeingHovered,
      myWaypointHovered: myWaypointHovered,
      myWaypointBeingViewed: myWaypointBeingViewed
    }"
    @click="onClick"
    v-if="isLoadedWaypoints"
  >
    <path class="svgtrail" :d="svgTrailPath" />
    <path class="svgtrail-arrows" :d="svgTrailPath" />
    {{ traildata.id + "-" + traildata.fields.Waypoints.length }}
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
    isLoadedWaypoints() {
      return (Object.keys(this.waypoints).length > 0)
    },
    waypoints() {
      return this.$store.getters.waypoints;
    },
    hoveringWaypoints() {
      return this.$store.state.hoveringWaypoints;
    },
    currentlyViewingWaypoint() {
      return this.$store.state.route.params.wpid;
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
      return self.traildata.fields.Waypoints.includes(
        self.currentlyViewingWaypoint
      );
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
      } catch(e) {
        console.log("i was caught");
        return "";
      }

      const interp = new CurveInterpolator(wpcoords, { tension: 0.2 });
      const numpts = Object.keys(this.waypoints).length * 1;
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
    onClick() {
    },
    mouseEnter() {
      this.amBeingHovered = true;
      this.$store.commit("addHoveringTrails", {
        ids: [this.traildata.id]
      });
    },
    mouseLeave() {
      this.amBeingHovered = false;
      this.$store.commit("removeHoveringTrails", {
        ids: [this.traildata.id]
      });
    }
  }
};
</script>

<style lang="scss">
.gtrail {
  pointer-events: auto;
}

.svgtrail {
  fill: none;
  stroke: #43aed0;
  stroke-width: 4;
  stroke-linecap: round;
  stroke-linejoin: round;
  cursor: pointer;
  stroke-dasharray: 8;

  .amBeingHovered & {
    stroke-width: 20;
    stroke-dasharray: none;
  }

  .myWaypointHovered & {
    stroke-width: 20;
    stroke-dasharray: none;
  }

  .myWaypointBeingViewed & {
    stroke-width: 40;
    stroke-dasharray: none;
    stroke: #70c0d8;
  }

}


#svgtrailarrow path {
  fill:  white;
  opacity: 0.6;
}
.svgtrail-arrows {
  display: none;
  fill: none;
  stroke: #43aed0;

   marker-start:url(#svgtrailarrow);
  marker-mid:url(#svgtrailarrow);
  marker-end:url(#svgtrailarrow);

  .myWaypointBeingViewed & {
    display: block;
    stroke-width: 4;
    stroke-dasharray: none;
    stroke: none;
  }
}


</style>
