<template>
  <!-- Container for social media buttons -->
  <div class="q-py-xsm">
    <!-- Facebook button -->
    <q-btn
      flat
      square
      @click="openUrl('https://www.facebook.com/EmbarqueTenaress/')"
      icon="facebook"
      style="color: #1778f2; width: 33%"
      size="30px"
    />

    <!-- WhatsApp button -->
    <q-btn
      flat
      square
      @click="openUrl('https://api.whatsapp.com/send?phone=7185621300')"
      icon="ion-logo-whatsapp"
      style="color: #25d366; width: 34%"
      size="30px"
    />

    <!-- Instagram button -->
    <q-btn
      class="instagram"
      flat
      square
      @click="openUrl('https://instagram.com/embarquetenares')"
      style="width: 33%"
      icon="ion-logo-instagram"
      size="30px"
    />
  </div>

  <!-- Dialog for tooltip display -->
  <q-dialog v-model="dialog" seamless position="bottom">
    <q-card style="width: 350px">
      <q-card-section class="row justify-center wrap">
        <div class="text-weight-bold">{{ tooltipResponse }}</div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { ref } from 'vue';
import { openURL } from 'quasar';

import '../css/branches.scss';

export default {
  name: 'SocialMediaFooter',
  setup() {
    // Reactive state for tooltip response
    const tooltipResponse = ref('');

    // Reactive state for the dialog visibility
    const dialog = ref(false);

    // Function to open a URL in the browser
    const openUrl = (app: string) => {
      openURL(app);
    };

    // Expose data and methods to the template
    return { openUrl, dialog, tooltipResponse };
  },
};
</script>
