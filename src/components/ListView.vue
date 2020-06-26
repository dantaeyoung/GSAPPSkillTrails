<template>
    <div class="listview">
      <TrailContents v-for="(traildata, id) in trails" :key="id" :traildata="traildata" />
    </div>
</template>

<script>
/* eslint-disable */

import TrailContents from "@/components/TrailContents.vue";

import { slug } from '@/mixins/slug.js';

export default {
  name: "ListView",
  mixins: [slug],
  data() {
    return {};
  },
  components: {
    TrailContents
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
