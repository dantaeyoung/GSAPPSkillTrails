<template>
  <div id="topheader">
    <div class="leftlinks">
      <router-link class="navlink" :to="{ name: 'MapView', params: paramsForRoute }">Map View</router-link>
      <router-link class="navlink" :to="{ name: 'ListView', params: paramsForRoute }">List View</router-link>
    </div>

    <div class="centerlogo">
      <router-link class="logolink" :to="{ name: 'MapView' }">
      <img class="svglogo" src="@/assets/logo.svg" alt="GSAPP SKILL TRAILS" />
      </router-link>
    </div>

    <div class="rightlinks">
      <router-link class="navlink" to="/about"><font-awesome-icon icon="question" />About</router-link>
      <div class="navlink" @click="howtoToggle" :class="{ active: displayHowTo }"><font-awesome-icon icon="question" />How To</div>
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";

library.add(faQuestion);

export default {
  name: "TopHeader",
  data() {
    return {

    };
  },
  components: {
    FontAwesomeIcon
  },
  computed: {
    displayHowTo() {
      return this.$store.state.displayHowTo;
    },
    paramsForRoute() {
      return {
        "wpid": this.$route.params.wpid,
        "slug": this.$route.params.slug,
      } 
    },
    currentRouteName() {
      return this.$route.name;
    }
  },
  methods: {
    howtoToggle() {
      console.log(this.displayHowTo
      );
      var self = this;
      this.$store.commit("setDisplayHowTo", !self.displayHowTo);
    }
  }
};
</script>
<style scoped lang="scss">
#topheader {
  background-color: #fc0452;
  height: 30px;
  text-align: center;

  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  align-content: center;
  padding: 0px 10px;
}

.centerlogo {
      position: absolute;             /* new */
      left: 50%;
      transform: translateX(-50%);
}

.svglogo {
  display: block;
  width: auto;
  height: 25px;
}

.rightlinks, .leftlinks {
}

.navlink {
  position: relative;
  height: 22px;
  display: inline-block;
  font-size: 0.8em;
  background-color: white;
  color: #fc0452;
  font-weight: bold;
  padding: 2px 4px;
  margin-right: 5px;
  margin-top: 10px;
  border-radius: 5px;
  text-decoration: none;
  user-select: none;
  box-shadow: 0px -5px gray;
}

button {

  background-color: white;

  &.active {
    background-color: blue;
  }

}


.router-link-active, .active {
  pointer-events: none;
  background-color: darken(#fc0452, 30%);
  color: white;
  box-shadow: 0px -3px gray inset;
  top: -6px;
  padding-top: 0px;
}

.logolink {
  pointer-events: auto !important;
}
</style>
