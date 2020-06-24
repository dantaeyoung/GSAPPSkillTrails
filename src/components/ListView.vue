<template>
    <div class="listview">
      <div v-for="(trail, id) in trails" :key="id">
        <div class="trailname"><img class="trailicon" src="@/assets/trail-icon.svg" />{{ trail.fields.Name }}</div>

        <ul>
          <li v-for="waypointid in trail.fields.Waypoints" :key="waypointid">
          <WaypointIcon :waypointdata="waypoints[waypointid]"/>
            <router-link class="navlink waypointlink" :to="{ name: 'ListView', params: { wpid: waypointid, slug: convertToSlug(waypoints[waypointid].fields.Name) }}" >
              {{ waypoints[waypointid].fields.Name }}
            </router-link>
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
/* eslint-disable */

import WaypointIcon from "@/components/WaypointIcon.vue";

import { slug } from '@/mixins/slug.js';

export default {
  name: "ListView",
  mixins: [slug],
  data() {
    return {};
  },
  components: {
    WaypointIcon
  },
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
  padding-top: 30px;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin: 2px 8px;
  display: flex;
  align-items: center;
}
a {
  color: #42b983;
}

.trailname {
  display: flex;
  align-items: center; 
  font-size: 1.2em;
  font-weight: bold;
  color: darken(#2da6bd, 10%);

  img {
    height:20px;
    margin-right: 5px;
  }
}

svg.waypoint {
  height:30px;
  margin-right: 5px;
}

.waypointlink {
  font-size: 0.9em;
  font-weight: bold;
  line-height: 1.2em;

  color: black;
}




</style>
