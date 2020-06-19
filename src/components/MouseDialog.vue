<template>
  <div id="MouseDialog" :style="positionStyle">
    <div class="trailName" v-for="tid in hoveringTrails" v-bind:key="tid">
      {{ trails[tid].fields.Name }}
    </div>
  </div>
</template>

<script>
export default {
  name: "MouseDialog",
  data() {
    return {
      posX: 0,
      posY: 0
    };
  },
  props: ["mouseeventid"],
  components: {},
  mounted() {
    this.initMouseListener();
  },
  computed: {
    hoveringTrails() {
      return this.$store.state.hoveringTrails
    },
    trails() {
      return this.$store.state.trails
    },
    positionStyle() {
      return `position: absolute; 
      top: ${this.posY}px; 
      left: ${this.posX}px;`;
    },
  },
  methods: {
    initMouseListener() {
      var self = this;
      document
        .getElementById(self.mouseeventid)
        .addEventListener("mousemove", function(e) {
          self.posX = e.pageX;
          self.posY = e.pageY;
        });
    }
  }
};
</script>

<style scoped lang="scss">
#MouseDialog {
  margin: 10px;
  z-index: 100;
  text-align: left;
  pointer-events: none;
}

.trailName {
  display: inline;
  background-color: blue;
  color: white;
  font-weight: bold;
  padding: 5px 10px;
}
</style>
