const tableID = "app1nwPhnOPNvChPK";
const apikey = "keyoQpvlH7D3w9kIB"; //normally this should NEVER be exposed. However, this api key is to an account that has read-only access to publicly viewable airtables.
const tableview = "Grid%20view";
const waypointApiUrl = `https://api.airtable.com/v0/${tableID}/Waypoint?api_key=${apikey}&view=${tableview}`;
const trailsApiUrl = `https://api.airtable.com/v0/${tableID}/Trails?api_key=${apikey}&view=${tableview}`;

console.log(waypointApiUrl, trailsApiUrl);

import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    count: 0,
    waypoints: [],
    trails: [],
    hasLoaded: false,
  },
  getters: {},
  mutations: {
    increment(state) {
      state.count++;
    },
    setLoaded(state) {
      state.hasLoaded = true;
      console.log("YOO");
    },
    setWaypoints(state, waypoints) {
      state.waypoints  = waypoints;
    },
    setTrails(state, trails) {
      state.trails  = trails;
    },
  },
  actions: {
    fetch(context) {
      if (!context.state.hasLoaded) {
        context.dispatch("fetchWaypointsAndTrails");
      }
    },
    fetchWaypointsAndTrails(context) {
      var successcount = 0;
      var num_of_requests = 2;

      var xhr1 = new XMLHttpRequest();
      xhr1.open("GET", waypointApiUrl);
      xhr1.onload = function() {
        let waypoints = JSON.parse(xhr1.responseText).records;
        context.commit("setWaypoints", waypoints);
        if (++successcount >= num_of_requests) {
          context.commit("setLoaded");
        } // ugh seriously this is how we check for all get requests finishing?
      };
      xhr1.send();

      var xhr2 = new XMLHttpRequest();
      xhr2.open("GET", trailsApiUrl);
      xhr2.onload = function() {
        let trails = JSON.parse(xhr1.responseText).records;
        context.commit("setTrails", trails);
        if (++successcount >= num_of_requests) {
          context.commit("setLoaded");
        } // ugh seriously this is how we check for all get requests finishing?
      };
      xhr2.send();
    }
  }
});
