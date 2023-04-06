<template>
  <q-card class="tab-bar tabBarContainer">
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

  <q-dialog v-model="dialog">
    <q-card class="q-px-sm q-py-md">
      <q-card-section>
        <div class="text-h5" style="font-family: 'BodoniSvtyTwoSCITCTT-Book'">
          {{ $t('branch') }}
        </div>
      </q-card-section>

      <q-item
        clickable
        v-ripple:grey
        color="grey-3"
        @click="$router.push('ny-branch')"
      >
        <q-item-section avatar>
          <q-avatar color="secondary" text-color="white" icon="pin_drop" />
        </q-item-section>

        <q-item-section class="text-h6">{{ $t('ny') }}</q-item-section>
      </q-item>
      <q-item
        clickable
        v-ripple:grey
        color="grey-3"
        @click="$router.push('dr-branch')"
      >
        <q-item-section avatar>
          <q-avatar color="accent" text-color="white" icon="pin_drop" />
        </q-item-section>

        <q-item-section class="text-h6">{{ $t('dr') }}</q-item-section>
      </q-item>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { ref, defineComponent, watch } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'TabBar',
  props: {
    isDismissed: Boolean,
  },
  setup(props, { emit }) {
    const $router = useRouter();

    const dialog = ref(false);

    const buttonGroup = ref(0);

    const open = () => {
      if (buttonGroup.value === 1) {
        emit('focusInput');
      } else if (buttonGroup.value === 2) {
        $router.push('rates');
      } else if (buttonGroup.value === 3) {
        dialog.value = true;
      } else {
        $router.push('faqs');
      }
    };

    watch(
      () => props.isDismissed,
      (newVal) => {
        // Accessing component variable from watch function
        if (newVal) {
          buttonGroup.value = 0;
        } else {
          buttonGroup.value = 1;
        }
      }
    );

    return {
      dialog,
      buttonGroup,
      open,
    };
  },
});
</script>
