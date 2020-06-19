<template>
  <div>
    <div id="DevInterface">
      <div>DevInterface</div>
      <button @click="toggleDraggable">draggable: {{ isDraggable }}</button>
      <button @click="showCoordinates = !showCoordinates">
        toggle coordinate dialog
      </button>
    </div>
    <div v-if="showCoordinates">
      <div v-for="wp in urlsortedWaypoints" :key="wp.id">
        {{ wp.fields.URL}}
        {{ wp.fields.coordinateX }}
        {{ wp.fields.coordinateY }}
        {{ lookupTransform(wp.id) }}
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
 /* PUT ALL THE HACKY STUFF IN EHRE */


import PlainDraggable from "plain-draggable";

export default {
  name: "DevInterface",
  data() {
    return {
      isDraggable: false,
      draggablelist: null,
      showCoordinates: false
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
    urlsortedWaypoints() {
      return Object.values(this.waypoints).sort((a, b) => {
        a.fields.URL.localeCompare(b.fields.URL)
      });
    }
  },
  methods: {
    lookupTransform(id) {

      // this occasionally gets a bug because transform doesn't exist before draggable is triggedred. handle that. TODO
      let thistransform = document.getElementById("waypoint-" + id).style.transform;
      console.log(thistransform);
      return thistransform;
      let r = new RegExp(/translate\(([-\d\.]+)px,\s*([-\d\.]+)/);

      
      let ttm = thistransform.match(r);
      if(ttm !== null && ttm.length >= 3) {
        return { x: ttm[1], y: ttm[2] };
      } else {
        return null;
      }
    },
    toggleDraggable() {
      var self = this;

      self.isDraggable = !self.isDraggable;
      if (self.isDraggable) {
        if (self.draggablelist == null) {
          self.draggablelist = Array.from(
            document.getElementsByClassName("dragcandidate") //waypoints
          ).map(elem => {
            return new PlainDraggable(document.getElementById(elem.id));
          });

          window.dl = self.draggablelist;
          console.log(self.draggablelist);
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
</style>
