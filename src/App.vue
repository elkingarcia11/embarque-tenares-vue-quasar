<template>
  <router-view />
</template>

<script lang="ts">
import { onMounted } from 'vue';
import { useStore } from './store';

export default {
  name: 'App',
  setup() {
    const $store = useStore();

    onMounted(() => {
      $store.dispatch('invoice/fetchAuthHeader');
    });
  },
};
</script>
