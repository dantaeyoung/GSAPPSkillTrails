<template>

  <div id="ViewWaypoint">
    <div v-if="waypointdata && waypointdata.fields">
      <h4>Viewing: {{ waypointdata.fields.Name }} at {{ waypointdata.fields.URL }}</h4>
    <!--<iframe :src="ViewURL" />  -->
    </div>
  </div>
</template>

<script>


export default {
  name: 'ViewWaypoint',
  components: {
  },
  created() {
    console.log(this.$route.params);
  },
  computed: {
    waypointfields() {
      try {
        return this.waypointdata.fields;
      } catch {
        return {};
      }
    },
    waypointdata() {
      return this.$route.params.waypointdata;
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

