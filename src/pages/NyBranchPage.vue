<template>
  <q-item-section
    class="q-py-lg text-h4 text-bold text-center"
    style="font-family: 'BodoniSvtyTwoSCITCTT-Book'"
    >{{ $t('nyb') }}</q-item-section
  >
  <q-card class="my-card q-mt-sm">
    <iframe loading="lazy" class="iframe" :src="iframeSource" />
    <q-card-section class="q-pa-none q-ma-none">
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
  border-bottom-style: solid; border-color:lightgrey; border-width: 0.25px;"
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
    <SocialMediaFooter />
  </q-card>
</template>

<script lang="ts">
import process from 'process';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { openURL, copyToClipboard } from 'quasar';

import SocialMediaFooter from 'src/components/SocialMediaFooter.vue';

import '../css/branches.scss';

export default {
  name: 'NyBranchPage',
  components: {
    SocialMediaFooter,
  },
  setup() {
    const { t } = useI18n();
    const tooltipResponse = ref('');
    const dialog = ref(false);

    const iframeSource =
      'https://www.google.com/maps/embed/v1/place?q=place_id:ChIJJ_htcnz0wokRSDrgX-Y-Cv4&key=' +
      process.env.GOOGLE_MAPS_API_KEY;

    const getDirections = () => {
      openURL(
        'https://www.google.com/maps/dir/?api=1&destination=2249+Washington+Ave,+Bronx,+NY+10457-1445,+USA'
      );
    };

    const call = () => {
      openURL('tel:7185621300');
    };

    const email = () => {
      openURL('mailto:ny@embarquetenares.com');
    };

    const copy = (i: number) => {
      let text = '';
      let ttr = '';
      switch (i) {
        case 0:
          ttr = t('tooltipRes0');
          text = '2249 Washington Ave Bronx, NY 10457';
          break;
        case 1:
          ttr = t('tooltipRes1');
          text = '7185621300';
          break;
        case 2:
          ttr = t('tooltipRes2');
          text = 'ny@embarquetenares.com';
          break;
      }
      copyToClipboard(text)
        .then(() => {
          // success!
          tooltipResponse.value = ttr;
          dialog.value = true;
          setTimeout(() => {
            dialog.value = false;
          }, 3000);
        })
        .catch(() => {
          // fail
          console.log('Failed to copy to clipboard');
        });
    };

    return { iframeSource, getDirections, call, copy, email };
  },
};
</script>
