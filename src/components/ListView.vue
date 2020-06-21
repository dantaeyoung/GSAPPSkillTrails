<template>
  <div class="hello">
    <h2>SKIL TREE GRAPH - LIST VIEW</h2>

    <div class="maingraph">
      <div v-for="(trail, id) in trails" :key="id">
        <h2>{{ trail.fields.Name }}</h2>

        <div v-for="waypointid in trail.fields.Waypoints" :key="waypointid">
          <a :href="waypoints[waypointid].fields.URL"
            >{{ waypoints[waypointid].fields.Name }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */

export default {
  name: "ListView",
  data() {
    return {};
  },
  components: {},
  props: {},
  created() {},
  computed: {
    waypoints() {
      return this.$store.getters.waypoints;
    },
    trails() {
      return this.$store.getters.trails;
    }
  },
  methods: {}
};
</script>

<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.maingraph {
  position: relative;
}
</style>
