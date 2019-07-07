<template>
  <div>
    <component :is="block.type">
      <component :is="child.type" v-for="(child,idx) in (block.children || [])"/>
    </component>
  </div>
</template>
<script>
  export default {
    name: "blocks"

    props: {
      block: Object
    }
  }
</script>