<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2> SKIL TREE GRAPH</h2>

    <panZoom>

    <div class="graph">

      <div v-for="childchan in childChannels" :key="childchan.id">
        {{ childchan.title }}
        <div class="leaves">
          <Leaf
              v-for='gchildchan in childchan.contents' 
              :key="gchildchan.id" 
              :leafdata="gchildchan"/>
        </div>
      </div>


    </div>

    </panZoom>

  </div>
</template>

<script>
/* eslint-disable */

const Arena = require("are.na");

import Leaf from '@/components/Leaf.vue'

export default {
  name: 'SkillTreeGraph',
  data() {
    return {
      parentChannel: "gst-albums",
      childChannels: [],
    };
  },
  components: {
    Leaf,
  },
  props: {
    msg: String
  },
  created() {
    console.log(this.loadData());
  },
  methods: {
    loadData() {
    
      const arena = new Arena();
      var self = this;
      arena
        .channel(self.parentChannel).get()
        .then(chan => {
          window.chan = chan;
          self.childChannels = chan.contents;

          console.log(chan.contents);

          chan.contents.map(childchan => { 
            console.log(childchan.id)

            arena.channel(childchan.id).get().then(gchildchan => {
              self.childChannels.find(c => c.id === childchan.id).contents = gchildchan.contents;
            })
            .catch(err => console.log(err));

          });

        })
        .catch(err => console.log(err));



    }
  }
}
</script>

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
