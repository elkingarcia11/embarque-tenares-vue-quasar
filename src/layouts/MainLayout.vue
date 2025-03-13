<template>
  <!-- Main layout structure of the application -->
  <q-layout view="hHh lpR fFf" id="app_layout">
    <!-- Header section with toolbar -->
    <q-header>
      <q-toolbar>
        <!-- Title and language dropdown in the toolbar -->
        <q-toolbar-title class="row">
          <!-- ToolbarWrapper component for rendering toolbar content -->
          <ToolbarWrapper />

          <!-- Spacer to push items to the right -->
          <q-space />

          <!-- Language dropdown button -->
          <q-btn-dropdown
            :ripple="false"
            flat
            dense
            icon="language"
            :label="label"
            class="q-pl-lg"
            style="
              font-family: 'BodoniSvtyTwoSCITCTT-Book';
              font-weight: bolder;
            "
          >
            <!-- Language options in the dropdown -->
            <q-list class="text-h6 text-black">
              <!-- Option for switching to Español -->
              <q-item clickable v-close-popup @click="changeLanguage(1)" class="language-item">
                <q-item-section>
                  <q-item-label
                    :class="esClass"
                    style="font-family: 'BodoniSvtyTwoSCITCTT-Book'"
                    >Español</q-item-label
                  >
                </q-item-section>
              </q-item>

              <!-- Option for switching to English -->
              <q-item clickable v-close-popup @click="changeLanguage(0)" class="language-item">
                <q-item-section>
                  <q-item-label
                    :class="engClass"
                    style="font-family: 'BodoniSvtyTwoSCITCTT-Book'"
                  >
                    English
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <!-- Page container for displaying router views -->
    <q-page-container style="position: relative; min-height: 100vh; padding-bottom: 0;">
      <router-view :key="route.fullPath"></router-view>
    </q-page-container>

    <!-- Footer component -->
    <FooterComponent :class="{'pb-tabbar': isMobile}" />
  </q-layout>
</template>

<script lang="ts">
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
import { useQuasar } from 'quasar';
import FooterComponent from 'src/components/FooterComponent.vue';
import ToolbarWrapper from '../components/ToolbarWrapper.vue';

export default {
  components: {
    FooterComponent,
    ToolbarWrapper
  },
  setup() {
    const { locale } = useI18n();
    const route = useRoute();
    const $q = useQuasar();

    // Compute if the device is mobile
    const isMobile = computed(() => $q.platform.is.mobile);

    // Reactive variables for language dropdown
    const label = ref('Español');
    const engClass = ref('');
    const esClass = ref('');
    const isDesktop = $q.platform.is.desktop;

    // Function to change the application language
    const changeLanguage = (i: number) => {
      if (i === 0) {
        locale.value = 'en-US';
        label.value = 'English';
        engClass.value = 'text-bold';
        esClass.value = '';
      } else {
        locale.value = 'es-US';
        label.value = 'Español';
        esClass.value = 'text-bold';
        engClass.value = '';
      }
    };

    return {
      label,
      esClass,
      engClass,
      changeLanguage,
      route,
      isDesktop,
      isMobile
    };
  },
};
</script>

<style lang="scss" scoped>
.language-selector {
  border-radius: 8px;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 8px;
  }
}

.language-item {
  border-radius: 8px;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
}
</style>
