<template>
  <div class="trailcontents">
    <div class="trailheader">
      <img class="trailicon" src="@/assets/trail-icon.svg" />
      <div class="trailnameauthor">
        <div class="trailname">{{ traildata.fields.Name }}</div>
        <div class="trailauthor" v-if="traildata.fields.Author" >By {{ traildata.fields.Author }}</div>
      </div>
    </div>

    <div class="traildescription">{{ traildata.fields.Description }}</div>

    <ul v-if="isLoadedWaypoints">
      <li v-for="waypointid in traildata.fields.Waypoints" :key="waypointid">
        <WaypointIcon :waypointdata="waypoints[waypointid]" />
        <router-link
          class="navlink waypointlink"
          :to="{
            name: routeName,
            params: {
              wportrail: 'waypoint',
              id: waypointid,
              slug: convertToSlug(waypoints[waypointid].fields.Name)
            }
          }"
        >
          <div class="name">{{ waypoints[waypointid].fields.Name }}</div>
        </router-link>
        <div class="author-name">
          {{ waypoints[waypointid].fields["Author Name"] }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
/* eslint-disable */

import { mapState } from "vuex";

import WaypointIcon from "@/components/WaypointIcon.vue";
import { slug } from "@/mixins/slug.js";

export default {
  name: "TrailContents",
  components: {
    WaypointIcon
  },
  mixins: [slug],
  props: ["traildata"],
  data() {
    return {};
  },
  mounted() {
    var self = this;
  },
  computed: {
    routeName() {
      return this.$route.name;
    },
    isLoadedWaypoints() {
      return Object.keys(this.waypoints).length > 0;
    },
    isLoadedTrails() {
      return Object.keys(this.trails).length > 0;
    },
    currentlyViewingWaypoint() {
      return this.$store.state.route.params.wpid;
    },
    waypointdata() {
      return this.$store.getters.waypoints[this.thisid];
    },
    ...mapState(["waypoints", "trails", "softwares", "topics", "texts"]),
    thisid() {
      return this.$route.params.wpid;
    },
    coverImageThumbnail() {
      try {
        return this.waypointdata.fields["Cover Image"][0]["url"];
        // return this.waypointdata.fields["Cover Image"][0]["thumbnails"]["large"]["url"];
      } catch (e) {
        return null;
      }
    }
  }
};
</script>

<style scoped lang="scss">
ul {
  list-style-type: none;
  padding: 0;
  margin: 0px;
}
li {
  margin: 2px 8px;
  display: flex;
  align-items: center;
}
a {
  color: #42b983;
}

.trailcontents {
  margin-bottom: 35px;
}

.trailheader {
  display: flex;
  align-items: center;

  img {
    height: 30px;
    margin-right: 10px;
  }
}

.trailnameauthor {
  display: flex;
  flex-direction: column;

  .trailauthor {
    font-weight: bold;
    font-size: 0.95em;
  }

  .trailname {
    font-size: 1.2em;
    font-weight: bold;
    color: darken(#2da6bd, 10%);
  }
}

.traildescription {
  margin: 10px 0px;
  font-size: 0.9em;
  line-height: 1.5em;
}

svg.waypoint {
  height: 30px;
  margin-right: 5px;
}

.waypointlink {
  font-size: 0.9em;
  font-weight: bold;
  line-height: 1.2em;
  color: black;

  &.router-link-active {
    color: darken(#fc0452, 5%);
  }
}

.author-name {
  font-size: 0.8em;
  margin-left: 20px;
}
</style>
