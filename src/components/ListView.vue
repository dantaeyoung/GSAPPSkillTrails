<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2> SKIL TREE GRAPH - LIST VIEW </h2>


    <div class="maingraph">

      <div class="channels" v-for="childchan in childChannels" :key="'listchild-' + childchan.id">
        {{ childchan.title }}
          <div v-for='gchildchan in childchan.contents'  :key="'listchild-' + childchan.id + '-gchild-' + gchildchan.id" >
              {{ 'listchild-' + childchan.id + '-gchild-' + gchildchan.id }}
              <a :href="gchildchan.source.url" >{{gchildchan.title }}</a>
              <img :src="gChildThumbUrl(gchildchan)" />
          
          </div>
      </div>

    </div>


  </div>
</template>

<script>
/* eslint-disable */

const Arena = require("are.na");

import Leaf from '@/components/Leaf.vue'

export default {
  name: 'ListView',
  data() {
    return {
      parentChannel: "gst-albums",
      childChannels: null,
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
    gChildThumbUrl(gchildchan) {
      try { return gchildchan.image.thumb.url; }
      catch { return "" }
    },
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

.maingraph {
  position: relative;
}
</style>
