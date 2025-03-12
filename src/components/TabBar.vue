<template>
  <!-- Tab bar with button toggle - now fixed to bottom of screen -->
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
            {{ t('track') }}
          </div>
        </div>
      </template>
      <template v-slot:two>
        <div class="q-py-md column items-center no-wrap btn-tgle">
          <q-icon center name="local_atm" />
          <div class="text-center labels">
            {{ t('rates') }}
          </div>
        </div>
      </template>

      <template v-slot:three>
        <div class="q-py-md column items-center no-wrap btn-tgle">
          <q-icon center name="domain" />
          <div class="text-center labels">
            {{ t('branch') }}
          </div>
        </div>
      </template>

      <template v-slot:four>
        <div class="q-py-md column items-center no-wrap btn-tgle">
          <q-icon center name="quiz" />
          <div class="text-center labels">
            {{ t('faqs') }}
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
          {{ t('branch') }}
        </div>
      </q-card-section>

      <!-- List of branch options -->
      <q-item
        clickable
        v-ripple:grey
        color="grey-3"
        v-for="(branch, index) in branchOptions"
        :key="index"
        @click="router.push(branch.route)"
      >
        <q-item-section avatar>
          <q-avatar
            :color="branch.color"
            text-color="white"
            :icon="branch.icon"
          />
        </q-item-section>

        <q-item-section class="text-h6">{{ t(branch.label) }}</q-item-section>
      </q-item>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { ref, defineComponent, watch, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'TabBar',
  props: {
    isDismissed: Boolean,
  },
  setup(props, { emit }) {
    const router = useRouter();
    const route = useRoute();
    const { t } = useI18n();
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

    // Set the active tab based on the current route
    const setActiveTab = () => {
      const path = route.path;
      
      // Default to no selection (0) for home page
      if (path === '/' || path === '') {
        buttonGroup.value = 0;
      } 
      // Track page - tab 1
      else if (path.includes('/track')) {
        buttonGroup.value = 1;
      } 
      // Rates page - tab 2
      else if (path.includes('/rates')) {
        buttonGroup.value = 2;
      } 
      // Branch pages - tab 3
      else if (path.includes('/ny-branch') || path.includes('/dr-branch')) {
        buttonGroup.value = 3;
      } 
      // FAQs page - tab 4
      else if (path.includes('/faqs')) {
        buttonGroup.value = 4;
      } 
      // Default to no selection for other pages
      else {
        buttonGroup.value = 0;
      }
    };

    // Set the active tab on component mount
    onMounted(() => {
      setActiveTab();
    });

    // Watch for route changes to update the active tab
    watch(
      () => route.path,
      () => {
        setActiveTab();
      }
    );

    // Handle tab button clicks
    const open = () => {
      if (buttonGroup.value === 1) {
        emit('focusInput');
      } else if (buttonGroup.value === 2) {
        router.push('rates');
      } else if (buttonGroup.value === 3) {
        dialog.value = true;
      } else {
        router.push('faqs');
      }
    };

    // Watch for changes in 'isDismissed' prop
    watch(
      () => props.isDismissed,
      (newVal) => {
        // Only update if we're on the home page (track tab)
        if (route.path === '/' || route.path === '') {
          buttonGroup.value = newVal ? 0 : 1;
        }
      },
      { immediate: true } // Run immediately to set initial state
    );

    return { branchOptions, tabOptions, dialog, buttonGroup, open, t, router };
  },
});
</script>
