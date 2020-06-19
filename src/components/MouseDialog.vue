<template>
  <div id="MouseDialog" :style="positionStyle">
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
    hoveringWaypoints() {
      return this.$store.state.hoveringWaypoints;
    },
    hoveringTrails() {
      return this.$store.state.hoveringTrails;
    },
    trails() {
      return this.$store.state.trails;
    },
    waypoints() {
      return this.$store.state.waypoints;
    },
    positionStyle() {
      return `position: absolute; 
      top: ${this.posY}px; 
      left: ${this.posX}px;`;
    },
    trailsOfHoveringWaypoints() {
      var self = this;
      let traillist = self.hoveringWaypoints.map(wid => {
        return self.waypoints[wid].fields.Trails;
      });
      return [].concat.apply([], traillist); // flatten list
    }
  },
  methods: {
    initMouseListener() {
      var self = this;
      document
        .getElementById(self.mouseeventid)
        .addEventListener("mousemove", function(e) {
          self.posX = e.pageX;
          self.posY = e.pageY;
        });
    }
  }
};
</script>

<style scoped lang="scss">
#MouseDialog {
  margin: 10px;
  z-index: 100;
  text-align: left;
  pointer-events: none;
}

.hoverTrail {
  .trailName {
    background-color: blue;
    color: white;
    font-weight: bold;
    padding: 5px 10px;
  }
}

.hoverWaypoint {
  .wpName {
    background-color: red;
    color: white;
    font-weight: bold;
    padding: 5px 10px;
  }
  .trailNames {
  }
  .trailName {
    display: inline-block;
    background-color: blue;
    color: white;
    font-weight: bold;
    padding: 5px 10px;
    float:left;
    clear: left;
  }
}
</style>
