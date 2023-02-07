<template>
  <CircularProg
    ref="circularProgRef"
    :percent="percent"
    :daysLeft="daysLeft"
    :eta="eta"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CircularProg from 'src/components/CircularProg.vue';

export default defineComponent({
  components: {
    CircularProg,
  },
  data: function () {
    return {
      percent: 20,
      daysLeft: 25,
      eta: 'December 20, 2023',
    };
  },
});
</script>
