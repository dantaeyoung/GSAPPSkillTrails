<template>
  <div id="VideoEmbed">
    <div class="video-vimeo" v-if="isVimeo">
      <iframe
        :src="'https://player.vimeo.com/video/' + videoid"
        width="640"
        height="400"
        frameborder="0"
        allow="autoplay; fullscreen"
        allowfullscreen
      ></iframe>
    </div>
    <div class="video-youtube" v-if="isYoutube">
      <iframe
        width="560"
        height="315"
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
  props: ["url"],
  created() {
    console.log(this.$route.params);
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
      return "";
    }
  }
};
</script>

<style scoped lang="scss">
#VideoEmbed {
  display: flex;
  flex-direction: column;
  height: 100%;
}

iframe {
  flex-grow: 1;
  max-width: 100% !important;
  width: auto !important;
  height: auto !important;
  border: none;
}
</style>
