<template>
  <div class="vtFrame" >
     <TrailContents :traildata="traildata" />
  </div>
</template>

<script>
/* eslint-disable */

import { mapState } from "vuex";
import TrailContents from "@/components/TrailContents.vue";

export default {
  name: "ViewTrail",
  components: {
    TrailContents,
  },
  mounted() {
    var self = this;
  },
  computed: {
    isLoadedTrails() {
      return this.trails.length > 0
    },
    thisid() {
      return this.$route.params.trid;
    },
    ...mapState(["waypoints", "trails", "softwares", "topics", "texts"]),
    traildata() {
      return this.trails[this.thisid];
    },
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

.softwares, .topics {
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
