<template>
  <div class="graphbackground" :style="widthheightstyle">
    <svg height="100%" width="100%">
      <circle
        class="radiusCircle"
        v-for="cr in circleRadiuses"
        :key="cr"
        :cx="sidelength / 2"
        :cy="sidelength / 2"
        :r="cr"
      />
    </svg>
    <!--<img src="http://discovery.urlibraries.org/wordpress/wp-content/uploads/2014/11/topo-chunk.jpg"> -->
    <!--      <ContourMap /> -->
    <!--      <iframe class="graphcommons" src="https://graphcommons.com/graphs/79a352f7-b77a-4395-ae02-63c59251aaf6/embed?topbar=false&fitgraph=true" frameborder="0" style="overflow:hidden;" width="100%" height="100%" allowfullscreen></iframe> -->
    <!--<img src="https://i.imgur.com/mCcxGUH.jpg">  -->
  </div>
</template>

<script>
/* eslint-disable */

import ContourMap from "@/components/ContourMap.vue";

export default {
  name: "GraphBackground",
  data() {
    return {};
  },
  props: ["leafdata"],
  components: {
    ContourMap
  },
  created() {},
  computed: {
    sidelength() {
      return this.$store.state.sidelength;
    },
    widthheightstyle() {
      return `width: ${this.sidelength}px; height: ${this.sidelength}px;`;
    },
    circleRadiuses() {
      var res = [];
      for(let x = 1; x < 5; x++) {
        res.push(x * 200);
      }
      return res;
    }
  },
  methods: {}
};
</script>

<style scoped lang="scss">
.graphbackground {
  position: absolute;
  z-index: -100;
  top: 0px;
  left: 0px;

  background: rgb(33, 236, 241);
  background: radial-gradient(
    circle,
    rgba(33, 236, 241, 0.7007003484987745) 0%,
    rgba(255, 2, 2, 0) 6%
  );

  /*background: rgb(231,231,231);*/
  /*background: radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 42%, rgba(206,148,233,0) 63%); */

  pointer-events: none;
}

iframe.graphcommons {
  width: 90%;
  height: 90%;
  top: 5%;
  left: 5%;
  position: absolute;
  opacity: 0.5;
}

.radiusCircle {
  stroke: #999;
  stroke-width: 2;
  stroke-dasharray: 0.1%, 0.3%;
  stroke-linecap: round;
  fill: none;
}
</style>
