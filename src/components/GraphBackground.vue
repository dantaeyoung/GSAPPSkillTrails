<template>
  <div class="graphbackground" :style="widthheightstyle">
    <!--<img src="http://discovery.urlibraries.org/wordpress/wp-content/uploads/2014/11/topo-chunk.jpg"> --> --> --> -->
      <!--      <ContourMap /> -->
      <!--      <iframe class="graphcommons" src="https://graphcommons.com/graphs/79a352f7-b77a-4395-ae02-63c59251aaf6/embed?topbar=false&fitgraph=true" frameborder="0" style="overflow:hidden;" width="100%" height="100%" allowfullscreen></iframe> -->
      <!--<img src="https://i.imgur.com/mCcxGUH.jpg">  -->
  </div>
</template>

<script>
/* eslint-disable */

import ContourMap from "@/components/ContourMap.vue";

export default {
  name: 'GraphBackground',
  data() {
    return {
    };
  },
  props: ['leafdata'],
  components: {
    ContourMap,
  },
  created() {
  },
  computed: {
    sidelength() {
      return this.$store.state.sidelength;
    },
    widthheightstyle() {
      return `width: ${this.sidelength}px; height: ${this.sidelength}px;`;
    }
  },
  methods: {
  }
}
</script>

<style scoped lang="scss">


.graphbackground {
  position: absolute;
  z-index: -100;
  top: 0px;
  left: 0px;
  border: 5px solid red;

  background: rgb(238,174,202);
  background: radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 42%, rgba(206,148,233,0) 63%); 

  pointer-events: none;
}
iframe.graphcommons {
width: 90%;
height: 90%;
top: 5%;
left: 5%;
position: absolute;
opacity: 0.5
}


</style>
