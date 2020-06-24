<template>
  <div>
    <h2>CONTOUR MAPPP</h2>
    <button @click="data = dataFromWaypoints">swapdata</button>
    {{ wee }}
    {{ contourList }}
  </div>
</template>

<script>
/* eslint-disable */

//import Conrec from "@/scripts/conrec.js";

// FIGURE OUT HOW TO IMPOT

export default {
  name: "ContourMap",
  components: {},
  data() {
    return {
      contours: null,
      contourList: null,
      wee: null,
    };
  },
  props: {},
  created() {
    this.initData();
  },
  computed: {
    waypoints() {
      return this.$store.state.waypoints;
    },
    dataFromWaypoints() {
      var newdata = {};
      newdata.x = Object.values(this.waypoints).map(wp => {
        return wp.fields.coordinateX / 100;
      });
      newdata.y = Object.values(this.waypoints).map(wp => {
        return wp.fields.coordinateY / 100;
      });
      newdata.z = Object.values(this.waypoints).map(wp => {
        return 3;
      });
      newdata.type = "contour";
      return newdata;
    }
  },
  methods: {
    initData() {
      var data = [
        [0, 1, 0],
        [1, 2, 1],
        [0, 1, 0]
      ];
      var c = new Conrec.Conrec();
      c.contour(data, 0, 2, 0, 2, [1, 2, 3], [1, 2, 3], 3, [0, 1, 2]);
      console.log(c.contours);
      this.wee = c.contours;
      //      this.contourList = c.contourList()
      // c.contours will now contain vectors in the form of doubly-linked lists.
      // c.contourList() will return an array of vectors in the form of arrays.

    }
  }
};
</script>

<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
</style>
