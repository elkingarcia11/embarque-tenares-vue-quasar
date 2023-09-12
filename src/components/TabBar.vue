<template>
  <!-- Tab bar with button toggle -->
  <q-card class="tab-bar">
    <q-btn-toggle
      spread
      :ripple="false"
      @click="open()"
      v-model="buttonGroup"
      text-color="primary"
      toggle-color="white"
      toggle-text-color="secondary"
      :options="tabOptions"
    >
      <!-- Template for each tab option -->
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

  <!-- Dialog for branch selection -->
  <q-dialog v-model="dialog">
    <q-card class="q-px-sm q-py-md">
      <q-card-section>
        <div class="text-h5" style="font-family: 'BodoniSvtyTwoSCITCTT-Book'">
          {{ $t('branch') }}
        </div>
      </q-card-section>

      <!-- List of branch options -->
      <q-item
        clickable
        v-ripple:grey
        color="grey-3"
        v-for="(branch, index) in branchOptions"
        :key="index"
        @click="$router.push(branch.route)"
      >
        <q-item-section avatar>
          <q-avatar
            :color="branch.color"
            text-color="white"
            :icon="branch.icon"
          />
        </q-item-section>

        <q-item-section class="text-h6">{{ $t(branch.label) }}</q-item-section>
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
    const buttonGroup = ref(0); // Default selected tab

    // Tab options configuration
    const tabOptions = [
      { value: 1, slot: 'one' },
      { value: 2, slot: 'two' },
      { value: 3, slot: 'three' },
      { value: 4, slot: 'four' },
    ];

    // Branch options configuration
    const branchOptions = [
      { icon: 'pin_drop', label: 'ny', route: 'ny-branch', color: 'secondary' },
      { icon: 'pin_drop', label: 'dr', route: 'dr-branch', color: 'accent' },
    ];

    // Handle tab button clicks
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

    // Watch for changes in 'isDismissed' prop
    watch(
      () => props.isDismissed,
      (newVal) => {
        // Accessing component variable from watch function
        buttonGroup.value = newVal ? 0 : 1;
      }
    );

    return { branchOptions, tabOptions, dialog, buttonGroup, open };
  },
});
</script>
