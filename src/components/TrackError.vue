<template>
  <div class="q-py-xl q-px-lg flex flex-center circularProg">
    <q-card>
      <q-card-section>
        <div class="text-h5 text-center">Invoice not found</div>
      </q-card-section>
      <q-card-section class="text-h5 text-center">
        <q-avatar
          size="100px"
          font-size="100px"
          text-color="primary"
          icon="sentiment_very_dissatisfied"
        />
      </q-card-section>
      <q-card-section
        class="text-h6 text-center text-accent text-bold q-px-lg flex-wrap"
      >
        {{ $t('invoiceNumber') }} {{ invoice }}
        {{ $t('cNBF') }}
      </q-card-section>
      <q-card-section class="text-italic text-bold text-center">
        {{ $t('tryAgain') }}
      </q-card-section>
    </q-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import '../css/track.scss';

export default defineComponent({
  props: {
    invoice: String,
  },
});
</script>
