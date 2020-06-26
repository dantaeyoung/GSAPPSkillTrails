<template>
  <div id="sidebarFrame" class="sidebarFrame" :class="{ isViewing: true, isTrail: wportrail=='trail', isWaypoint: wportrail=='waypoint' }">
    <div class="vwContent" v-if="wportrail=='trail'">
      <TrailContents :traildata="traildata" />
    </div>
    <div class="vwContent" v-if="wportrail=='waypoint'">
      <WaypointContents :waypointdata="waypointdata" />
    </div>
  </div>
</template>

<script>
/* eslint-disable */

import TrailContents from "@/components/TrailContents.vue";
import WaypointContents from "@/components/WaypointContents.vue";

import { mapState } from "vuex";

export default {
  name: "SidebarView",
  components: {
    TrailContents,
    WaypointContents,
  },
  mounted() {
    var self = this;
  },
  computed: {
    ...mapState(["waypoints", "trails", "softwares", "topics", "texts"]),
    wportrail() {
      return this.$route.params.wportrail;
    },
    thisid() {
      return this.$route.params.id;
    },
    traildata() {
      return this.trails[this.thisid];
    },
    waypointdata() {
      return this.waypoints[this.thisid];
    },
  }
};
</script>

<style scoped lang="scss">

.sidebarFrame {
  pointer-events: none;
  position: fixed;
  top: 0px;
  height: 100vh;
  right: 0px;
  width: 40vw;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;


  transition: all 0.8s ease-in-out;

  &.isViewing {
    /* right: -400px; */
  }
}

.vwContent {
  pointer-events: auto;

  padding: 30px;
  text-align: left;

  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  background-color: white;

  overflow-y: auto;
margin: 50px 0px;

  .isWaypoint &  {
  border-left: 5px solid lighten(#fc0452, 15%);
  }
  .isTrail &  {
  border-left: 5px solid lighten(#43aed0, 15%);
  }

}
</style>
