<template>
  <svg
    class="waypoint"
    :class="{
      myTrailHovered: myTrailHovered,
      imBeingViewed: imBeingViewed,
      imMarkedDone: imMarkedDone,
      mySoftwareOrTopicHovered: mySoftwareOrTopicHovered,
      isStartingWaypoint: isStartingWaypoint
    }"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    xml:space="preserve"
    style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality;"
    :style="svgStyle"
    viewBox="0 0 100 100"
  >
    <g
      class="shape"
      @click="onClick"
      :class="{ imBeingHovered: imBeingHovered }"
    >
      <clipPath class="polygonMask" :id="'polygonMask-' + waypointdata.id">
        <polygon :points="polygonPoints"></polygon>
      </clipPath>
      <polygon
        :points="polygonPoints"
        class="polygonBorder"
        :id="'polygonBorder-' + waypointdata.id"
      ></polygon>
      <foreignObject
        @mouseover="mouseEnter()"
        @mouseleave="mouseLeave()"
        x="5%"
        y="5%"
        width="90%"
        height="90%"
        :clip-path="'url(#polygonMask-' + waypointdata.id + ')'"
      >
        <div class="circle colorfilter">
          <img :src="ThumbUrl" />
          <div class="text" v-if="!hidetext">
            {{ waypointdata.fields.Name }}
          </div>
          <br />
        </div>
      </foreignObject>
      <foreignObject
        x="0%"
        y="0%"
        width="100%"
        height="100%"
        class="check"
      >
        <img src="@/assets/check-icon.svg" />
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

import { slug } from "@/mixins/slug.js";
import seedrandom from "seedrandom";
import { mapState } from "vuex";

export default {
  name: "WaypointIcon",
  mixins: [slug],
  data() {
    return {
      polygonvalues: [],
      maxRadius: 50,
      location: null,
      imBeingHovered: false
    };
  },
  props: ["waypointdata", "disableclick", "hidetext"],
  computed: {
    svgStyle() {
      return `width: ${this.radius * 2}; height: ${this.radius * 2};`;
    },
    radius() {
      return this.maxRadius;
    },
    ...mapState(["waypoints", "trails", "cursorMode", "waypointsMarkedDone", "hoveringTrails", "hoveringWaypoints", "waypointsDraggable", "hoveringSoftware", "hoveringTopic"]),
    currentlyViewingWaypoint() {
      return this.$store.state.route.params.id;
    },
    imBeingViewed() {
      return this.currentlyViewingWaypoint === this.waypointdata.id;
    },
    imMarkedDone() {
      return this.waypointsMarkedDone.includes(this.waypointdata.id);
    },
    myTrailHovered() {
      var self = this;
      return (
        self.hoveringTrails.filter(function(t) {
          return self.waypointdata.fields.Trails.indexOf(t) > -1;
        }).length > 0
      );
    },
    mySoftwareOrTopicHovered() {
      var result = false;
      if(this.waypointdata.fields.Topics) {
        result = result || this.waypointdata.fields.Topics.includes(this.hoveringTopic) ;
      }
      if(this.waypointdata.fields.Softwares) {
        result = result || this.waypointdata.fields.Softwares.includes(this.hoveringSoftware);
      }
      return result;
    },
		isStartingWaypoint() {
      try {
        let mytrails = this.waypointdata.fields.Trails.map(tid => this.trails[tid]);
        let myPosInTrails = mytrails.map(mt => mt.fields.Waypoints.indexOf(this.waypointdata.id));
        return myPosInTrails.reduce((tot, p) => { return tot * p; }, 1) == 0;
      } catch {
        return false;
      }

		},
    ThumbUrl() {
      try {
        return this.waypointdata.image.thumb.url;
      } catch {
        return "";
      }
    },
    polygonPointValues() {
      let chunkcount = 3;
      let chunkpoints = 3;
      let chunkalternate = true;

      var myrng = new seedrandom(this.waypointdata.id);

      var self = this;
      let symchunk = Array.from({ length: chunkpoints }, () => {
        return self.imBeingHovered ? 0.95 : mapToRange(myrng(), 0.5, 0.95);
      });
      let allpts = [].concat.apply([], Array(chunkcount).fill(symchunk));

      return allpts;

      return Array.from({ length: 15 }, () => mapToRange(myrng(), 0.5, 0.95));
    },
    polygonPoints() {
      var rpv = this.polygonPointValues;
      var total = rpv.length;
      var self = this;
      return self.polygonPointValues
        .map(function(v, i) {
          var point = valueToPoint(
            v,
            i,
            self.polygonPointValues.length,
            self.radius
          );
          return point.x + "," + point.y;
        })
        .join(" ");
    }
  },
  methods: {
    mouseEnter() {
      if(this.disableclick) { return; }
      var self = this;
      this.imBeingHovered = true;
      this.$store.commit("addHoveringWaypoint", {
        id: self.waypointdata.id
      });
    },
    mouseLeave() {
      if(this.disableclick) { return; }
      var self = this;
      this.imBeingHovered = false;
      this.$store.commit("removeHoveringWaypoint", {
        id: self.waypointdata.id
      });
    },
    onClick(event) {
      if(this.disableclick) { return; }
      if (this.waypointsDraggable == false) {
        if (this.cursorMode["markasdone"] == true) {
          this.onClickToggleWaypointAsDone();
        } else {
          this.onClickViewWaypoint();
        }
        event.stopPropagation();
      }
    },
    onClickViewWaypoint() {
      var self = this;
      self.$router
        .push({
          name: "MapViewBoth",
          params: {
            wportrail: 'waypoint',
            id: self.waypointdata.id,
            slug: self.convertToSlug(self.waypointdata.fields.Name),
          }
        })
        .catch(err => {});
    },
    onClickToggleWaypointAsDone() {
      var self = this;
      this.$store.dispatch("toggleWaypointDone", {
        id: self.waypointdata.id
      });
    }
  }
};
</script>

