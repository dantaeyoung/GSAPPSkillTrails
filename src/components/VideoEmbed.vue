<template>
  <div id="VideoEmbed">
    <div class="video-vimeo" v-if="isVimeo">
      <iframe
        :src="'https://player.vimeo.com/video/' + videoid"
        width="100%"
        height="100%"
        frameborder="0"
        allow="autoplay; fullscreen"
        allowfullscreen
      ></iframe>
    </div>
    <div class="video-youtube" v-if="isYoutube">
      <img v-if="!loadYT" class="preview" @click="loadYT=true" :src="'https://img.youtube.com/vi/' + videoid + '/maxresdefault.jpg'" />
      <iframe
        v-if="loadYT"
        width="600"
        height="400"
        :src="'https://www.youtube-nocookie.com/embed/' + videoid"
        frameborder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>
  </div>
</template>

<script>
export default {
  name: "VideoEmbed",
  components: {},
  data() {
    return {
      loadYT: false,
    };
  },
  props: ["url"],
  created() {
  },
  computed: {
    isVimeo() {
      let vimeomatch = this.url.match(/vimeo\.com\/(\d+)/);
      return vimeomatch !== null;
    },
    isYoutube() {
      let youtubematch = this.url.match(/youtube\.com\/.*v=(\w+)/);
      return youtubematch !== null;
    },
    videoid() {
      let vimeomatch = this.url.match(/vimeo\.com\/(\d+)/);
      if (vimeomatch !== null && vimeomatch.length >= 2) {
        return vimeomatch[1];
      }
      let youtubematch = this.url.match(/youtube\.com\/.*v=(\w+)/);
      if (youtubematch !== null && youtubematch.length >= 2) {
        return youtubematch[1];
      }
      console.log("S");
      let youtubematch2 = this.url.match(/youtu\.be\/(\w+)/);
      if (youtubematch2 !== null && youtubematch2.length >= 2) {
        console.log(youtubematch2);
        return youtubematch2[1];
      }
      return "";
    }
  },
  methods: {
  },
};
</script>

<style scoped lang="scss">
#VideoEmbed {
  display: flex;
  flex-direction: column;

  div {
    height: 100%;
  }
}

iframe {
  flex-grow: 1;
  width: 100%;
  height: auto;
  /*max-width: 100% !important;
  width: auto !important;
  height: auto !important; */
  border: none;
}

.video-youtube {
  width: 100%;

  & .preview {
    width: 100%;
    height: auto;
    cursor: pointer;
  }
}

</style>
