<template>
  <q-page-sticky position="top" :offset="[0, 0]">
    <q-input
      ref="invoiceInputRef"
      square
      class="window-width overflow-hidden"
      outlined
      v-model="invoiceText"
      :label="$t('trackPack')"
      mask="############"
      unmasked-value
    >
      <template v-slot:append>
        <q-btn
          flat
          round
          color="secondary"
          icon="quiz"
          @click="invoiceDialog = true"
        />
        <q-btn flat round color="primary" icon="search" />
      </template>
    </q-input>
  </q-page-sticky>
  <CircularProg
    v-if="hidden"
    ref="circularProgRef"
    :percent="percent"
    :invoice="invoiceNumber"
    :eta="eta"
  />
  <TabBar
    ref="tabBarRef"
    :buttonNumber="1"
    @focus-input="$refs['invoiceInputRef'].focus()"
  />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import CircularProg from 'src/components/CircularProg.vue';
import TabBar from 'src/components/TabBar.vue';

export default defineComponent({
  components: {
    CircularProg,
    TabBar,
  },
  data: function () {
    return {
      percent: 20,
      daysLeft: 25,
      eta: 'December 20, 2023',
      invoiceNumber: 123456,
      hidden: false,
      invoiceDialog: ref(false),
      invoiceText: ref(''),
    };
  },
});
</script>
