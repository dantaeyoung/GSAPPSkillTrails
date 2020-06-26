<template>
  <div class="listview">
    <div class="trail" v-for="(traildata, id) in trails" :key="id">
      <TrailContents :traildata="traildata" />

      <TrailSVGWrapper class="wrapper" :traildata="traildata">
        <Trail :traildata="traildata" :zoomscale="1" disableclick="true" />
      </TrailSVGWrapper>
    </div>
  </div>
</template>

<script>
/* eslint-disable */

import TrailContents from "@/components/TrailContents.vue";
import TrailSVGWrapper from "@/components/TrailSVGWrapper.vue";
import Trail from "@/components/Trail.vue";

import { slug } from "@/mixins/slug.js";

export default {
  name: "ListView",
  mixins: [slug],
  data() {
    return {};
  },
  components: {
    TrailContents,
    Trail,
    TrailSVGWrapper
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

.trail {
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
}
.listview {
  text-align: left;
  margin-left: 100px;
  padding: 30px 0px;
  width: 70vw;
  max-width: 600px;
}

.wrapper {
    position: absolute;
    right: 0px;
    pointer-events: none !important;
    mix-blend-mode: darken;

    & .gtrail {
      opacity: 0.3;

      &.myWaypointBeingViewed {
        opacity: 0.6;
      }
    }
}


</style>
