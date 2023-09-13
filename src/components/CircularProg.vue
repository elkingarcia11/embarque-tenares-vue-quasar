<template>
  <!-- The main component template -->
  <div class="q-px-lg flex flex-center circularProg">
    <q-card class="q-px-xl q-py-lg">
      <!-- Card section for main content -->
      <q-card-section>
        <!-- Display the "Estimated Time of Delivery" -->
        <div class="text-h5 text-center">{{ $t('etod') }}</div>

        <!-- Display the formatted date -->
        <div class="text-h6 text-center text-accent text-bold">
          {{ dateToShow }}
        </div>
      </q-card-section>

      <!-- Card section for circular progress bar -->
      <q-card-section class="text-center">
        <q-circular-progress
          :angle="180"
          :value="percent"
          show-value
          font-size="25px"
          size="250px"
          :thickness="0.125"
          color="primary"
          track-color="grey-3"
          class="q-ma-md"
        >
          <q-item-section class="flex-center">
            <!-- Display an avatar icon -->
            <q-avatar
              size="75px"
              font-size="52px"
              text-color="primary"
              icon="local_shipping"
            />

            <!-- Display the label "Invoice" and the invoice number -->
            <q-item-label caption>{{ $t('invoice') }}</q-item-label>
            <q-item-label class="text-black">{{ invoice }}</q-item-label>
          </q-item-section>
        </q-circular-progress>
      </q-card-section>

      <!-- Card section for ETA disclaimer -->
      <q-card-section class="text-italic text-bold text-center">
        {{ $t('etaDisclaimer') }}</q-card-section
      >
    </q-card>
  </div>
</template>

<script>
// Import the component's CSS styles
import '../css/track.scss';

export default {
  props: {
    // Percentage value for the circular progress bar
    percent: Number,
    // Invoice number
    invoice: String,
    // Estimated delivery date in English
    enDate: String,
    // Estimated delivery date in Spanish
    esDate: String,
  },
  computed: {
    // Compute the appropriate date to show based on the current locale
    dateToShow() {
      return this.$i18n.locale === 'en-US' ? this.enDate : this.esDate;
    },
  },
};
</script>
