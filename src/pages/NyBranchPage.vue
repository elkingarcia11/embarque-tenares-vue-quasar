<template>
  <q-scroll-area style="width: 100vw; height: 100vh">
    <q-item-section class="q-py-md q-pl-md text-h4 text-bold">{{
      $t('nyb')
    }}</q-item-section>
    <q-card class="my-card">
      <iframe loading="lazy" class="iframe" :src="iframeSource" />

      <q-card-section class="q-pa-none">
        <q-btn
          fab
          @click="getDirections"
          color="primary"
          icon="directions"
          class="absolute"
          style="top: 0px; right: 0px; transform: translateY(-50%)"
        >
          <q-tooltip
            transition-show="scale"
            transition-hide="scale"
            anchor="bottom middle"
            self="center middle"
          >
            <strong>{{ $t('tooltip0') }}</strong></q-tooltip
          ></q-btn
        >
      </q-card-section>
      <q-separator />
      <q-card-actions class="q-pt-sm">
        <q-btn @click="call" flat round color="primary" icon="call" />
        <q-btn @click="copy(1)" flat color="black">
          <q-tooltip
            transition-show="scale"
            transition-hide="scale"
            anchor="bottom middle"
            self="center middle"
          >
            <strong>{{ $t('copy1') }}</strong>
          </q-tooltip>
          (718) 562-1300
        </q-btn>
        <q-space />
      </q-card-actions>
      <q-card-actions>
        <q-btn @click="email" flat round color="primary" icon="email" />
        <q-btn @click="email" flat color="black" no-caps>
          ny@embarquetenares.com
        </q-btn>
        <q-space />
        <q-btn @click="copy(2)" round flat icon="content_copy" color="grey-7">
          <q-tooltip
            transition-show="scale"
            transition-hide="scale"
            anchor="bottom middle"
            self="center middle"
          >
            <strong>{{ $t('copy2') }} </strong>
          </q-tooltip></q-btn
        >
      </q-card-actions>

      <q-expansion-item
        id="schedule_expansion_item"
        icon="schedule"
        :label="$t('hours')"
        header-class="text-black text-bold q-py-md"
        expand-icon-class="text-black text-bold"
        header-style="
  border-bottom-style: solid; border-color:grey; border-width: 0.25px;"
      >
        <q-item class="text-white" style="padding-top: 1.5vh">
          <q-item-section>
            <q-item-label
              overline
              class="text-white"
              style="text-align: center; font-weight: bold; font-size: 18px"
              >{{ $t('monToSat') }}</q-item-label
            >
            <q-item-label style="text-align: center; font-weight: bold"
              >8AM - 6PM</q-item-label
            >
          </q-item-section>
        </q-item>

        <q-item class="text-white" style="padding-bottom: 1vh">
          <q-item-section>
            <q-item-label
              overline
              class="text-white"
              style="text-align: center; font-weight: bold; font-size: 18px"
              >{{ $t('sunday') }}</q-item-label
            >
            <q-item-label style="text-align: center; font-weight: bold">{{
              $t('closed')
            }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-expansion-item>
      <q-separator />

      <SocialMediaFooter />
    </q-card>
  </q-scroll-area>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';
import { openURL, copyToClipboard } from 'quasar';
import SocialMediaFooter from 'src/components/SocialMediaFooter.vue';

import '../css/branches.scss';

const src =
  'https://www.google.com/maps/embed/v1/place?q=place_id:ChIJJ_htcnz0wokRSDrgX-Y-Cv4&key=' +
  process.env.GOOGLE_MAPS_API_KEY;
export default defineComponent({
  components: {
    SocialMediaFooter,
  },
  setup() {
    return {
      active: ref(true),
      expanded: ref(false),
      dialog: ref(false),
      tooltipResponse: ref(''),
      iframeSource: src,
    };
  },
  methods: {
    getDirections() {
      openURL(
        'https://www.google.com/maps/dir/?api=1&destination=2249+Washington+Ave,+Bronx,+NY+10457-1445,+USA'
      );
    },
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
