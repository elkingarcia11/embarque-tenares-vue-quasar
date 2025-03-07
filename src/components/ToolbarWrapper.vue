<template>
  <!-- Conditional rendering of toolbar components based on platform -->
  <MobileToolbarComponent v-if="$q.platform.is.mobile" />
  <AlternativeToolbarComponent v-else />
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import MobileToolbarComponent from './MobileToolbarComponent.vue';
import AlternativeToolbarComponent from './AlternativeToolbarComponent.vue';

const $q = useQuasar();
</script>
