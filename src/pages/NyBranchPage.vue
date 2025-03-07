<template>
  <!-- Main content of the New York branch page -->
  <q-item-section
    class="q-py-lg text-h4 text-bold text-center"
    style="font-family: 'BodoniSvtyTwoSCITCTT-Book'"
  >
    <!-- Title of the branch -->{{ t('nyb') }}
  </q-item-section>

  <!-- Card containing branch information -->
  <q-card class="my-card q-mt-sm">
    <!-- Google Maps embedded iframe -->
    <iframe loading="eager" class="iframe" :src="iframeSource" />

    <!-- Button for getting directions -->
    <q-card-section class="q-pa-none q-ma-none">
      <q-btn
        fab
        @click="
          openUrl(
            'https://www.google.com/maps/dir/?api=1&destination=2249+Washington+Ave,+Bronx,+NY+10457-1445,+USA'
          )
        "
        color="primary"
        icon="directions"
        class="absolute"
        style="top: 0px; right: 0px; transform: translateY(-50%)"
      >
        <!-- Tooltip for the button -->
        <q-tooltip
          transition-show="scale"
          transition-hide="scale"
          anchor="bottom middle"
          self="center middle"
        >
          <strong>{{ t('tooltip0') }}</strong></q-tooltip
        ></q-btn
      >
    </q-card-section>

    <!-- Card actions for contact information -->
    <q-card-actions class="q-pt-sm">
      <!-- Button to call the branch -->
      <q-btn
        @click="openUrl('tel:7185621300')"
        flat
        round
        color="primary"
        icon="call"
      />

      <!-- Button to copy phone number -->
      <q-btn @click="copy(1)" flat color="black">
        <q-tooltip
          transition-show="scale"
          transition-hide="scale"
          anchor="bottom middle"
          self="center middle"
        >
          <strong>{{ t('copy1') }}</strong>
        </q-tooltip>
        (718) 562-1300
      </q-btn>
      <q-space />
    </q-card-actions>
    <q-card-actions>
      <!-- Buttons to email the branch -->
      <q-btn
        @click="openUrl('mailto:ny@embarquetenares.com')"
        flat
        round
        color="primary"
        icon="email"
      />
      <q-btn
        @click="openUrl('mailto:ny@embarquetenares.com')"
        flat
        color="black"
        no-caps
      >
        ny@embarquetenares.com
      </q-btn>
      <q-space />
      <!-- Button to copy email address -->
      <q-btn @click="copy(2)" round flat icon="content_copy" color="grey-7">
        <q-tooltip
          transition-show="scale"
          transition-hide="scale"
          anchor="bottom middle"
          self="center middle"
        >
          <strong>{{ t('copy2') }} </strong>
        </q-tooltip></q-btn
      >
    </q-card-actions>

    <!-- Expansion item for displaying branch hours -->
    <q-expansion-item
      id="schedule_expansion_item"
      icon="schedule"
      :label="t('hours')"
      header-class="text-black text-bold q-py-md"
      expand-icon-class="text-black text-bold"
      header-style="
  border-bottom-style: solid; border-color:lightgrey; border-width: 0.25px;"
    >
      <!-- Opening hours for the branch -->
      <q-item class="text-white" style="padding-top: 1.5vh">
        <q-item-section>
          <q-item-label
            overline
            class="text-white"
            style="text-align: center; font-weight: bold; font-size: 18px"
            >{{ t('monToSat') }}</q-item-label
          >
          <q-item-label style="text-align: center; font-weight: bold"
            >8AM - 6PM</q-item-label
          >
        </q-item-section>
      </q-item>

      <!-- Closing hours for the branch -->
      <q-item class="text-white" style="padding-bottom: 1vh">
        <q-item-section>
          <q-item-label
            overline
            class="text-white"
            style="text-align: center; font-weight: bold; font-size: 18px"
            >{{ t('sunday') }}</q-item-label
          >
          <q-item-label style="text-align: center; font-weight: bold">{{
            t('closed')
          }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-expansion-item>

    <!-- Social media footer component -->
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
    // Access i18n translation function
    const { t } = useI18n();

    // State variables
    const tooltipResponse = ref('');
    const dialog = ref(false);

    const iframeSource =
      'https://www.google.com/maps/embed/v1/place?q=place_id:ChIJJ_htcnz0wokRSDrgX-Y-Cv4&key=' +
      process.env.GOOGLE_MAPS_API_KEY;

    // Funciton to open url to email, call or get direction
    const openUrl = (url: string) => {
      openURL(url);
    };

    // Function to copy text to clipboard
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

    return { iframeSource, copy, openUrl, t };
  },
};
</script>
