<template>
  <div id="MouseDialog" :style="positionStyle" v-if="!isTouchDevice">
    <div class="waypointInfo" v-if="cursorMode.navigate == true">
      <div class="hoverTrail" v-for="tid in hoveringTrails" v-bind:key="tid">
        <span class="trailName">{{ trails[tid].fields.Name }}</span>
      </div>

      <div
        class="hoverWaypoint"
        v-for="wid in hoveringWaypoints"
        v-bind:key="wid"
      >
        <span class="wpName">{{ waypoints[wid].fields.Name }}</span
        >, part of
        <div class="trailNames">
          <div
            class="trailName"
            v-for="tid in trailsOfHoveringWaypoints"
            v-bind:key="tid"
          >
            {{ trails[tid].fields.Name }}
          </div>
        </div>
      </div>
    </div>
    <div
      class="markModeInfo"
      v-if="cursorMode.markasdone == true && hoveringWaypoints.length > 0"
    >
      Mark
      <div
        class="hoverMarkWaypoint"
        v-for="wid in hoveringWaypoints"
        v-bind:key="wid"
      >
        <span class="wpName">{{ waypoints[wid].fields.Name }}</span>
      </div>
      As Done
    </div>
  </div>
</template>

<script>
export default {
  name: "MouseDialog",
  data() {
    return {
      posX: 0,
      posY: 0
    };
  },
  props: ["mouseeventid"],
  components: {},
  mounted() {
    this.initMouseListener();
  },
  computed: {
    isTouchDevice() {
      return this.$store.state.isTouchDevice;
    },
    cursorMode() {
      return this.$store.state.cursorMode;
    },
    hoveringWaypoints() {
      return this.$store.state.hoveringWaypoints;
    },
    hoveringTrails() {
      return this.$store.state.hoveringTrails;
    },
    trails() {
      return this.$store.getters.trails;
    },
    waypoints() {
      return this.$store.getters.waypoints;
    },
    positionStyle() {
      return `position: absolute;
      top: ${this.posY}px;
      left: ${this.posX}px;`;
    },
    trailsOfHoveringWaypoints() {
      var self = this;
      let traillist = self.hoveringWaypoints
        .map(wid => {
          return self.waypoints[wid].fields.Trails;
        })
        .filter(function(element) {
          return element !== undefined;
        });
      if (traillist.length > 0) {
        return [].concat.apply([], traillist); // flatten list
      } else {
        return null;
      }
    }
  },
  methods: {
    initMouseListener() {
      var self = this;
      var elem = document.getElementById(self.mouseeventid);
      var rect = elem.getBoundingClientRect();
      elem.addEventListener("mousemove", function(e) {
        self.posX = e.clientX - rect.left;
        self.posY = e.clientY - rect.top;
      });
    }
  }
};
</script>

<style scoped lang="scss">
$trailblue: #43aed0;
$waypointred: #fc0452;

#MouseDialog {
  z-index: 100;
  text-align: left;
  pointer-events: none;
  margin: 15px;
}

.hoverTrail {
  .trailName {
    background-color: $trailblue;
    color: white;
    font-weight: bold;
    padding: 5px 10px;
  }
}

.hoverWaypoint {
  .wpName {
    background-color: $waypointred;
    color: white;
    font-weight: bold;
    padding: 5px 10px;
  }
  .trailNames {
  }
  .trailName {
    display: inline-block;
    background-color: $trailblue;
    color: white;
    font-weight: bold;
    padding: 5px 10px;
    float: left;
    clear: left;
  }
}

.hoverMarkWaypoint {
  .wpName {
    background-color: orange;
    color: white;
    font-weight: bold;
    padding: 5px 10px;
  }
}
</style>
