<template>
  <div class="howto-layers" :class="{ show: displayHowTo }">
    <div class="howto">
      <div class="howtotext">
        <font-awesome-icon
          @click="hideHowTo"
          class="closebutton"
          icon="times-circle"
        />
        <div class="title">How to use the GSAPP Skill Trails</div>
        <vue-markdown
          :source="texts['howtotext'].fields.Markdown"
        ></vue-markdown>
      </div>
    </div>
    <div class="dimscreen" @click="hideHowTo"></div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

library.add(faTimesCircle);

import VueMarkdown from "vue-markdown";
import { mapState } from "vuex";

export default {
  name: "HowTo",
  data() {
    return {};
  },
  components: {
    VueMarkdown,
    FontAwesomeIcon
  },
  computed: {
    ...mapState(["texts", "displayHowTo"])
  },
  methods: {
    hideHowTo() {
      this.$store.commit("setDisplayHowTo", false);
    },
    randomAnimDelay() {
      return Math.random() * 10;
    },
    randomAnimDuration() {
      return 10 + Math.random() * 50;
    },
    imagesOf(field) {
      try {
        return this.texts[field].fields.Images.map(
          im => im.thumbnails.large.url
        );
      } catch {
        return [];
      }
    }
  }
};
</script>
<style scoped lang="scss">
.howto-layers {
  z-index: 1000;
  position: fixed;
  height: 100vh;
  width: 100vw;
  left: 0px;
  top: 0px;

  opacity: 0;
  pointer-events: none;

  &.show {
    opacity: 1;
    pointer-events: auto;
  }

  transition: opacity 400ms ease;

  z-index: 500;
}

.closebutton {
  position: absolute;
  right: -5px;
  top: -5px;
  color: red;
  display: flex;
  align-items: center;
  font-weight: bold;
  cursor: pointer;
  height: 40px;
  width: auto;
}

.howto {
  position: fixed;
  z-index: 1001;
  height: 100vh;
  width: 100vw;
  left: 0px;
  top: 0px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  pointer-events: none;
}

.howtotext {

  .show & {
    pointer-events: auto;
  }


  text-align: left;
  width: 50vw;
  max-width: 600px;
  padding: 20px;
  background-color: white;
  border-radius: 20px;
  position: relative;
}

.dimscreen {
  position: fixed;
  z-index: 900;
  width: 100vw;
  height: 100vh;
  left: 0px;
  top: 0px;
  background-color: grey;
  opacity: 0.7;
}

.title {
  font-size: 1.4em;
  font-weight: bold;
  color: darken(#fc0452, 5%);
}
</style>
