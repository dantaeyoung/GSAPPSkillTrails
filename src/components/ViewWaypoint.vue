<template>

  <div id="ViewWaypoint">
    <div v-if="waypointdata && waypointdata.fields">
      <h4>{{ waypointdata.fields.Name }}</h4>
      {{ waypointdata.fields.URL }}<br />
      {{thisid}}
      <!--     <iframe :src="waypointdata.fields.URL" />  -->
      <VideoEmbed :url="waypointdata.fields.URL" />
    </div>
  </div>
</template>

<script>

import VideoEmbed from "@/components/VideoEmbed.vue";

export default {
  name: 'ViewWaypoint',
  components: {
    VideoEmbed,
  },
  created() {
    console.log(this.$route.params);
  },
  computed: {
    waypointdata() {
      return this.$store.state.waypoints[this.thisid]
    },
    thisid() {
      return this.$route.params.id;
    },
  },
}
</script>

<style scoped lang="scss">

#ViewWaypoint {
  display: flex;
  flex-direction: column;
  height: 100%;
}

iframe {
  flex-grow: 1;
        max-width: 100% !important;
        width: auto !important;
        height: auto !important;
  border: none;
}
</style>

