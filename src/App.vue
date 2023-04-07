<template>
  <router-view />
</template>

<script lang="ts">
import { useStore } from './store';
import { onMounted } from 'vue';
export default {
  name: 'App',
  setup() {
    onMounted(async () => {
      const $store = useStore();
      const authData = await $store.dispatch('auth/fetchAuthData');
      $store.commit('auth/setAuthData', authData);
    });
  },
};
</script>