<style scoped lang="scss">
@import '@/mixins/variables.scss';

svg.waypoint {
  /*  width: 100px;
  height: 100px; */
}

foreignObject {
  pointer-events: auto;
}

.check {
  pointer-events: none;
  img {
    position: absolute;
    right: 5%;
    width: 30%;
    top: 5%;
    opacity: 0;

    .imMarkedDone & {
      opacity: 1;
    }

    .markasdone .imBeingHovered & {
      opacity: 0.5;
    }

  }

}

.done {
  position: absolute;
  text-align: center;
  width: 100%;
  font-weight: bold;
  text-transform: uppercase;
  transform: rotate(-20deg) skew(-20deg);
}

img {
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
  font-size: 0.65em;
  text-align: center;
  width: 100%;
  overflow-wrap: break-word;
  color: #111;
  line-height: 1.2em;
}

.colorfilter {
  position: relative;
}

/* .colorfilter:after { */
/*   position: absolute; */
/*   content: ""; */
/*   display: block; */
/*   top: 0; */
/*   left: 0; */
/*   height: 100%; */
/*   width: 100%; */
/*   background: #EEE; */
/*   mix-blend-mode: multiply; */
/* } */

g.shape {
  cursor: pointer;
}

.polygonBorder {
  stroke: black;
  stroke-width: 5;
  fill: #eee;

  .myTrailHovered & {
    stroke-width: 10;
  }

  .imBeingViewed & {
    stroke: $waypointcolor !important;
  }

  .imBeingHovered & {
    stroke-width: 7;
  }

  .imMarkedDone & {
    fill: $donecolor;
    stroke: $donecolor;
  }

  .mySoftwareOrTopicHovered & {
    stroke: $waypointcolor;
  }

  .isStartingWaypoint & {
    stroke: $startingwp;
  }
}

.polygonMask {
}
</style>
