<template>
  <div class="comingsoon">
    <img class="svglogo" src="@/assets/logo.svg" alt="GSAPP SKILL TRAILS" />
    <h2>coming soon!</h2>

  </div>
</template>

<script>
export default {
  name: "ComingSoon",
  components: {},
  computed: {
  },
  methods: {
  }
};
</script>
<style scoped lang="scss">
  .comingsoon {
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100vw;
    z-index: 10000;
    display: flex;
    height: 100vh;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #ddd;
  }

  img {
  }
</style>

