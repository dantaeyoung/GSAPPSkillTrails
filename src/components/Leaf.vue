<template>
  <svg class="leaf"
    xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality;"
    viewBox = "0 0 100 100">
    <g @click="onClickViewLeaf">
      <circle cx="50%" cy="50%" r="49%" stroke="black" stroke-width="1" fill="none" />
      <foreignObject x="0%" y="0%" width="100%" height="100%">
        <div class="circle colorfilter">
          <img :src="ThumbUrl" />
          <div class="text">{{ leafdata.title }}</div>
        </div>
      </foreignObject>
    </g>
  </svg> 
</template>

<script>
/* eslint-disable */


import TopHeader from '@/components/TopHeader.vue'

export default {
  name: 'Leaf',
  data() {
    return {
    };
  },
  props: ['leafdata'],
  created() {
  },
  computed: {
    ThumbUrl() {
      try { return this.leafdata.image.thumb.url; }
      catch { return "" }
    }
  },
  methods: {
    onClickViewLeaf() {
      console.log("going to", this.leafdata.id);
      this.$router.push({ name: "ViewLeaf", params: { leafdata: this.leafdata, id: this.leafdata.id } });
    }
  }
}
</script>

<style scoped lang="scss">

.leaf {
  width: 80px; 
  height: 80px;
}

img {
  opacity: 0.5;
  position: absolute;
}

.circle{
  display: flex;
  align-items: center;
  border-radius: 100%;
  height: 90%;
  width: 90%;
  padding: 5%
}
.text {
  z-index: 100;
  font-weight: bold;
  font-size: 0.5em;
  text-align: center;
  width: 100%;
  overflow-wrap: break-word;
}



.colorfilter{
  position: relative;
}

.colorfilter:after{
  position: absolute; content: ''; 
  display: block; top: 0; left: 0; height: 100%; width: 100%;
    background: #5367ce;
    mix-blend-mode: screen
}


</style>
