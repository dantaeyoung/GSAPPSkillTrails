<template>
  <div id="app">
    <section id="header">
      <TopHeader />
    </section>
    
    <section id="center">
      <section id="graph">
        <SkillTreeGraph />
      </section>
      <section id="content">
        <router-view name="content"/>
      </section>
    </section>

    <section id="footer">footer</section>
  </div>
</template>


<script>
import TopHeader from '@/components/TopHeader.vue'
import SkillTreeGraph from '@/components/SkillTreeGraph.vue'

export default {
  components: { TopHeader, SkillTreeGraph },
            created() {
                this.$store.dispatch('fetch');
            },
};
</script> 

<style lang="scss">

body, html { margin: 0; padding: 0; }

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  display: flex;
  flex-direction: column;
  height: 100vh;
}

section {

  &#center {
    flex-grow: 1;
    display: flex;
    flex-direction: row;

    #graph{
      background-color: #DDD;
      flex-grow: 1;
      overflow: hidden;
    }

    #content {
      width: 50vw; 
      max-width: 500px;
    }
  }
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
