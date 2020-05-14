<template>
  <svg class="leaf"
    xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality;"
    viewBox = "0 0 100 100">
      <g>
        <circle cx="50%" cy="50%" r="49%" stroke="black" stroke-width="1" fill="none" />
        <foreignObject x="0%" y="0%" width="100%" height="100%">
          <div class="circle"><div class="text">{{ leafdata.title }}</div></div>
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
  props: ['leafdata', 'id', 'title'],
  created() {
  },
  methods: {
  }
}
</script>

<style scoped lang="scss">

.leaf {
  width: 80px; 
  height: 80px;
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
  font-size: 0.5em;
  text-align: center;
  width: 100%;
  overflow-wrap: break-word;
}
</style>
