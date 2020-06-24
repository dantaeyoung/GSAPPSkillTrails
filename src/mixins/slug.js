export const slug = {
  methods: {
    convertToSlug(text) {
      return text.trim().toLowerCase().replace(/ /g,'-').replace(/[-]+/g, '-').replace(/[^\w-]+/g,'');
    }
  }
}
