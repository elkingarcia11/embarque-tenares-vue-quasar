<template>
  <MobileToolbarComponent v-if="$q.platform.is.mobile" />
  <AlternativeToolbarComponent v-else />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MobileToolbarComponent from './MobileToolbarComponent.vue';
import AlternativeToolbarComponent from './AlternativeToolbarComponent.vue';

export default defineComponent({
  components: {
    MobileToolbarComponent,
    AlternativeToolbarComponent,
  },
});
</script>
