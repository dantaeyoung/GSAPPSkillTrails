<template>
  <div>
    <div id="CursorToolbar">
      <div>CursorToolbar</div>
      <button
        :class="{ active: cursorMode['navigate'] }"
        @click="setCursorMode('navigate')"
      >
        Navigate
      </button>
      <button
        :class="{ active: cursorMode['markasdone'] }"
        @click="setCursorMode('markasdone')"
      >
        MarkAsFinished
      </button>
    </div>
  </div>
</template>

<script>
/* eslint-disable */

export default {
  name: "CursorToolbar",
  data() {
    return {};
  },
  components: {},
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
#CursorToolbar {
  border: 2px solid red;
  display: flex;
  flex-direction: column;
  height: 100px;
}

button {
  background-color: #d4dbd2;

  &.active {
    background-color: #8fff8f;
  }
}

.showcoordinates {
  max-width: 400px;
  font-size: 0.6em;
  text-align: left;
  background-color: #ffffffc7;
}
</style>
