<template>
  <div class="graphbackground" :style="widthheightstyle">
  </div>
</template>

<script>
/* eslint-disable */

export default {
  name: 'GraphBackground',
  data() {
    return {
    };
  },
  props: ['leafdata'],
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

$dimpx: 1500px;

.graphbackground {
  position: absolute;
  z-index: -100;
  top: 0px;
  left: 0px;
  width: $dimpx;
  height: $dimpx;
  /*margin-left: calc(#{$dimpx} / -2);*/
  /*margin-top: calc(#{$dimpx} / -2);*/
  border: 5px solid red;

  background: rgb(238,174,202);
  background: radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 42%, rgba(206,148,233,0) 63%); 
}

</style>
