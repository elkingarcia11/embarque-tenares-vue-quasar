<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  watch: {
    $route: {
      immediate: true,
      handler () {
        document.title = 'Embarque Tenares'
      }
    }
  }
})
</script>
