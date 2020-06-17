<template>
  <div id="graphframe">
    <div id="graphnav">
      <button @click="panzoom.zoomOut()">-</button>
      <button @click="panzoom.zoomIn()">+</button>
      <button @click="panzoom.reset()">reset</button>
    </div>
    <div id="graphwindow">
      <div id="graphcontents">
        <div
          class="channels"
          v-for="childchan in childChannels"
          :key="'channel-' + childchan.id"
        >
          <Leaf
            v-for="gchildchan in childchan.contents"
            :key="'ch-' + childchan.id + '-leaf-' + gchildchan.id"
            :leafdata="gchildchan"
          />
        </div>

          <svg id="trails">
        <Trail
            v-for="(childchan, index) in childChannels"
            v-bind:index="index"
            v-bind:key="childchan.id"
            :traildata="childchan"
          />
        </svg>

        <GraphBackground />
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */

const Arena = require("are.na");

import Panzoom from "@panzoom/panzoom";

import Leaf from "@/components/Leaf.vue";
import Trail from "@/components/Trail.vue";
import GraphBackground from "@/components/GraphBackground.vue";

export default {
  name: "SkillTreeGraph",
  data() {
    return {
      parentChannel: "gst-albums",
      childChannels: [],
      panzoom: null
    };
  },
  components: {
    Leaf,
    Trail,
    GraphBackground
  },
  props: {
    msg: String
  },
  mounted() {
    this.initPanZoom();
  },
  created() {
    console.log(this.loadData());
  },
  methods: {
    initPanZoom() {
      const elem = document.getElementById("graphcontents");
      console.log(elem);
      this.panzoom = Panzoom(elem, {
        maxScale: 2,
        minScale: 0.5
      });
      elem.parentElement.addEventListener("wheel", this.panzoom.zoomWithWheel);
    },
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

#graphframe {
  height: 100%;
  width: 100%;
}

#graphnav {
  position: absolute;
  z-index: 100;
}

#graphwindow {
  height: 100%;
  width: 100%;
}

svg#trails {
  height: 2000px;
  width: 2000px;
}
</style>
