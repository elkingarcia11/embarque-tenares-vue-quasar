<template>
  <!-- Component for displaying an error message related to tracking -->
  <div class="q-mx-lg flex flex-center circularProg">
    <q-card class="q-px-md q-py-lg myCard">
      <!-- Header section with error message -->
      <q-card-section>
        <div class="text-h5 text-center">{{ t('invNf') }}</div>
      </q-card-section>

      <!-- Avatar section with sad face icon -->
      <q-card-section class="text-h5 text-center">
        <q-avatar
          size="100px"
          font-size="100px"
          text-color="primary"
          icon="sentiment_very_dissatisfied"
        />
      </q-card-section>

      <!-- Information section with invoice details and message -->
      <q-card-section
        class="text-h6 text-center text-accent text-bold q-px-lg flex-wrap"
      >
        {{ t('invoiceNumber') }} {{ invoice }}
        {{ t('cNBF') }}
      </q-card-section>

      <!-- Section with italic and bold text for trying again -->
      <q-card-section class="text-italic text-bold text-center">
        {{ t('tryAgain') }}
      </q-card-section>
    </q-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';
import '../css/track.scss';

export default defineComponent({
  name: 'TrackError',
  props: {
    invoice: String, // Prop for passing the invoice number
  },
  setup() {
    const { t } = useI18n();
    return { t };
  }
});
</script>
