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
import { openURL, copyToClipboard } from 'quasar';

import '../css/branches.scss';

export default defineComponent({
  setup() {
    return {
      dialog: ref(false),
      tooltipResponse: ref(''),
    };
  },
  methods: {
    call() {
      openURL('tel:7185621300');
    },
    email() {
      openURL('mailto:ny@embarquetenares.com');
    },
    openFB() {
      openURL('https://www.facebook.com/EmbarqueTenaress/');
    },
    openIG() {
      openURL('https://instagram.com/embarquetenares');
    },
    openWhatsapp() {
      openURL('https://api.whatsapp.com/send?phone=7185621300');
    },
    copy(i: number) {
      let text = '';
      let ttr = '';
      switch (i) {
        case 0:
          ttr = this.$t('tooltipRes0');
          text = '2249 Washington Ave Bronx, NY 10457';
          break;
        case 1:
          ttr = this.$t('tooltipRes1');
          text = '7185621300';
          break;
        case 2:
          ttr = this.$t('tooltipRes2');
          text = 'ny@embarquetenares.com';
          break;
      }
      copyToClipboard(text)
        .then(() => {
          // success!
          this.tooltipResponse = ttr;
          this.dialog = true;
          setTimeout(() => {
            this.dialog = false;
          }, 3000);
        })
        .catch(() => {
          // fail
        });
    },
  },
});
</script>
