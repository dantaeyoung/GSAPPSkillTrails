<template>
  <div id="topheader">
    <div class="leftlinks"></div>

    <div class="centerlogo">
      <img class="svglogo" src="@/assets/logo.svg" alt="GSAPP SKILL TRAILS" />
    </div>

    <div class="rightlinks">
      <router-link class="navlink" to="/list">ListView</router-link>
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
    return {};
  },
  components: {
    FontAwesomeIcon
  },
  computed: {},
  methods: {}
};
</script>
<style scoped>
#topheader {
  background-color: #fc0452;
  height: 8vh;
  min-height: 25px;
  text-align: center;

  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  align-content: center;
}

.svglogo {
  display: block;
  width: auto;
  height: 6vh;
  min-height: 20px;
}

.rightlinks {
  display: flex;
  }

  .navlink {
    font-size: calc(0.3em + 2vh);
    background-color: white;
    color: #fc0452;
    font-weight: bold;
    padding: 3px 5px;
    margin: 0px 5px;
    border-radius: 5px;
    text-decoration: none;
}
</style>
