<template>
  <div class="about">
    <div
      class="floatingimagecontainer"
      v-for="imurl in imagesOf('abouttext')"
      :key="imurl"
      :style="
        `animation-delay: -${randomAnimDelay()}s;
  animation-duration: ${randomAnimDuration()}s`
      "
    >
      <img class="floatingimage" :src="imurl"/>
    </div>

    <vue-markdown
      class="abouttext"
      :source="texts['philosophy'].fields.Markdown"
    ></vue-markdown>

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
    ...mapState(["texts"])
  },
  methods: {
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
.about {
  min-height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}

.abouttext {
  text-align: left;
  width: 50vw;
  max-width: 600px;
  padding: 20px;
  background-color: white;
}

.floatingimage {
  position: absolute;
  max-width: 300px;
  max-height: 300px;
  animation: mymove 20000ms ease-in-out infinite;
}

@keyframes mymove {
  0% {
    transform: translate(0px, 80%);
    opacity: 0.5;
  }
  50% {
    transform: translate(80%, 0px);
    opacity: 1;
  }
  100% {
    transform: translate(0px, 80%);
    opacity: 0.5;
  }
}
</style>
