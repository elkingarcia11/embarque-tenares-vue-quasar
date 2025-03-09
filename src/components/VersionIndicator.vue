<template>
  <div class="version-indicator">
    v{{ version }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'VersionIndicator',
  setup() {
    const version = process.env?.APP_VERSION ?? 'dev';
    return {
      version
    };
  }
});
</script>

<style lang="scss">
.version-indicator {
  position: fixed;
  bottom: 5px;
  right: 5px;
  font-size: 10px;
  opacity: 0.5;
  background: rgba(0, 0, 0, 0.1);
  padding: 2px 5px;
  border-radius: 3px;
  z-index: 1000;
}
</style> 