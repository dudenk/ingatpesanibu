<template>
  <div>
    <header-default></header-default>

    <Nuxt />

    <footer-default></footer-default>

  </div>
</template>
<script>
import HeaderDefault from '~/components/Header.vue'
import FooterDefault from '~/components/Footer.vue'
export default {
  components: {
    HeaderDefault,
    FooterDefault
  }
}
</script>
<style>
</style>
