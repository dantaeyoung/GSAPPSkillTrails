<template>
  <div id="ViewWaypoint" :class="{ isViewing: currentlyViewingWaypoint }">
    {{ currentlyViewingWaypoint }}
      <div v-if="waypointdata && waypointdata.fields">
        <div class="title">{{ waypointdata.fields.Name }}</div>

        <div
          class="trailsPartOf"
          v-if="
            'Trails' in waypoints[thisid].fields &&
              waypoints[thisid].fields.Trails.length > 0
          "
        >
          Part of
          <div v-for="tid in waypoints[thisid].fields.Trails" :key="tid">
            {{ trails[tid].fields.Name }}
          </div>
        </div>
        {{ waypointdata.fields.URL }}<br />
        {{ thisid }}
        <!--     <iframe :src="waypointdata.fields.URL" />  -->
        <!-- <VideoEmbed :url="waypointdata.fields.URL" /> -->
      </div>
  </div>
</template>

<script>
/* eslint-disable */

import VideoEmbed from "@/components/VideoEmbed.vue";

export default {
  name: "ViewWaypoint",
  components: {
    VideoEmbed
  },
  created() {
    console.log(this.$route.params);
  },
  computed: {
    currentlyViewingWaypoint() {
      return this.$store.state.currentlyViewingWaypoint;
    },
    waypointdata() {
      return this.$store.getters.waypoints[this.thisid];
    },
    waypoints() {
      return this.$store.state.waypoints;
    },
    trails() {
      return this.$store.state.trails;
    },
    thisid() {
      return this.$route.params.id;
    }
  }
};
</script>

<style scoped lang="scss">
#ViewWaypoint {
  display: flex;
  flex-direction: column;
  width: 0px;
  overflow: hidden;

  /* TODO FINISH */

  &.isViewing {
    width: 500px;
  }

    transition: all .4s ease-in-out;
}

iframe {
  flex-grow: 1;
  max-width: 100% !important;
  width: auto !important;
  height: auto !important;
  border: none;
}

</style>
