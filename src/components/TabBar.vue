<template>
  <q-page-sticky position="bottom" class="window-width" :offset="[18, 18]">
    <q-card class="tab-bar">
      <q-btn-toggle
        spread
        :ripple="false"
        @click="open()"
        v-model="buttonGroup"
        text-color="primary"
        toggle-color="white"
        toggle-text-color="secondary"
        :options="[
          { value: 1, slot: 'one' },
          { value: 2, slot: 'two' },
          { value: 3, slot: 'three' },
          { value: 4, slot: 'four' },
        ]"
      >
        <template v-slot:one>
          <div class="q-py-md column items-center no-wrap btn-tgle">
            <q-icon center name="search" />
            <div class="text-center labels">
              {{ $t('track') }}
            </div>
          </div>
        </template>
        <template v-slot:two>
          <div class="q-py-md column items-center no-wrap btn-tgle">
            <q-icon center name="local_atm" />
            <div class="text-center labels">
              {{ $t('rates') }}
            </div>
          </div>
        </template>

        <template v-slot:three>
          <div class="q-py-md column items-center no-wrap btn-tgle">
            <q-icon center name="domain" />
            <div class="text-center labels">
              {{ $t('branch') }}
            </div>
          </div>
        </template>

        <template v-slot:four>
          <div class="q-py-md column items-center no-wrap btn-tgle">
            <q-icon center name="quiz" />
            <div class="text-center labels">
              {{ $t('faqs') }}
            </div>
          </div>
        </template>
      </q-btn-toggle>
    </q-card>
  </q-page-sticky>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';

export default defineComponent({
  setup() {
    return {
      buttonGroup: ref(0),
    };
  },
  methods: {
    open() {
      if (this.buttonGroup === 1) {
        this.buttonGroup = 1;
        this.$emit('tabOne');
      } else if (this.buttonGroup === 2) {
        this.buttonGroup = 2;
        this.$emit('tabTwo');
      } else if (this.buttonGroup === 3) {
        this.buttonGroup = 3;
        this.$emit('tabThree');
      } else {
        this.buttonGroup = 4;
        this.$emit('tabFour');
      }
    },
  },
});
</script>
