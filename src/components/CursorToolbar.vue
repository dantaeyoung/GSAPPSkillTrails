<template>
  <div>
    <div id="CursorToolbar">

      <button
        :class="{ active: cursorMode['navigate'] }"
        @click="setCursorMode('navigate')"
        alt="Navigate"
      >
        <font-awesome-icon class="icon" icon="mouse-pointer" />
      </button>

      <button
        :class="{ active: cursorMode['markasdone'] }"
        @click="setCursorMode('markasdone')"
        alt="Mark as Finished"
      >
        <font-awesome-icon class="icon" icon="check-square" />
      </button>

      <button
        :class="{ active: cursorMode['zoom'] }"
        @click="setCursorMode('zoom')"
        alt="Zoom"
      >
        <font-awesome-icon class="icon" icon="search" />
      </button>

      <button
        v-if="!isTouchDevice"
        :class="{ active: cursorMode['hiking'] }"
        @click="setCursorMode('hiking')"
        alt="Zoom"
      >
        <font-awesome-icon class="icon" icon="hiking" />
      </button>


    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faMousePointer,
  faCheckSquare,
  faSearch,
  faHiking,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";

library.add(faMousePointer);
library.add(faCheckSquare);
library.add(faSearch);
library.add(faHiking);
library.add(faExclamationTriangle);

export default {
  name: "CursorToolbar",
  data() {
    return {};
  },
  components: {
    FontAwesomeIcon
  },
  created() {},
  computed: {
    isTouchDevice() {
      return this.$store.state.isTouchDevice;
    },
    cursorMode() {
      return this.$store.state.cursorMode;
    }
  },

  methods: {
    setCursorMode(mode) {
      this.$store.commit("setCursorMode", { mode: mode });
    }
  }
};
</script>

<style scoped lang="scss">
#CursorToolbar {
  display: flex;
  flex-direction: column;
  height: 100px;
  position: absolute;
  top: 30px;
  left: 30px;
}

button {
  cursor: pointer;
  width: 40px;
  height: 40px;
  flex-shrink: 0;

  background-color: #d4dbd2;

  &.active {
    background-color: #888;
  }
  display: flex;
  align-items: center;
  justify-content: center;

  .icon {
    font-size: 2em;
  }
}

.showcoordinates {
  max-width: 400px;
  font-size: 0.6em;
  text-align: left;
  background-color: #ffffffc7;
}
</style>
