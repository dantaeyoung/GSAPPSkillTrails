<template>
  <g
    @mouseenter="mouseEnter()"
    @mouseleave="mouseLeave()"
    class="gtrail"
    :class="{
      amBeingHovered: amBeingHovered,
      myWaypointHovered: myWaypointHovered,
      myWaypointBeingViewed: myWaypointBeingViewed,
      myTrailBeingViewed: myTrailBeingViewed
    }"
    @click="onClick"
    v-if="isLoadedWaypoints"
  >
    <path class="svgtrail" :d="svgTrailPath" :style="svgtrailStyle" />
    <path
      class="svgtrail-arrows"
      :d="svgTrailPath"
      :style="svgtrailarrowStrokeWidth"
    />
    <g class="wpdots">
      <circle 
      class="wpdot"
      :class="{ currentlyBeingViewed: currentlyViewingWaypoint === d.id }"
      v-for="d in svgTrailDotPoints" :key="d.id"
      :cx="d.x" :cy="d.y" r="7" />
    </g>
  </g>
</template>

<script>
/* eslint-disable */

import { CurveInterpolator } from "curve-interpolator";
import { slug } from "@/mixins/slug.js";

var strokeSettings = {
  normal: `stroke-dasharray: 8;`,
  amBeingHovered: `stroke-dasharray: none;`,
  myWaypointHovered: `stroke-dasharray: none;`,
  myWaypointBeingViewed: `stroke-dasharray: none; stroke: #70c0d8;`,
  myTrailBeingViewed: `stroke-dasharray: none; stroke: #70c0d8;`
};

var strokeWidths = {
  normal: 4,
  amBeingHovered: 20,
  myWaypointHovered: 20,
  myWaypointBeingViewed: 40,
  myTrailBeingViewed: 40
};

var arrowStrokeWidths = {
  myWaypointBeingViewed: 3,
  myTrailBeingViewed: 3
};

export default {
  name: "Trail",
  mixins: [slug],
  data() {
    return {
      radius: 50,
      location: null,
      amBeingHovered: false
    };
  },
  props: [ "traildata", "zoomscale", "disableclick"],
  created() {},
  computed: {
    svgtrailStyle() {
      var s = strokeSettings["normal"];
      s += `stroke-width: ${strokeWidths["normal"] / this.zoomscale }`;
      if (this.amBeingHovered) {
        s = strokeSettings["amBeingHovered"];
        s += `stroke-width: ${strokeWidths["amBeingHovered"]}`;
      }
      if (this.myWaypointHovered) {
        s = strokeSettings["myWaypointHovered"];
        s += `stroke-width: ${strokeWidths["myWaypointHovered"]}`;
      }
      if (this.myWaypointBeingViewed) {
        s = strokeSettings["myWaypointBeingViewed"];
        s += `stroke-width: ${strokeWidths["myWaypointBeingViewed"] /
          this.zoomscale}`;
      }
      if (this.myTrailBeingViewed) {
        s = strokeSettings["myTrailBeingViewed"];
        s += `stroke-width: ${strokeWidths["myTrailBeingViewed"] /
          this.zoomscale}`;
      }
      return s;
    },
    svgtrailarrowStrokeWidth() {
      var s = "";
      if (this.myWaypointBeingViewed) {
        s += `stroke-width: ${arrowStrokeWidths["myWaypointBeingViewed"] /
          this.zoomscale}`;
      }
      if (this.myTrailBeingViewed) {
        s += `stroke-width: ${arrowStrokeWidths["myTrailBeingViewed"] /
          this.zoomscale}`;
      }
      return s;
    },
    isLoadedWaypoints() {
      return Object.keys(this.waypoints).length > 0;
    },
    waypoints() {
      return this.$store.getters.waypoints;
    },
    hoveringWaypoints() {
      return this.$store.state.hoveringWaypoints;
    },
    currentlyViewingTrail() {
      return this.$store.state.route.params.id;
    },
    currentlyViewingWaypoint() {
      return this.$store.state.route.params.id;
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
    myTrailBeingViewed() {
      return this.traildata.id === this.currentlyViewingTrail;
    },
    svgTrailDotPoints() {
      var self = this;
      try {
        var wpcoords = self.traildata.fields.Waypoints.map(wpid => {
          return {
            id: wpid,
          x: self.waypoints[wpid].fields.coordinateX,
          y: self.waypoints[wpid].fields.coordinateY,
          }
        });
      } catch (e) {
        console.log("i was caught");
        return [];
      }
      return wpcoords;
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
      } catch (e) {
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
      if(!this.disableclick) { this.onClickViewTrail(); }
    },
    onClickViewTrail() {
      var self = this;
      self.$router
        .push({
          name: "MapViewBoth",
          params: {
            wportrail: "trail",
            id: self.traildata.id,
            slug: self.convertToSlug(self.traildata.fields.Name)
          }
        })
        .catch(err => {});
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
  stroke-linecap: round;
  stroke-linejoin: round;
  cursor: pointer;
  stroke: #43aed0;
}

#svgtrailarrow path {
  fill: white;
  opacity: 0.6;
}
.svgtrail-arrows {
  display: none;
  fill: none;
  stroke: #43aed0;

  marker-start: url(#svgtrailarrow);
  marker-mid: url(#svgtrailarrow);
  marker-end: url(#svgtrailarrow);

  .myWaypointBeingViewed &, .myTrailBeingViewed & {
    display: block;
    stroke-width: 4;
    stroke-dasharray: none;
    stroke: none;
  }
}

.wpdot {
  fill: darken(#43aed0, 15%);
    &.currentlyBeingViewed {
    fill: darken(#fc0452, 5%);
  }
}

</style>
