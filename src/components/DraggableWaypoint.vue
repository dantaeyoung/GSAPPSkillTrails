<template>
  <div
    class="draggablewaypoint"
    @click="onClick"
    :style="positionStyle"
    :class="{ isDraggable: waypointsDraggable, isBeingDragged: isBeingDragged }"
  >
    <WaypointIcon
      :key="id"
      :waypointdata="waypointdata"
      :zoomscale="zoomscale"
      :id="id"
      class="panzoom-exclude"
    />
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
      shiftDown: false,
      mouseX: 0,
      mouseY: 0
    };
  },
  components: {
    WaypointIcon
  },
  props: ["waypointdata", "zoomscale", "id"],
  mounted() {
    var self = this;
    this.initShiftDetect();
    this.$parent.$on("endDragging", function() {
      self.endDragging();
    });
  },
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
        x: this.waypointdata.fields.coordinateX + this.dragCoords.x ,
        y: this.waypointdata.fields.coordinateY + this.dragCoords.y
      };
    }
  },
  methods: {
    initShiftDetect() {
      var self = this;
      window.addEventListener("keydown", event => {
        self.shiftDown = event.shiftKey;
      });
      window.addEventListener("keyup", event => {
        self.shiftDown = event.shiftKey;
        this.startCoords.x = this.mouseX;
        this.startCoords.y = this.mouseY;
      });
    },
    onClick(event) {
      if (this.waypointsDraggable) {
        if (this.isBeingDragged == false) {
          this.startDragging(event);
        } else {
          this.endDragging();
          this.$parent.$emit("endDragging");
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
      this.mouseX = event.pageX;
      this.mouseY = event.pageY;
      if (!this.isBeingDragged || event.shiftKey) {
        return;
      }
      if (this.isBeingDragged) {
        this.dragCoords = {
          x: (event.pageX - this.startCoords.x) / this.zoomscale,
          y: (event.pageY - this.startCoords.y) / this.zoomscale
        };
      }
    },
    endDragging(e) {
      if (this.isBeingDragged) {
        this.parentListenerElement.removeEventListener(
          "mousemove",
          self.mouseMove
        );
        this.$store.commit("setWaypointCoordinates", {
          waypointid: this.waypointdata.id,
          x: this.currentPosition.x,
          y: this.currentPosition.y
        });
        this.isBeingDragged = false;
        this.dragCoords = { x: 0, y: 0 };
      }
    }
  }
};
</script>

<style lang="scss">
.draggablewaypoint {
  width: 100px;
  height: 100px;
  margin-left: -50px;
  margin-top: -50px;
  pointer-events: none;
}

@keyframes blink-stroke {
  50% {
    stroke: #ff0000;
  }
}

.isDraggable.isBeingDragged .polygonBorder {
  animation: blink-stroke 0.25s step-end infinite alternate;
}

.isDraggable .polygonBorder {
  stroke-width: 10;
  stroke-dasharray: 4;
}
</style>
