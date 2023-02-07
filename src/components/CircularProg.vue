<template>
  <div class="q-py-xl q-px-lg flex flex-center">
    <q-card>
      <q-card-section>
        <div class="text-h6 text-center">Estimated Time of Delivery</div>
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
          <div class="flex column text-center">
            <q-item-section>
              <q-avatar
                size="75px"
                font-size="52px"
                text-color="primary"
                icon="local_shipping"
              />
              <q-item-label>{{ daysLeft }}</q-item-label>
              <q-item-label caption>days left</q-item-label>
            </q-item-section>
          </div>
        </q-circular-progress>
      </q-card-section>
      <q-card-section class="text-italic text-bold text-center">
        Delivery dates provided are an estimate and subject to change
      </q-card-section>
    </q-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    percent: Number,
    daysLeft: Number,
  },
});
</script>
