<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

    <div id="arc">
      <svg xmlns="http://www.w3.org/2000/svg" :width="width+'px'" :height="height+'px'" @mousemove="drag($event)" @mouseup="drop()" >
        <line v-for="link in links" :x1="coords[link.source.index].x" :y1="coords[link.source.index].y" :x2="coords[link.target.index].x" :y2="coords[link.target.index].y" stroke="black" stroke-width="2" v-bind:key="link.source.index" />  
        <circle v-for="(node, i) in nodes" :cx="coords[i].x" :cy="coords[i].y" :r="20" stroke="white" stroke-width="1" @mousedown="currentMove = {x: $event.screenX, y: $event.screenY, node: node}" v-bind:key="node.id"/>
        <!--<g v-for="(node) in nodes" :transform="'translate(' + node.x + ',' + node.y + ')'" v-bind:key="node.id" @mousedown="currentMove = {x: $event.screenX, y: $event.screenY, node: node}" >
          <circle r="40" fill="white" stroke="black" stroke-width="1" />
          <text dx="-20">{{ node.id }}</text>
        </g> -->
      </svg>
    </div>
    <button v-on:click="removeCircle()">remove circle</button>
  </div>
</template>

<script>
/* eslint-disable */

const Arena = require("are.na");

import Network from "vue-network-d3";
import Leaf from '@/components/Leaf.vue'
import * as d3 from "d3";

export default {
  name: 'ForceGraph',
  data() {
    return {
      parentChannel: "gst-albums",
      childChannels: [],
      nodes: [
      	{"id": "Myriel", index: 0, x: null, y: null },
      	{"id": "Napoleon", index: 1, x: null, y: null },
        {"id": "Labarre",index: 2, x: null, y: null },
        {"id": "Valjean", index: 3, x: null, y: null },
      ],
      links: [
        {"source": 0, "target": 1},
        {"source": 2, "target": 0},
        {"source": 1, "target": 2},
      ],
      width: 500,
      height: 500,
      padding: 20,
      simulation: null,
    };
  },
  components: {
    Network,
    Leaf,
  },
  props: {
    msg: String
  },
  created() {
    console.log("yo");
    //this.loadData();
    this.createSimulation();
  },
  updated() {
    //    this.updateGraph();
    console.log("data updated");
  },
  watch: {
    //  nodes: function() { this.updateGraph(); },
  },
  computed: {
    bounds() {
      return {
        minX: Math.min(...this.nodes.map(n => n.x)),
        maxX: Math.max(...this.nodes.map(n => n.x)),
        minY: Math.min(...this.nodes.map(n => n.y)),
        maxY: Math.max(...this.nodes.map(n => n.y))
      }
    },

    coords() {
      return this.nodes.map(node => {
        return {
          x: this.padding + (node.x - this.bounds.minX) * (this.width - 2*this.padding) / (this.bounds.maxX - this.bounds.minX),
          y: this.padding + (node.y - this.bounds.minY) * (this.height - 2*this.padding) / (this.bounds.maxY - this.bounds.minY)
        }
      })
    }

  },
  methods: {

    createSimulation() {
      this.simulation = d3.forceSimulation(this.nodes)
        .force('charge', d3.forceManyBody())
        .force('link', d3.forceLink(this.links))
        .force("center", d3.forceCenter(this.width / 2, this.height / 2));
    },

    removeCircle() {
      this.nodes.pop();
      console.log(" circleRemoved");
      console.log(this.nodes);
    },




     drag(e) {
      if (this.currentMove) {
        this.currentMove.node.fx = this.currentMove.node.x - (this.currentMove.x - e.screenX) * (this.bounds.maxX - this.bounds.minX) / (this.width - 2 * this.padding)
        this.currentMove.node.fy = this.currentMove.node.y -(this.currentMove.y - e.screenY) * (this.bounds.maxY - this.bounds.minY) / (this.height - 2 * this.padding)
        this.currentMove.x = e.screenX
        this.currentMove.y = e.screenY
      }
    },
    drop(){
      delete this.currentMove.node.fx
      delete this.currentMove.node.fy    
      this.currentMove = null
      this.simulation.alpha(1)
      this.simulation.restart()
    },



    loadData() {
    
      const arena = new Arena();
      var self = this;


      //            self.nodes.push({"id": self.parentChannel });////


      arena
        .channel(self.parentChannel).get()
        .then(chan => {
          window.chan = chan;
          self.childChannels = chan.contents;

          //                        var thisedge = {"source": self.parentChannel, "target": "Myriel", "value": 1 }
          //                        self.links.push(thisedge);
          chan.contents.map(childchan => { 

            //            self.links.push({"source": self.parentChannel, "target": childchan.slug, "value": 1 });////
            //            var thisedge = {"source": "Napoleon", "target": "Myriel", "value": 1 }
            //            console.log("woo", thisedge);////
            //            self.links.push(thisedge);


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

#arc {

  height: 400px;
  width: 400px;
}

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




