<template>
  <div>
    <div id="DevInterface">
      <div>DevInterface</div>
      <button @click="toggleDraggable">
        draggable: {{ waypointsDraggable }}
      </button>
      <button @click="showCoordinates = !showCoordinates">
        toggle coordinate dialog
      </button>
      <button @click="toggleFilter">filter: {{ isFiltered }}</button>
    </div>
    <div class="showcoordinates" v-if="showCoordinates">
      <button @click="tableclip()">copy table{{ copytablestatus }}</button>
      <table style="width:100%" id="coordinatestable">
        <tr v-for="wp in urlsortedWaypoints" :key="wp.id">
          <th>{{ wp.fields.URL }}</th>
          <th>
            {{
              coordinateDetransform(
                wp.fields.coordinateX + lookupTransform(wp.id).x
              )
            }}
          </th>
          <th>
            {{
              coordinateDetransform(
                wp.fields.coordinateY + lookupTransform(wp.id).y
              )
            }}
          </th>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
/* PUT ALL THE HACKY STUFF IN EHRE */

import copy from "copy-to-clipboard";

export default {
  name: "DevInterface",
  data() {
    return {
      draggablelist: null,
      showCoordinates: false,
      copytablestatus: "",
      isFiltered:true,  
    };
  },
  components: {},
  created() {
    console.log(this.$route.params);
  },
  computed: {
    waypoints() {
      return this.$store.getters.waypoints;
    },
    waypointsDraggable() {
      return this.$store.state.waypointsDraggable;
    },
    sidelength() {
      return this.$store.state.sidelength;
    },
    urlsortedWaypoints() {
      return Object.values(this.waypoints).sort((a, b) => {
        return ("" + a.fields.URL).localeCompare(b.fields.URL);
      });
    }
  },

  methods: {
    toggleFilter() {
      this.isFiltered = !this.isFiltered;
      if (this.isFiltered) {
        this.$store.dispatch("filterTrailsAndWaypoints", {
          trailStatusesToShow: ["Published"],
          waypointStatusesToShow: ["Published"]
        });
      } else {
        this.$store.dispatch("filterTrailsAndWaypoints", {
          trailStatusesToShow: ["Published", "Draft"],
          waypointStatusesToShow: ["Published", "Draft"]
        });
      }
    },
    coordinateDetransform(pxval) {
      let val = (pxval * 2) / this.sidelength - 1;
      return +val.toFixed(3);
    },
    tableclip() {
      var self = this;
      this.$forceUpdate();
      copy(document.getElementById("coordinatestable").innerText);
      this.copytablestatus = " : copied!";
      setTimeout(function() {
        self.copytablestatus = "";
      }, 1000);
    },
    lookupTransform(id) {
      let thistransform = document.getElementById("waypoint-" + id).style
        .transform;
      thistransform = thistransform ? thistransform : "";
      let r = new RegExp(/translate\(([-\d\.]+)px,\s*([-\d\.]+)/);
      let ttm = thistransform.match(r);
      if (ttm !== null && ttm.length >= 3) {
        return { x: parseFloat(ttm[1]), y: parseFloat(ttm[2]) };
      } else {
        return { x: 0, y: 0 };
      }
    },
    toggleDraggable() {
      this.$store.commit("setWaypointsDraggable", !this.waypointsDraggable);
    }
  }
};
</script>

<style scoped lang="scss">
#DevInterface {
  border: 2px solid pink;
  display: flex;
  flex-direction: column;
  height: 100px;
  position: absolute;
  bottom: 30px;
  left: 30px;
}
button {
  background-color: #8fffff;
}

.showcoordinates {
  max-width: 400px;
  font-size: 0.6em;
  text-align: left;
  background-color: #ffffffc7;
}
</style>
