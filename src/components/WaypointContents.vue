<template>
  <div class="waypointcontents" v-if="isLoadedWaypoints">
    <div class="title">
      <img class="waypointicon" src="@/assets/waypoint-icon.svg" />
      {{ waypointdata.fields.Name }}
    </div>
    <div class="author" v-if="waypointdata.fields['Author Name']">
      By <span class="name"> {{ waypointdata.fields["Author Name"] }}</span>
    </div>
    <div class="description">{{ waypointdata.fields.Description }}</div>

    <div class="link">
      <div class="linkto skew">Link:</div>
      <a :href="waypointdata.fields.URL" target="_blank">{{
        waypointdata.fields.URL
      }}</a>
    </div>
    <!--  -->
    <VideoEmbed :url="waypointdata.fields.URL" />

    <div class="coverimage" v-if="coverImageThumbnail">
      <img :src="coverImageThumbnail" />
    </div>

    <div
      class="trailsPartOf"
      v-if="
        'Trails' in waypointdata.fields &&
          waypointdata.fields.Trails.length > 0
      "
    >
      <div class="partof skew">
        In trails:
      </div>
      <div class="trails" v-if="isLoadedTrails">
        <div
          class="trail"
          v-for="tid in waypointdata.fields.Trails"
          :key="tid"
        >
          <img class="trailicon" src="@/assets/trail-icon.svg" />

        <router-link
          :to="{
            name: routeName,
            params: {
              wportrail: 'trail',
              id: tid,
              slug: convertToSlug(trails[tid].fields.Name)
            }
          }"
        >

          {{ trails[tid].fields.Name }}

          </router-link>


        </div>
      </div>
    </div>
    <!--     <iframe :src="waypointdata.fields.URL" />  -->

    <div class="softwarestopics">
      <div class="softwares" v-if="waypointdata.fields.Softwares">
        <div class="label skew">Softwares:</div>
        <div
          class="software"
          v-for="s in waypointdata.fields.Softwares"
          :key="s"
        >
          {{ softwares[s].fields.Name }}
        </div>
      </div>
      <div class="topics" v-if="waypointdata.fields.Topics">
        <div class="label skew">Topics:</div>
        <div
          class="topic"
          v-for="t in waypointdata.fields.Topics"
          :key="t"
        >
          {{ topics[t].fields.Name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */

import VideoEmbed from "@/components/VideoEmbed.vue";

import { mapState } from "vuex";
import { slug } from "@/mixins/slug.js";

export default {
  name: "WaypointContents",
  components: {
    VideoEmbed
  },
  mixins: [slug],
  props: ["waypointdata"],
  mounted() {
    var self = this;
  },
  computed: {
    ...mapState(["waypoints", "trails", "softwares", "topics", "texts"]),
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
.vwFrame {
  position: relative;
  overflow-x: hidden;
}

.vwContent {
  position: fixed;

  width: 360px;
  /*height: 80vh;*/
  padding: 20px;
  text-align: left;

  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  background-color: white;

  transition: all 0.4s ease-in-out;

  right: -100px;
  .isViewing & {
    right: 0px;
  }
}

.skew {
  text-transform: uppercase;
  transform: rotate(-25deg) skew(-25deg);
  font-weight: bold;
  line-height: 1em;
}

.title {
  display: flex;
  flex-direction: row;
  align-items: center;

  .waypointicon {
    height: 20px;
    margin-right: 5px;
  }
  font-size: 1.2em;
  font-weight: bold;
  width: 80%;
  color: darken(#fc0452, 5%);
  margin-bottom: 5px;
}

.coverimage img {
  width: 100%;
  height: auto;
}

.trailsPartOf {
  display: flex;
  align-items: center;
  margin: 15px 0px;

  .partof {
    font-size: 0.8em;
    margin-right: 5px;
  }

  .trail {
    display: flex;
    align-items: center;
    font-size: 0.95em;
    color: #2da6bd;
    font-weight: bold;
    padding: 3px 5px;
    border-radius: 8px;

    a {
      color: #2da6bd;
    }

    .trailicon {
      height: 15px;
      margin-right: 5px;
    }
  }
}
.author {
  font-size: 0.9em;
  font-weight: bold;

  .name {
    text-style: italic;
  }
  margin-bottom: 15px;
}

.description {
  font-size: 0.85em;
  margin-top: 15px;
  line-height: 1.5em;
}

.link {
  font-size: 0.9em;
  margin: 20px 0px;
  display: flex;
  align-items: center;
  line-height: 1em;

  .linkto {
    margin-right: 5px;
  }

  a {
    color: darken(#fc0452, 10%);
    font-size: 0.8em;
    font-weight: bold;
    display: inline-block;
  }
}

iframe {
  flex-grow: 1;
  max-width: 100% !important;
  width: auto !important;
  height: auto !important;
  border: none;
}

.softwarestopics {
  font-size: 0.8em;
}

.softwares,
.topics {
  display: flex;
  flex-direction: row;
  align-items: center;

  & .label {
    font-size: 0.9em;
  }
}

.software,
.topic {
  display: inline-block;
  font-weight: bold;
  background-color: lighten(#fc0452, 30%);
  padding: 0px 3px;
  border-radius: 2px;
  margin-right: 5px;
  margin-top: 5px;
  font-size: 0.9em;
}
</style>
