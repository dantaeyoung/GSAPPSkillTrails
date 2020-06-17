<template>
  <div class="about">
    <h1>This is an about page</h1>

    <button @click="increment()">increment</button>

    <router-link to="/about">|About</router-link>
    <router-link to="/forcegraph">|ForceGraph</router-link>
  </div>
</template>

<script>
module.exports = {
  components: {},
  computed: {
    //        ...Vuex.mapState(["works"])
  },
  methods: {
    increment() {
      this.$store.commit("increment");
      console.log(this.$store.state.count);
    }
  }
};
</script>
<style scoped></style>
