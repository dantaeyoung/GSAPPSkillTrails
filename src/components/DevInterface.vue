<template>
  <div>
    <div id="DevInterface" draggable="true"  ondragstart="drag(event)">
      <div>DevInterface</div>
      <button @click="toggleDraggable2">draggable: {{ waypointsDraggable }}</button>
      <button @click="showCoordinates = !showCoordinates">
        toggle coordinate dialog
      </button>
    </div>
    <div class="showcoordinates" v-if="showCoordinates">
      <button @click="tableclip()">copy table{{copytablestatus}}</button>
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

import PlainDraggable from "plain-draggable";
import copy from "copy-to-clipboard";

export default {
  name: "DevInterface",
  data() {
    return {
      isDraggable: false,
      draggablelist: null,
      showCoordinates: false,
      copytablestatus: "",
    };
  },
  components: {},
  created() {
    console.log(this.$route.params);
  },
  computed: {
    waypoints() {
      return this.$store.state.waypoints;
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
    drag(e) {
      console.log(e);
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
      setTimeout(function() { self.copytablestatus = ""; }, 1000);
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
    toggleDraggable2() {
      this.$store.commit('setWaypointsDraggable', !this.waypointsDraggable)
    },
    toggleDraggable() {
      var self = this;

      self.isDraggable = !self.isDraggable;
      if (self.isDraggable) {
        if (self.draggablelist == null) {
          self.draggablelist = Array.from(
            document.getElementsByClassName("dragcandidate") //waypoints
          ).map(elem => {
            var self = this;
            var pd = new PlainDraggable(document.getElementById(elem.id));
            pd.onDragEnd = function(pos) {
              self.$forceUpdate();
              //              this.$store.commit("setWaypointCoordinates", { waypointid: ( waypointid, x, y) {
            };
            return pd;
          });
        } else {
          self.draggablelist.forEach(function(dl) {
            dl.disabled = false;
          });
        }
      } else {
        // draggable false
        self.draggablelist.forEach(function(dl) {
          dl.disabled = true;
        });
      }
    }
  }
};
</script>

<style lang="scss">

button {
  background-color: #8fffff;
}
#DevInterface {
  border: 2px solid pink;
  display: flex;
  flex-direction: column;
  height: 100px;
}

@keyframes blink-stroke {
  50% {
    stroke: #ff0000;
  }
}

.waypoint.plain-draggable .polygonBorder {
  stroke-width: 10;
  stroke-dasharray: 4;
  animation: blink-stroke 0.5s step-end infinite alternate;
}

.showcoordinates {
  max-width: 400px;
  font-size: 0.6em;
  text-align: left;
  background-color: #ffffffc7;
}
</style>
