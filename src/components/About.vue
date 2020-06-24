<template>
  <div class="about">
    <h1>This is an about page</h1>

    <router-link to="/about">|About</router-link>
    <router-link to="/forcegraph">|ForceGraph</router-link>
            def<router-view></router-view>
            abc
  </div>
</template>

<script>
module.exports = {
  components: {},
  computed: {
    //        ...Vuex.mapState(["works"])
  },
  methods: {
  }
};
</script>
<style scoped></style>
