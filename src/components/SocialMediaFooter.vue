<template>
  <div class="q-py-xsm">
    <q-btn
      flat
      square
      @click="openFB"
      icon="facebook"
      style="color: #1778f2; width: 33%"
      size="30px"
    />
    <q-btn
      flat
      square
      @click="openWhatsapp"
      icon="ion-logo-whatsapp"
      style="color: #25d366; width: 34%"
      size="30px"
    />
    <q-btn
      class="instagram"
      flat
      square
      @click="openIG"
      style="width: 33%"
      icon="ion-logo-instagram"
      size="30px"
    />
  </div>

  <q-dialog v-model="dialog" seamless position="bottom">
    <q-card style="width: 350px">
      <q-card-section class="row justify-center wrap">
        <div class="text-weight-bold">{{ tooltipResponse }}</div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';
import { openURL } from 'quasar';

import '../css/branches.scss';

export default defineComponent({
  setup() {
    const tooltipResponse = ref('');

    const dialog = ref(false);

    const openFB = () => {
      openURL('https://www.facebook.com/EmbarqueTenaress/');
    };
    const openIG = () => {
      openURL('https://instagram.com/embarquetenares');
    };
    const openWhatsapp = () => {
      openURL('https://api.whatsapp.com/send?phone=7185621300');
    };

    return { openFB, openWhatsapp, openIG, dialog, tooltipResponse };
  },
});
</script>
