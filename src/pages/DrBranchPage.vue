<template>
  <!-- Main content of the Dominican Republic branch page -->

  <!-- Display the branch label using i18n translation -->
  <q-item-section
    class="q-py-lg text-h4 text-bold text-center"
    style="font-family: 'BodoniSvtyTwoSCITCTT-Book'"
  >
    <!-- Display the branch label using i18n translation -->
    {{ $t('drb') }}
  </q-item-section>

  <!-- Card to display branch information and actions -->
  <q-card class="my-card q-mt-sm">
    <!-- Google Maps embedded iframe for location -->
    <iframe loading="lazy" class="iframe" :src="iframeSource" />

    <!-- Button to get directions to the branch -->
    <q-card-section class="q-pa-none q-ma-none">
      <q-btn
        fab
        @click="
          openUrl(
            'https://www.google.com/maps/dir/?api=1&destination=Tenares+Shipping+Corp.,+San+Marcos,+Puerto+Plata+57000,+Dominican+Republic'
          )
        "
        color="primary"
        icon="directions"
        class="absolute"
        style="top: 0; right: 12px; transform: translateY(-50%)"
      >
        <!-- Tooltip for the get directions button -->
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

    <!-- Card actions section with contact information buttons -->
    <q-card-actions class="q-pt-sm">
      <!-- Call button for the primary phone number -->
      <q-btn
        @click="openUrl('tel:8099700007')"
        flat
        round
        color="primary"
        icon="call"
      />

      <!-- Button to copy primary phone number to clipboard -->
      <q-btn @click="copy(1)" flat color="black">
        <!-- Tooltip for the copy phone number button -->
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

    <!-- Card actions for the secondary phone number -->
    <q-card-actions>
      <!-- Call button for the secondary phone number -->
      <q-btn
        @click="openUrl('tel:8092612373')"
        flat
        round
        color="primary"
        icon="call"
      />
      <q-btn @click="openUrl('tel:8092612373')" flat color="black">
        (809) 261-2373
      </q-btn>
      <q-space />

      <!-- Button to copy secondary phone number to clipboard -->
      <q-btn @click="copy(2)" round flat icon="content_copy" color="grey-7">
        <!-- Tooltip for the copy email button -->
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

    <!-- Card actions for the email -->
    <q-card-actions>
      <!-- Email button to send email -->
      <q-btn
        @click="openUrl('mailto:rd@embarquetenares.com')"
        flat
        round
        color="primary"
        icon="email"
      />
      <q-btn
        @click="openUrl('mailto:rd@embarquetenares.com')"
        flat
        color="black"
        no-caps
      >
        rd@embarquetenares.com
      </q-btn>
      <q-space />

      <!-- Button to copy email to clipboard -->
      <q-btn @click="copy(3)" round flat icon="content_copy" color="grey-7">
        <!-- Tooltip for the copy email button -->
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

    <!-- Expansion item to show branch schedule -->
    <q-expansion-item
      id="schedule_expansion_item"
      icon="schedule"
      :label="$t('hours')"
      header-class="text-black text-bold q-py-md"
      expand-icon-class="text-black text-bold"
      header-style="
  border-bottom-style: solid; border-color:lightgrey; border-width: 0.25px;"
    >
      <!-- Schedule information for different days -->
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

    <!-- Include the SocialMediaFooter component for social media links -->
    <SocialMediaFooter />

    <!-- Dialog to show tooltip response after copying to clipboard -->
    <q-dialog v-model="dialog" seamless position="bottom">
      <q-card style="width: 350px">
        <q-card-section class="row justify-center wrap">
          <div class="text-weight-bold">{{ tooltipResponse }}</div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-card>
</template>

<script lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { openURL, copyToClipboard } from 'quasar';

import process from 'process';
import SocialMediaFooter from 'src/components/SocialMediaFooter.vue';

import '../css/branches.scss';

export default {
  name: 'DrBranchPage',
  components: {
    SocialMediaFooter,
  },
  setup() {
    const { t } = useI18n();

    // Reactive variables for tooltip response and iframe source
    const tooltipResponse = ref('');
    const iframeSource =
      'https://www.google.com/maps/embed/v1/place?q=place_id:ChIJ8VOEoNjtsY4R_dMCCAx0fK4&key=' +
      process.env.GOOGLE_MAPS_API_KEY;

    const dialog = ref(false);

    // Function to handle url's of calling, email and directions
    const openUrl = (url: string) => {
      openURL(url);
    };

    // Function to copy text to clipboard based on the given index
    const copy = (i: number) => {
      let text = '';
      let ttr = '';
      switch (i) {
        case 1:
          ttr = t('tooltipRes1');
          text = '8099700007';
          break;
        case 2:
          ttr = t('tooltipRes1');
          text = '8092612373';
          break;
        case 3:
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
      copy,
      openUrl,
      iframeSource,
      dialog,
      tooltipResponse,
    };
  },
};
</script>
