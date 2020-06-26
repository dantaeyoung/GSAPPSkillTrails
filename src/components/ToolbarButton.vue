<template>
  <div class="toolbarButton">
    <button
      :class="{ active: cursorMode[mode] }"
      @click="setCursorMode(mode)"
      :alt="alt"
      @mouseover="hover = true"
      @mouseleave="hover = false"
    >
      <font-awesome-icon class="icon" :icon="icon" />
    </button>
    <div class="explanation" v-if="hover">{{ alt }}</div>
  </div>
</template>

<script>
/* eslint-disable */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faHandPaper,
  faMousePointer,
  faCheckSquare,
  faSearch,
  faHiking,
  faExclamationTriangle
} from "@fortawesome/free-solid-svg-icons";

library.add(  faHandPaper,
  faMousePointer,
  faCheckSquare,
  faSearch,
  faHiking,
  faExclamationTriangle);

export default {
  name: "ToolbarButton",
  data() {
    return {
      hover: false
    };
  },
  props: ["mode", "icon", "alt"],
  components: {
    FontAwesomeIcon
  },
  created() {},
  computed: {
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

.toolbarButton {
  display: flex;
  flex-direction: row;
  align-items: center;
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


.explanation {
  margin-left: 10px;
  font-weight: bold;
  background-color: white;
  padding: 3px 5px;
  border-radius: 5px;
}
</style>
