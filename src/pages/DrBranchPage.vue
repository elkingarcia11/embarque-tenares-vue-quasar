<template>
  <q-item-section
    class="q-py-lg text-h4 text-bold text-center"
    style="font-family: 'BodoniSvtyTwoSCITCTT-Book'"
    >{{ $t('drb') }}</q-item-section
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
        style="top: 0; right: 12px; transform: translateY(-50%)"
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
        (809) 970-0007
      </q-btn>
      <q-space />
    </q-card-actions>

    <q-card-actions>
      <q-btn @click="call" flat round color="primary" icon="call" />
      <q-btn @click="call2" flat color="black"> (809) 261-2373 </q-btn>
      <q-space />
      <q-btn @click="copy(1)" round flat icon="content_copy" color="grey-7">
        <q-tooltip
          transition-show="scale"
          transition-hide="scale"
          anchor="bottom middle"
          self="center middle"
        >
          <strong>{{ $t('copy1') }}</strong>
        </q-tooltip></q-btn
      >
    </q-card-actions>
    <q-card-actions>
      <q-btn @click="email" flat round color="primary" icon="email" />
      <q-btn @click="email" flat color="black" no-caps>
        rd@embarquetenares.com
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
      <q-item style="padding-top: 1.5vh" class="text-white">
        <q-item-section>
          <q-item-label
            class="text-white"
            overline
            style="text-align: center; font-weight: bold; font-size: 18px"
            >{{ $t('monToFri') }}</q-item-label
          >
          <q-item-label style="text-align: center; font-weight: bold"
            >8AM - 5PM</q-item-label
          >
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section class="text-white">
          <q-item-label
            overline
            class="text-white"
            style="text-align: center; font-weight: bold; font-size: 18px"
            >{{ $t('sat') }}</q-item-label
          >
          <q-item-label style="text-align: center; font-weight: bold"
            >8AM - 12PM</q-item-label
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
  <q-dialog v-model="dialog" seamless position="bottom">
    <q-card style="width: 350px">
      <q-card-section class="row justify-center wrap">
        <div class="text-weight-bold">{{ tooltipResponse }}</div>
      </q-card-section>
    </q-card>
  </q-dialog>
  <FooterComponent />
</template>

<script lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { openURL, copyToClipboard } from 'quasar';

import SocialMediaFooter from 'src/components/SocialMediaFooter.vue';
import FooterComponent from 'src/components/FooterComponent.vue';

import '../css/branches.scss';

export default {
  name: 'DrBranchPage',
  components: {
    SocialMediaFooter,
    FooterComponent,
  },
  setup() {
    const { t } = useI18n();

    const tooltipResponse = ref('');
    const iframeSource =
      'https://www.google.com/maps/embed/v1/place?q=place_id:ChIJ8VOEoNjtsY4R_dMCCAx0fK4&key=' +
      process.env.GOOGLE_MAPS_API_KEY;

    const dialog = ref(false);

    const getDirections = () => {
      openURL(
        'https://www.google.com/maps/dir/?api=1&destination=Tenares+Shipping+Corp.,+San+Marcos,+Puerto+Plata+57000,+Dominican+Republic'
      );
    };

    const call = () => {
      openURL('tel:8099700007');
    };

    const call2 = () => {
      openURL('tel:8092612373');
    };

    const email = () => {
      openURL('mailto:rd@embarquetenares.com');
    };

    const copy = (i: number) => {
      let text = '';
      let ttr = '';
      switch (i) {
        case 0:
          ttr = t('tooltipRes0');
          text = 'San Marcos #10 Puerto Plata, RD 57000';
          break;
        case 1:
          ttr = t('tooltipRes1');
          text = '8099700007';
          break;
        case 2:
          ttr = t('tooltipRes2');
          text = 'rd@embarquetenares.com';
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

    return {
      iframeSource,
      getDirections,
      call,
      copy,
      call2,
      email,
      dialog,
      tooltipResponse,
    };
  },
};
</script>
