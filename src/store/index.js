const tableID = "app1nwPhnOPNvChPK";
const apikey = "keyoQpvlH7D3w9kIB"; //normally this should NEVER be exposed. However, this api key is to an account that has read-only access to publicly viewable airtables.
const tableview = "Grid%20view";
const waypointApiUrl = `https://api.airtable.com/v0/${tableID}/Waypoint?api_key=${apikey}&view=${tableview}`;
const trailsApiUrl = `https://api.airtable.com/v0/${tableID}/Trails?api_key=${apikey}&view=${tableview}`;

console.log(waypointApiUrl, trailsApiUrl);

import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

function coordinateTransform(val, sidelength) {
  if (isNaN(val)) {
    return 0;
  }
  // coordinates are from -1.0 to 1.0, remap to 0 to 2000
  // or 2000 x 2000px
  return (val * sidelength) / 2 + sidelength / 2;
}

/*function coordinateDetransform(pxval, sidelength) {
  return (pxval * 2) / sidelength - 1;
}*/

export default new Vuex.Store({
  state: {
    count: 0,
    sidelength: 2000,
    waypoints: {},
    trails: [],
    hasLoaded: false,
    waypointsDraggable: false,
    hoveringTrails: []
  },
  getters: {},
  mutations: {
    increment(state) {
      state.count++;
    },
    setLoaded(state) {
      state.hasLoaded = true;
    },
    addHoveringTrails(state, payload) {
      payload.ids.forEach(function(id) {
        if (!state.hoveringTrails.includes(id)) {
          state.hoveringTrails.push(id);
        }
      });
    },
    removeHoveringTrails(state, payload) {
      payload.ids.forEach(function(id) {
        state.hoveringTrails = state.hoveringTrails.filter(v => v !== id);
      });
    },
    setWaypointsDraggable(state, val) {
      if (val == true) {
        state.waypointsDraggable = true;
      } else {
        state.waypointsDraggable = false;
      }
    },
    setWaypoints(state, waypoints) {
      var self = this;

      state.waypoints = waypoints.reduce(function(obj, item) {
        item.fields.coordinateX = coordinateTransform(
          item.fields.coordinateX,
          self.state.sidelength
        );
        item.fields.coordinateY = coordinateTransform(
          item.fields.coordinateY,
          self.state.sidelength
        );
        obj[item.id] = item;
        return obj;
      }, {});
    },
    setTrails(state, trails) {
      state.trails = trails.reduce(function(obj, item) {
        obj[item.id] = item;
        return obj;
      }, {});
    },
    setWaypointCoordinates(state, payload) {
      var thiswp = state.waypoints[payload.waypointid];
      thiswp.fields.coordinateX = Math.max(
        0,
        Math.min(state.sidelength, payload.x)
      );
      thiswp.fields.coordinateY = Math.max(
        0,
        Math.min(state.sidelength, payload.y)
      );
    }
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
        let waypoints = JSON.parse(xhr1.responseText).records.filter(
          w => w.fields["Name"]
        );
        context.commit("setWaypoints", waypoints);
        if (++successcount >= num_of_requests) {
          context.commit("setLoaded");
        } // ugh seriously this is how we check for all get requests finishing?
      };
      xhr1.send();

      var xhr2 = new XMLHttpRequest();
      xhr2.open("GET", trailsApiUrl);
      xhr2.onload = function() {
        let trails = JSON.parse(xhr2.responseText).records.filter(
          t => t.fields["Name"]
        );
        context.commit("setTrails", trails);
        if (++successcount >= num_of_requests) {
          context.commit("setLoaded");
        } // ugh seriously this is how we check for all get requests finishing?
      };
      xhr2.send();
    }
  }
});
