<template>
  <!-- Conditional rendering of toolbar components based on platform -->
  <MobileToolbarComponent v-if="$q.platform.is.mobile" />
  <AlternativeToolbarComponent v-else />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useQuasar } from 'quasar';
import MobileToolbarComponent from './MobileToolbarComponent.vue';
import AlternativeToolbarComponent from './AlternativeToolbarComponent.vue';

export default defineComponent({
  name: 'ToolbarWrapper',
  components: {
    MobileToolbarComponent,
    AlternativeToolbarComponent,
  },
  setup() {
    const $q = useQuasar();
    return { $q };
  }
});
</script>
