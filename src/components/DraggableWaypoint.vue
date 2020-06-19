<template>
  <div
    class="draggablewaypoint"
    @click="onClick"
    @mouseout="mouseOut"
      :style="positionStyle"
  >
        <WaypointIcon
          :key="id"
          :waypointdata="waypointdata"
          :zoomscale="zoomscale"
          :id="id"
          :isBeingDragged="isBeingDragged"
          class="panzoom-exclude" />
  </div>
</template>

<script>
/* eslint-disable */


import WaypointIcon from "@/components/WaypointIcon.vue";

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
    WaypointIcon,
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
      if (this.waypointsDraggable) {
        if(this.isBeingDragged == false) {
          this.startDragging(event);
        } else {
          this.endDragging();
        }
      }
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
    mouseOut(e) {
      if (this.isBeingDragged) {
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
  width: 100px;
  height: 100px;
  margin-left: -50px;
  margin-top: -50px;
  cursor: pointer;
}
</style>
