<template>
  <div class="q-py-xl q-px-lg flex flex-center">
    <q-card>
      <q-card-section>
        <div class="text-h5 text-center">{{ $t('etod') }}</div>
        <div class="text-h6 text-center text-accent text-bold">
          {{ eta }}
        </div>
      </q-card-section>
      <q-card-section class="text-center">
        <q-circular-progress
          :angle="180"
          :value="percent"
          show-value
          font-size="25px"
          size="250px"
          :thickness="0.125"
          color="accent"
          track-color="grey-3"
          class="q-ma-md"
        >
          <q-item-section class="flex-center">
            <q-avatar
              class=""
              size="75px"
              font-size="52px"
              text-color="accent"
              icon="local_shipping"
            />
            <q-item-label class="text-black">{{ daysLeft }}</q-item-label>
            <q-item-label caption>{{ $t('daysLeft') }}</q-item-label>
          </q-item-section>
        </q-circular-progress>
      </q-card-section>
      <q-card-section class="text-italic text-bold text-center">
        {{ $t('etaDisclaimer') }}</q-card-section
      >
    </q-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    percent: Number,
    daysLeft: Number,
    eta: String,
  },
});
</script>
