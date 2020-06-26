<template>
  <div class="waypointcontents" v-if="isLoadedWaypoints">
    <div class="header">
      <WaypointIcon
        class="waypointicon"
        :waypointdata="waypointdata"
        hidetext="true"
        disableclick="true"
      />

      <div class="titleauthor">
        <div class="title">
          {{ waypointdata.fields.Name }}
        </div>
        <div class="author" v-if="waypointdata.fields['Author Name']">
          By <span class="name"> {{ waypointdata.fields["Author Name"] }}</span>
        </div>
      </div>
    </div>

    <div
      class="trailsPartOf"
      v-if="
        'Trails' in waypointdata.fields && waypointdata.fields.Trails.length > 0
      "
    >
      <div class="trails" v-if="isLoadedTrails">
        <div class="trail" v-for="tid in waypointdata.fields.Trails" :key="tid">
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
    <div class="description">{{ waypointdata.fields.Description }}</div>

    <div class="link">
      <a :href="waypointdata.fields.URL" target="_blank">{{
        waypointdata.fields.URL
      }}</a>
    </div>
    <!--  -->
    <VideoEmbed :url="waypointdata.fields.URL" />

    <div class="coverimage" v-if="coverImageThumbnail">
      <img :src="coverImageThumbnail" />
    </div>

    <!--     <iframe :src="waypointdata.fields.URL" />  -->

    <div class="markasdone" :class="{ isdone: isWaypointDone }">
      <div class="checkicon">
      <img
        src="@/assets/check-icon.svg"
        @click="toggleWaypointDone"
      />
      </div>
      <div class="wpisdone" v-if="isWaypointDone">Done!!</div>
      <div class="wpisdone" v-if="!isWaypointDone">
        Mark this Waypoint as done
      </div>
    </div>

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
        <div class="topic" v-for="t in waypointdata.fields.Topics" :key="t">
          {{ topics[t].fields.Name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */

import VideoEmbed from "@/components/VideoEmbed.vue";
import WaypointIcon from "@/components/WaypointIcon.vue";

import { mapState } from "vuex";
import { slug } from "@/mixins/slug.js";

export default {
  name: "WaypointContents",
  components: {
    VideoEmbed,
    WaypointIcon
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
      return this.waypointdata.id;
    },
    isWaypointDone() {
      return this.$store.state.waypointsMarkedDone.includes(this.thisid);
    },
    coverImageThumbnail() {
      try {
        return this.waypointdata.fields["Cover Image"][0]["url"];
        // return this.waypointdata.fields["Cover Image"][0]["thumbnails"]["large"]["url"];
      } catch (e) {
        return null;
      }
    }
  },
  methods: {
    toggleWaypointDone() {
      this.$store.dispatch("toggleWaypointDone", { id: this.thisid });
    }
  }
};
</script>

<style scoped lang="scss">

@import '@/mixins/variables.scss';


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

.header {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.waypointicon {
  max-width: 60px;
  margin-right: 10px;
}

.title {
  font-size: 1.1em;
  font-weight: bold;
  width: 100%;
  color: darken($waypointcolor, 5%);
  margin-bottom: 5px;
}

.coverimage img {
  width: 100%;
  height: auto;
}

.trailsPartOf {
  display: flex;
  text-align: right;
  align-items: center;
  margin-top: 5px ;

  .partof {
    font-size: 0.8em;
    margin-right: 5px;
  }

  .trail {
    display: flex;
    align-items: center;
    font-size: 0.9em;
    color: $trailcolor;
    font-weight: bold;
    padding: 1px 3px;
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
  line-height: 1.2em;

  .linkto {
    margin-right: 5px;
  }

  a {
    background-color: darken($waypointcolor, 0%);
    font-size: 0.9em;
    font-weight: bold;
    display: inline-block;
    color: white;
    padding: 6px 10px;
    border-radius: 8px;
  }
}

iframe {
  flex-grow: 1;
  max-width: 100% !important;
  width: auto !important;
  height: auto !important;
  border: none;
}

.markasdone {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
}

  .wpisdone {
    margin-left: 10px;
    font-weight: bold;
    font-size: 0.9em;

  }


.checkicon {
  background-color: lighten($donecolor, 30%);
  height: 20px;
  width: 20px;
  padding: 5px;
  border-radius: 3px;
  .isdone & {
  background-color: lighten($donecolor, 0%);
  }
}

.checkicon img {
  opacity: 0.25;

  &:hover {
    opacity: 0.6 !important;
  }

  .isdone & {
    opacity: 1;
  }
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
    width: 80px;
    text-align: right;
    background-color: #ddd;
    padding: 3px 5px;
    border-radius: 5px;
  }
}

.topics {
  margin-bottom: 50px;
}

.software,
.topic {
  display: inline-block;
  font-weight: bold;
  color: lighten($waypointcolor, 20%);
  padding: 0px 3px;
  border-radius: 2px;
  margin-right: 5px;
  margin-top: 5px;
  font-size: 0.9em;
}
</style>
