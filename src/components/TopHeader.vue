<template>
  <div id="topheader">
    <div class="leftlinks">
      <router-link class="navlink" :to="{ name: 'ListView', params: paramsForRoute }">List View</router-link>
      <router-link class="navlink" :to="{ name: 'MapView', params: paramsForRoute }">Map View</router-link>
    </div>

    <div class="centerlogo">
      <img class="svglogo" src="@/assets/logo.svg" alt="GSAPP SKILL TRAILS" />
    </div>

    <div class="rightlinks">
      <router-link class="navlink" to="/about">
        <font-awesome-icon icon="question" />
        About</router-link
      >
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

.rightlinks {
  display: flex;
}

.navlink {
  font-size: 0.8em;
  background-color: white;
  color: #fc0452;
  font-weight: bold;
  padding: 3px 5px;
  margin: 0px 5px;
  border-radius: 5px;
  text-decoration: none;
}

button {

  background-color: white;

  &.active {
    background-color: blue;
  }

}


.router-link-active {
  opacity: 0.6;
  pointer-events: none;
}
</style>
