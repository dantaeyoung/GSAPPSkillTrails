<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

    <div id="arc">
      <svg xmlns="http://www.w3.org/2000/svg" :width="width+'px'" :height="height+'px'">
        <!--      <line v-for="link in graphstate.links" :x1="coords[link.source.index].x" :y1="coords[link.source.index].y" :x2="coords[link.target.index].x" :y2="coords[link.target.index].y" stroke="black" stroke-width="2"/> -->
        <g v-for="(node) in nodes" :transform="'translate(' + node.x + ',' + node.y + ')'" v-bind:key="node.id">
          <circle r="40" fill="white" stroke="black" stroke-width="1" />
          <text dx="-20">{{ node.id }}</text>
        </g>
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
      	{"id": "Myriel", "group": 1, "x": 120, "y": 80},
      	{"id": "Napoleon", "group": 1},
        {"id": "Labarre", "group": 2},
        {"id": "Valjean", "group": 2}
      ],
      links: [
        {"source": "Napoleon", "target": "Myriel", "value": 1},
        {"source": "Valjean", "target": "Labarre", "value": 1},
        {"source": "Napoleon", "target": "Valjean", "value": 2},
      ],
      width: 500,
      height: 500,
      graphstate: { links: null, nodes: null },
      coords: null
    };
  },
  components: {
    Network,
    Leaf,
  },
  props: {
    msg: String
  },
  mounted() {
    this.loadData();
    this.createSimulation();
  },
  updated() {
    //    this.updateGraph();
    console.log("data updated");
  },
  watch: {
    //  nodes: function() { this.updateGraph(); },
  },
  methods: {

    createSimulation() {
      this.simulation = d3.forceSimulation(this.nodes)
        .force('charge', d3.forceManyBody().strength(d => -100))
        .force('link', d3.forceLink(this.links))
        .force('x', d3.forceX())
        .force('y', d3.forceY()) 
    },

    removeCircle() {
      this.nodes.pop();
      console.log(" circleRemoved");
      console.log(this.nodes);
    },

    generateGraph() {
      const w = 500;
      const h = 500;

      const svg = d3
        .select("#arc")
        .append("svg")
        .attr("width", w)
        .attr("height", h);


      var simulation = d3.forceSimulation()
        .force("link", d3.forceLink().id(function(d) { return d.id; }))
        .force("charge", d3.forceManyBody())
        .force("center", d3.forceCenter(w / 2, h / 2));

    },


    updateGraph() {

      var circleGs = d3.select("#arc svg").selectAll(".circle").data(this.nodes);

      console.log("updategraph");

      var enterG = circleGs.enter()
        .append("g").attr("class", "circle");

      enterG.merge(circleGs)
        .attr("transform", function(d){return "translate(80,80)"});

      enterG
        .append("circle")
        .style("stroke", "gray")
        .style("fill", "white")
        .attr("r", 40)

      enterG.append("text")
        .attr("dx", function(d){return -20})
        .text(function(d){return d.id})

      circleGs.exit().remove();

  },



    loadData() {
    
      const arena = new Arena();
      var self = this;


      //            self.nodes.push({"id": self.parentChannel });////
            self.nodes.push({"id": "heyy" });////


      arena
        .channel(self.parentChannel).get()
        .then(chan => {
          window.chan = chan;
          self.childChannels = chan.contents;

          //                        var thisedge = {"source": self.parentChannel, "target": "Myriel", "value": 1 }
          //                        self.links.push(thisedge);
          chan.contents.map(childchan => { 

            self.nodes.push({"id": childchan.slug});////
            self.links.push({"source": childchan.slug, "target": "heyy", "value": 1 });////
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




