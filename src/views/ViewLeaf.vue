<template>

  <div id="ViewLeaf">
    <h4>Viewing: {{ ViewTitle }} at {{ViewURL}}</h4>
    <iframe :src="ViewURL" /> 
  </div>
</template>

<script>


export default {
  name: 'ViewLeaf',
  components: {
  },
  created() {
    console.log(this.$route.params);
  },
  computed: {
    ViewTitle() {
      try {  return this.$route.params.leafdata.title; }
      catch { return ""  }
    },
    ViewURL() {
      try {     return this.$route.params.leafdata.source.url;   }
      catch {  return ""   }
    },
  },
}
</script>

<style scoped lang="scss">

#ViewLeaf {
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

