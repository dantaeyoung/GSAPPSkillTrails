<template>
  <div
    class="draggablewaypoint"
    @click="onClick"
  >
        <Waypoint
          :key="id"
          :waypointdata="waypointdata"
          :zoomscale="zoomscale"
          :id="id"
          class="panzoom-exclude" />
    YO
  </div>
</template>

<script>
/* eslint-disable */


import Waypoint from "@/components/Waypoint.vue";

export default {
  name: "DraggableWaypoint",
  data() {
    return {
      location: null,
      isBeingDragged: false,
      startCoords: { x: 0, y: 0 },
      dragCoords: { x: 0, y: 0 },
      parentListenerElement: null,
    };
  },
  components: {
    Waypoint,
  },
  props: ["waypointdata", "zoomscale", "id"],
  computed: {
    waypointsDraggable() {
      return this.$store.state.waypointsDraggable;
    },
    sidelength() {
      return this.$store.state.sidelength;
    },
    positionStyle() {
      return `position: absolute; 
      top: ${this.currentPosition.y}px; 
      left: ${this.currentPosition.x}px;`;
    },
    currentPosition() {
      return { 
        x: this.waypointdata.fields.coordinateX + this.dragCoords.x,
        y: this.waypointdata.fields.coordinateY + this.dragCoords.y,
      }
    }
  },
  methods: {
    onClick(event) {
      if (!this.waypointsDraggable) {
        //    this.onClickViewWaypoint();
      } else {
        if(this.isBeingDragged == false) {
          this.startDragging(event);
        } else {
          this.endDragging();
        }
      }
    },
    onClickViewWaypoint() {
      var self = this;
      console.log("going to", self.waypointdata.id);
      self.$router.push({
        name: "ViewWaypoint",
        params: { waypointdata: self.waypointdata, id: self.waypointdata.id }
      });
    },
    startDragging(event) {
      var self = this;
      this.parentListenerElement = event.currentTarget.parentElement;
      this.parentListenerElement.addEventListener("mousemove", self.mouseMove);
      this.isBeingDragged = true;
      this.startCoords = { x: event.pageX, y: event.pageY };
    },
    mouseMove(event) {
      if (!this.isBeingDragged) {
        return;
      }
      event.stopPropagation();
      if (this.isBeingDragged) {
        this.dragCoords = {
          x: (event.pageX - this.startCoords.x) / this.zoomscale,
          y: (event.pageY - this.startCoords.y) / this.zoomscale
        };
      }
    },
    endDragging(e) {
      this.parentListenerElement.removeEventListener('mousemove', self.mouseMove);
      this.$store.commit('setWaypointCoordinates', {
        waypointid: this.waypointdata.id,
        x: this.currentPosition.x,
        y: this.currentPosition.y
      });
      this.isBeingDragged = false;
      this.dragCoords = { x: 0, y: 0 };
    },
  }
};
</script>

<style scoped lang="scss">
.draggablewaypoint {
  width: 0px;
  height: 0px;
}
</style>
