<template>
  <div class="hello">
    <panZoom>
      <div class="maingraph">
        <div
          class="channels"
          v-for="childchan in childChannels"
          :key="'channel-' + childchan.id"
        >
          <div class="leaves">
            <Leaf
              v-for="gchildchan in childchan.contents"
              :key="'ch-' + childchan.id + '-leaf-' + gchildchan.id"
              :leafdata="gchildchan"
            />
          </div>
        </div>

        <Trail
          class="trails"
          v-for="childchan in childChannels"
          :key="'trail-' + childchan.id"
          :traildata="childchan"
        ></Trail>
      </div>
    </panZoom>
  </div>
</template>

<script>
/* eslint-disable */

const Arena = require("are.na");

import Leaf from "@/components/Leaf.vue";
import Trail from "@/components/Trail.vue";

export default {
  name: "SkillTreeGraph",
  data() {
    return {
      parentChannel: "gst-albums",
      childChannels: []
    };
  },
  components: {
    Leaf,
    Trail
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
        .channel(self.parentChannel)
        .get()
        .then(chan => {
          window.chan = chan;
          self.childChannels = chan.contents;

          console.log(chan.contents);

          chan.contents.map(childchan => {
            console.log(childchan.id);

            arena
              .channel(childchan.id)
              .get()
              .then(gchildchan => {
                self.childChannels.find(c => c.id === childchan.id).contents =
                  gchildchan.contents;
              })
              .catch(err => console.log(err));
          });
        })
        .catch(err => console.log(err));
    }
  }
};
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
