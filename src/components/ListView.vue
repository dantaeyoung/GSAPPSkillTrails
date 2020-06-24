<template>
    <div class="listview">
      <div v-for="(trail, id) in trails" :key="id">
        <div class="trailname">{{ trail.fields.Name }}</div>

        <ul>
          <li v-for="waypointid in trail.fields.Waypoints" :key="waypointid">
            <router-link class="navlink" :to="'/list/' + waypointid + '/' + convertToSlug(waypoints[waypointid].fields.Name)" >
              {{ waypoints[waypointid].fields.Name }}
            </router-link>
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
/* eslint-disable */

import { slug } from '@/mixins/slug.js';

export default {
  name: "ListView",
  mixins: [slug],
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
.listview {
  text-align: left;
  margin-left: 100px;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin: 0 10px;
}
a {
  color: #42b983;
}

.maingraph {
  position: relative;
}

.trailname {
  font-size: 1.2em;
  font-weight: bold;
  color: #2da6bd;
}
</style>
