<template>
  <div>
    <div id="CursorToolbar">

    <!-- <ToolbarButton mode="hand" alt="Hand Tool" icon="hand&#45;paper" /> -->
    <ToolbarButton mode="navigate" alt="Navigate" icon="mouse-pointer" />
    <ToolbarButton mode="markasdone" alt="Mark as done" icon="check-square" />
    <ToolbarButton mode="zoomin" alt="Zoom In" icon="search-plus" />
    <ToolbarButton mode="zoomout" alt="Zoom Out" icon="search-minus" />
    <ToolbarButton v-if="!isTouchDevice" mode="hiking" alt="Hiking mode (coming soon)" icon="hiking" />

    </div>
  </div>
</template>

<script>
/* eslint-disable */
import ToolbarButton from "@/components/ToolbarButton.vue";

export default {
  name: "CursorToolbar",
  data() {
    return {};
  },
  components: {
    ToolbarButton,
  },
  created() {},
  computed: {
    isTouchDevice() {
      return this.$store.state.isTouchDevice;
    },
  },

  methods: {
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

</style>
