<template>
  <div class="about">
  <div class="abouttexts">
    <vue-markdown
      class="abouttext"
      :source="texts['credits'].fields.Markdown"
    ></vue-markdown>
    <vue-markdown
      class="abouttext"
      :source="texts['philosophy'].fields.Markdown"
    ></vue-markdown>
    </div>
  <div class="floatingimagecontainer">
      <div
        class="floatingimageY"
        v-for="imurl in imagesOf('philosophy')"
        :key="imurl"
        :style="animationStyle()">
        <img class="floatingimageX" :src="imurl" :style="animationStyle()" />
      </div>
      </div>

  </div>
</template>

<script>
import VueMarkdown from "vue-markdown";
import { mapState } from "vuex";

export default {
  name: "About",
  data() {
    return {};
  },
  components: {
    VueMarkdown
  },
  computed: {
    ...mapState(["texts"]),
  },
  methods: {
    animationStyle() {
      return `animation-delay: ${this.randomAnimDelay()}s;
      animation-duration: ${this.randomAnimDuration()}s`;
    },
    randomAnimDelay() {
      return (1 + Math.random()) * -30;
    },
    randomAnimDuration() {
      return (1 + Math.random()) * 30;
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
.about {
  display: flex;
  min-height: 100vh;
  align-items: stretch;
  flex-direction: row;
  margin: 10vh 10vw;
}

.abouttexts {
  text-align: left;
  width: 50vw;
  max-width: 600px;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
}

.abouttext {
  padding-bottom: 20px;
  margin-bottom: 40px;
  
}

.floatingimagecontainer {
  position: relative;
  background-color: pink;
  pointer-events: none;
}

.floatingimageY { 
  position: absolute;
    mix-blend-mode: multiply;
  animation-name: mymoveY;
  animation-timing-function: ease;
  animation-iteration-count: infinite;
  height: 100%;
}
.floatingimageX {
  max-width: 250px;
  max-height: 250px;
  animation: mymoveX;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  border-radius: 10px;
}

@keyframes mymoveY {
  0% {
    transform: translateY(0%);
  }
  50% {
    transform: translateY(90%);
  }
  100% {
    transform: translateY(0%);
  }
}

@keyframes mymoveX {
  0% {
    transform: translateX(0%);
  }
  50% {
    transform: translateX(calc(50%));
  }
  100% {
    transform: translateX(0%);
  }
}

</style>
