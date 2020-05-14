<template>
  <div id="topheader">

    <h2>GSAPP Skill Tree</h2>
    <h3>
        <router-link to="/">Home</router-link> 
        <router-link to="/about">About</router-link>
     </h3>

  </div>
</template>

<script>
module.exports = {
    components: {
    },
    computed: {
//        ...Vuex.mapState(["works"])
    },
    methods: {
    }
};
</script>
<style scoped>
#topheader {
  background-color: #FC0452;
  height: 50px;
  width: 100vw;
  text-align: center;

  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
}
</style>
