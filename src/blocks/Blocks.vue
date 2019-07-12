<template>
  <div v-bind="block.attributes || {}">
    <component :is="block.element || 'div'" :block="block" :post="post"/>
      <div v-if="content" padding class="block-content" v-html="content"></div>
      <blocks v-if="block.children" v-for="(child,idx) in block.children" :block="child" :post="post"/>
    </component>
  </div>
</template>
<script>
import marked from "marked";
  export default {
    name: "blocks",
    
    props: {
      post: Object,
      block: Object
    },

    mounted() {
      console.log(this.post)
    },

    computed: {
      content() {
        if (this.block.render) {
          return marked(this.post[this.block.render]);
        }
        if (this.block.content) {
          return this.block.content
        }
        return null;
      }
    },

    components: {
      'carousel': () => import('./elements/Carousel.vue')
    }
  }
</script>