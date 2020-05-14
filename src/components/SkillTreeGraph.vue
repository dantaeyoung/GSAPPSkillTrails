<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2> SKIL TREE GRAPH</h2>
    {{ graphdata }}
  </div>
</template>

<script>

const Arena = require("are.na");

const arena = new Arena();


export default {
  name: 'SkillTreeGraph',
  data() {
    return {
      graphdata: { "yo": "what?" },
    };
  },
  props: {
    msg: String
  },
  created() {
    console.log(this.loadData());
  },
  methods: {
    loadData() {

      arena
        .channel("arena-influences")
        .get()
        .then(chan => {
          chan.contents.map(item => {
            console.log(item.title);
          });
        })
        .catch(err => console.log(err));

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
