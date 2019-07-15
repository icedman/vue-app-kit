<template>
  <div>
  <ion-slides ref="slides">
    <ion-slide v-for="(image, idx) in images" :key="idx">
      <img :src="$config.api.url + image.url"/>
    </ion-slide>
  </ion-slides>
  </div>
</template>
<script>
  export default {
    props: {
      post: Object,
      block: Object
    },

    computed: {
      images() {
        if (this.block.pictures) {
          return this.block.pictures.map(p => {
            return {
              url: p.url
            }
          });
        }
        if (this.post && this.post.pictures) {
          return this.post.pictures.map(p => {
            return {
              url: p.url
            }
          });
        }
        return [];
      }
    },

    mounted() {
      this.$refs.slides.componentOnReady()
        .then(() => {
          this.$refs.slides.startAutoplay()
        });
    }
  }
</script>