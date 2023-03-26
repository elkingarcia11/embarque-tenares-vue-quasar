<template>
  <MobileToolbarComponent v-if="$q.platform.is.mobile" />
  <AlternativeToolbarComponent v-else />
</template>

<script lang="ts">
import MobileToolbarComponent from './MobileToolbarComponent.vue';
import AlternativeToolbarComponent from './AlternativeToolbarComponent.vue';

export default {
  components: {
    MobileToolbarComponent,
    AlternativeToolbarComponent,
  },
};
</script>
