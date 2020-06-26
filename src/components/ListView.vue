<template>
    <div class="listview">
      <div v-for="(traildata, id) in trails" :key="id">
      <TrailContents :traildata="traildata" />

      <TrailSVGWrapper :traildata="traildata">
          <Trail
            :traildata="traildata"
            :zoomscale="1"
          />
      </TrailSVGWrapper>
    </div>


    </div>
</template>

<script>
/* eslint-disable */

import TrailContents from "@/components/TrailContents.vue";
import TrailSVGWrapper from "@/components/TrailSVGWrapper.vue";
import Trail from "@/components/Trail.vue";

import { slug } from '@/mixins/slug.js';

export default {
  name: "ListView",
  mixins: [slug],
  data() {
    return {};
  },
  components: {
    TrailContents, 
    Trail,
    TrailSVGWrapper,
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
  padding: 30px 0px;
  width: 70vw;
  max-width: 600px;
}

</style>
