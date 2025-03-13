<template>
  <q-page :class="{'pb-tabbar': isMobile}">
    <!-- Hero Section -->
    <section class="branch-hero bg-primary text-white q-py-lg">
      <div class="container text-center q-px-md">
        <h1 class="text-h3 text-weight-bold q-mb-md" style="font-family: 'BodoniSvtyTwoSCITCTT-Book'">
          {{ t('nyb') }}
        </h1>
        <p class="text-subtitle1 q-mb-sm">
          2249 Washington Ave Bronx, NY 10457
          <q-btn flat dense round color="white" icon="directions" @click="openUrl('https://www.google.com/maps/dir/?api=1&destination=2249+Washington+Ave,+Bronx,+NY+10457-1445,+USA')">
            <q-tooltip>{{ t('tooltip0') }}</q-tooltip>
          </q-btn>
          <q-btn flat dense round color="white" icon="content_copy" @click="copy(0)">
            <q-tooltip>{{ t('copy0') }}</q-tooltip>
          </q-btn>
        </p>
      </div>
    </section>

    <div class="container q-pa-md">
      <div class="row q-col-gutter-md">
        <!-- Map Column -->
        <div class="col-12 col-md-7">
          <q-card class="map-card full-height-map">
            <q-card-section class="q-pa-none position-relative">
              <iframe loading="eager" class="branch-map" :src="iframeSource" />
            </q-card-section>
          </q-card>
        </div>

        <!-- Contact Info Column -->
        <div class="col-12 col-md-5">
          <q-card class="contact-card q-mb-md">
            <q-card-section>

              <div class="row items-center q-mb-md">
                <q-icon name="person" color="primary" size="24px" class="q-mr-sm" />
                <div class="text-h6">{{ t('contact.branchInfo') }}</div>
              </div>
              
              <!-- Phone -->
              <div class="contact-item row items-center q-mb-md">
                <div class="col">
                  <div class="text-subtitle1">(718) 562-1300</div>
                </div>
                <div class="col-auto">
                  <q-btn flat round dense color="primary" icon="call" @click="openUrl('tel:7185621300')">
                    <q-tooltip>{{ t('tooltip1') }}</q-tooltip>
                  </q-btn>
                  <q-btn flat round dense color="grey-7" icon="content_copy" @click="copy(1)">
                    <q-tooltip>{{ t('copy1') }}</q-tooltip>
                  </q-btn>
                </div>
              </div>
              
              <!-- Email -->
              <div class="contact-item row items-center">
                <div class="col">
                  <div class="text-subtitle1">ny@embarquetenares.com</div>
                </div>
                <div class="col-auto">
                  <q-btn flat round dense color="primary" icon="email" @click="openUrl('mailto:ny@embarquetenares.com')">
                    <q-tooltip>{{ t('tooltip2') }}</q-tooltip>
                  </q-btn>
                  <q-btn flat round dense color="grey-7" icon="content_copy" @click="copy(2)">
                    <q-tooltip>{{ t('copy2') }}</q-tooltip>
                  </q-btn>
                </div>
              </div>
            </q-card-section>
          </q-card>

          <!-- Hours Card -->
          <q-card class="hours-card">
            <q-card-section>
              <div class="row items-center q-mb-md">
                <q-icon name="schedule" color="primary" size="24px" class="q-mr-sm" />
                <div class="text-h6">{{ t('hours') }}</div>
              </div>
              
              <div class="hours-grid">
                <div class="day-label">{{ t('monToSat') }}</div>
                <div class="time-value">8AM - 6PM</div>
                
                <div class="day-label">{{ t('sunday') }}</div>
                <div class="time-value">{{ t('closed') }}</div>
              </div>
            </q-card-section>
          </q-card>

          <!-- Contact Section instead of Social Media -->
          <div class="q-mt-md">
            <q-card class="contact-section-card">
              <q-card-section>
                <SocialMediaBar fontSize="1.2rem" />
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
    </div>

    <!-- Notification Dialog -->
    <q-dialog v-model="dialog" seamless position="bottom">
      <q-card style="width: 350px">
        <q-card-section class="row justify-center wrap">
          <div class="text-weight-bold">{{ tooltipResponse }}</div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- Tab bar component -->
    <TabBar
      @focus-input="focusInput"
      class="tabBar"
      v-if="isMobile"
    />
  </q-page>
</template>

<script lang="ts">
import process from 'process';
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { openURL, copyToClipboard } from 'quasar';
import { useQuasar } from 'quasar';
import TabBar from 'src/components/TabBar.vue';
import SocialMediaBar from 'src/components/SocialMediaBar.vue';

import '../css/branches.scss';

export default {
  name: 'NyBranchPage',
  components: {
    TabBar,
    SocialMediaBar
  },
  setup() {
    const { t } = useI18n();
    const $q = useQuasar();
    
    // Check if mobile
    const isMobile = computed(() => $q.platform.is.mobile);
    
    // Dummy function for TabBar focus-input event
    const focusInput = () => {
      // Navigate to the home page when track tab is clicked
      window.location.href = '/';
    };

    // State variables
    const tooltipResponse = ref('');
    const dialog = ref(false);

    const iframeSource =
      'https://www.google.com/maps/embed/v1/place?q=place_id:ChIJJ_htcnz0wokRSDrgX-Y-Cv4&key=' +
      process.env.GOOGLE_MAPS_API_KEY;

    // Function to open url to email, call or get direction
    const openUrl = (url: string) => {
      openURL(url);
    };

    // Function to copy text to clipboard
    const copy = (i: number) => {
      let text = '';
      let ttr = '';
      switch (i) {
        case 0:
          ttr = t('tooltipRes0');
          text = '2249 Washington Ave Bronx, NY 10457';
          break;
        case 1:
          ttr = t('tooltipRes1');
          text = '7185621300';
          break;
        case 2:
          ttr = t('tooltipRes2');
          text = 'ny@embarquetenares.com';
          break;
      }
      copyToClipboard(text)
        .then(() => {
          // success!
          tooltipResponse.value = ttr;
          dialog.value = true;
          setTimeout(() => {
            dialog.value = false;
          }, 3000);
        })
        .catch(() => {
          // fail
          console.log('Failed to copy to clipboard');
        });
    };

    return { iframeSource, copy, openUrl, t, isMobile, focusInput, dialog, tooltipResponse };
  },
};
</script>

<style lang="scss" scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
}

.branch-hero {
  background: linear-gradient(rgba(var(--q-primary-rgb), 0.9), rgba(var(--q-primary-rgb), 0.7)), url('/pattern.svg') repeat;
  background-size: cover;
}

.full-height-map {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.branch-map {
  width: 100%;
  height: 100%;
  min-height: 450px;
  border: none;
}

.map-card, .contact-card, .hours-card {
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  }
}

.contact-item {
  padding: 8px 0;
  border-bottom: 1px solid rgba(0,0,0,0.05);
  
  &:last-child {
    border-bottom: none;
  }
}

.hours-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  
  .day-label {
    font-weight: 600;
    color: var(--q-primary);
  }
  
  .time-value {
    text-align: right;
  }
}

.contact-section-card {
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  }
}

@media (max-width: 599px) {
  .branch-map {
    min-height: 250px;
  }
}
</style>
