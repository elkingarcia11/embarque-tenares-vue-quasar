<template>
  <q-page :class="{'pb-tabbar': isMobile}">
        <!-- Invoice tracking form -->
        <q-form @submit="submit" class="invoiceForm">
      <q-input
        ref="invoiceInputRef"
        square
        class="bg-white"
        outlined
        @blur="handleDismiss"
        v-model="invoiceText"
        :label="t('trackPack')"
      >
        <template v-slot:append>
          <!-- Button to open the invoice dialog -->
          <q-btn
            flat
            round
            color="secondary"
            icon="quiz"
            @click="invoiceDialog = true"
          />
        </template>
      </q-input>
    </q-form>

    <!-- SEO Component -->
    <SeoComponent pageType="home" />

    <!-- SEO Content Section - Visible to users and search engines -->
    <section class="seo-content q-pa-md q-mb-xl">
      <div class="container content-container">
         <div class="row flex-center">
          <q-img
            id="logo"
            src="/logo.png"
            fit="contain"
            :style="dynamicHeight"
          />
        </div>


        
        <h1 class="text-h4 text-weight-bold text-center q-mb-md">
          {{ t('homePage.seo.title') }}
        </h1>
        <p class="text-body1 text-center q-mb-lg">
          {{ t('homePage.seo.description') }}
        </p>
        <div class="row q-col-gutter-md q-mb-xl">
          <div class="col-12 col-md-4" v-for="(service, index) in shippingServices" :key="index">
            <q-card class="service-card q-pa-md">
              <q-card-section>
                <h2 class="text-h6 text-weight-bold">{{ t(service.title) }}</h2>
                <p>{{ t(service.description) }}</p>
              </q-card-section>
            </q-card>
          </div>
        </div>
        
        <!-- Shipping Locations Section -->
        <div class="q-mt-xl section-divider">
          <h2 class="text-h5 text-weight-bold text-center q-mb-md">
            {{ t('homePage.seo.locations.title') }}
          </h2>
          <p class="text-body1 text-center q-mb-lg">
            {{ t('homePage.seo.locations.description') }}
          </p>
          <div class="row justify-center q-mt-md">
            <div class="col-12 col-md-10">
              <q-card class="location-card q-pa-md">
                <q-card-section>
                  <div class="row q-col-gutter-sm">
                    <div class="col-6 col-sm-3 q-pa-xs">
                      <div class="location-item text-center">
                        <div class="text-weight-medium">New York City</div>
                      </div>
                    </div>
                    <div class="col-6 col-sm-3 q-pa-xs">
                      <div class="location-item text-center">
                        <div class="text-weight-medium">Brooklyn</div>
                      </div>
                    </div>
                    <div class="col-6 col-sm-3 q-pa-xs">
                      <div class="location-item text-center">
                        <div class="text-weight-medium">Queens</div>
                      </div>
                    </div>
                    <div class="col-6 col-sm-3 q-pa-xs">
                      <div class="location-item text-center">
                        <div class="text-weight-medium">Bronx</div>
                      </div>
                    </div>
                    <div class="col-6 col-sm-3 q-pa-xs">
                      <div class="location-item text-center">
                        <div class="text-weight-medium">Manhattan</div>
                      </div>
                    </div>
                    <div class="col-6 col-sm-3 q-pa-xs">
                      <div class="location-item text-center">
                        <div class="text-weight-medium">Long Island</div>
                      </div>
                    </div>
                    <div class="col-6 col-sm-3 q-pa-xs">
                      <div class="location-item text-center">
                        <div class="text-weight-medium">New Jersey</div>
                      </div>
                    </div>
                    <div class="col-6 col-sm-3 q-pa-xs">
                      <div class="location-item text-center">
                        <div class="text-weight-medium">Connecticut</div>
                      </div>
                    </div>
                    <div class="col-6 col-sm-3 q-pa-xs">
                      <div class="location-item text-center">
                        <div class="text-weight-medium">Yonkers</div>
                      </div>
                    </div>
                    <div class="col-6 col-sm-3 q-pa-xs">
                      <div class="location-item text-center">
                        <div class="text-weight-medium">Mount Vernon</div>
                      </div>
                    </div>
                    <div class="col-6 col-sm-3 q-pa-xs">
                      <div class="location-item text-center">
                        <div class="text-weight-medium">Upstate NY</div>
                      </div>
                    </div>
                    <div class="col-6 col-sm-3 q-pa-xs">
                      <div class="location-item text-center">
                        <div class="text-weight-medium">North Carolina</div>
                      </div>
                    </div>
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </div>
        </div>
      </div>
    </section>




    <!-- Invoice dialog -->
    <q-dialog v-model="invoiceDialog" transition-hide="slide-down">
      <q-card>
        <q-toolbar class="bg-primary">
          <div class="text-white text-center q-px-sm q-py-md dialogToolbar">
            <!-- Title of the invoice dialog -->
            {{ t('findInv') }}<span class="text-weight-bold">{{ t('findInvTwo') }}</span>
          </div>
        </q-toolbar>
        <q-separator />
        <q-card-section class="row full-height justify-center">
          <!-- Display an image based on the selected locale -->
          <q-img
            loading="eager"
            v-if="locale == 'en-US'"
            class="self-center"
            id="logo"
            fit="contain"
            src="/assets/trackEN.png"
          />
          <q-img
            loading="eager"
            v-else
            class="self-center"
            id="logo"
            fit="contain"
            src="/assets/trackES.png"
          />
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- Tab bar component -->
    <TabBar
      @focus-input="focusInput"
      class="tabBar"
      v-if="isMobile"
      :is-dismissed="isDismissed"
    />
  </q-page>
</template>

<script lang="ts">
import { Ref, computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { QInput, useQuasar, useMeta } from 'quasar';
import { defineComponent } from 'vue';
import TabBar from 'src/components/TabBar.vue';
import SeoComponent from 'src/components/SeoComponent.vue';

import '../css/app.scss';

export default defineComponent({
  name: 'IndexPage',
  components: {
    TabBar,
    SeoComponent
  },
  setup() {
    // State variables
    const isDismissed = ref(false);
    const invoiceText = ref('');
    const invoiceDialog = ref(false);
    const invoiceInputRef: Ref<QInput | null> = ref(null);

    // Access Quasar utilities
    const $router = useRouter();
    const $q = useQuasar();
    const { t, locale } = useI18n();
    
    // Check if mobile
    const isMobile = computed(() => $q.platform.is.mobile);
    
    // Dynamic height for logo based on screen size
    const dynamicHeight = computed(() => {
      return $q.screen.lt.md ? 'height: 23vh' : 'height: 40vh';
    });

    // SEO metadata
    useMeta(() => {
      return {
        title: 'Embarque Tenares - Envío puerta a puerta a República Dominicana',
        meta: {
          description: { name: 'description', content: 'Embarque Tenares specializes in shipping boxes, barrels, and all kinds of cargo door-to-door from the United States to the Dominican Republic. Fast, secure, and reliable service.' },
          keywords: { name: 'keywords', content: 'shipping to Dominican Republic, boxes to Dominican Republic, barrels to Dominican Republic, door-to-door shipping, envios a Republica Dominicana, cajas a Republica Dominicana' }
        }
      }
    });

    // Shipping services for SEO content
    const shippingServices = [
      {
        title: 'homePage.services.boxes.title',
        description: 'homePage.services.boxes.description'
      },
      {
        title: 'homePage.services.barrels.title',
        description: 'homePage.services.barrels.description'
      },
      {
        title: 'homePage.services.doorToDoor.title',
        description: 'homePage.services.doorToDoor.description'
      }
    ];

    // Features for the homepage
    const features = [
      {
        icon: 'security',
        title: 'home.features.secure.title',
        description: 'home.features.secure.description'
      },
      {
        icon: 'support_agent',
        title: 'home.features.support.title',
        description: 'home.features.support.description'
      }
    ];


    // Function to handle input blur event
    const handleDismiss = () => {
      isDismissed.value = true;
    };

    // Focus the input element
    const focusInput = () => {
      isDismissed.value = false;
      const inputEl = invoiceInputRef.value?.$el.querySelector('input');
      inputEl?.focus();
    };

    // Blur the input element
    const blurInput = () => {
      const inputEl = invoiceInputRef.value?.$el.querySelector('input');
      inputEl?.blur();
    };

    // Show a notification
    const showNotif = () => {
      $q.notify({
        message: t('invalidInvoice'),
        type: 'negative',
        icon: 'error',
      });
    };

    // Handle form submission
    const submit = () => {
      if (invoiceText.value === '') {
        blurInput();
      } else if (Number.isInteger(parseInt(invoiceText.value, 10))) {
        const n = Number(invoiceText.value);
        if (n > 0) {
          blurInput();
          $router.push({
            name: 'search',
            params: { invoice: invoiceText.value },
          });
        } else {
          showNotif();
        }
      } else {
        if (invoiceInputRef.value !== undefined) {
          blurInput();
        }
        showNotif();
      }
    };

    // Return data and methods for the component
    return {
      invoiceDialog,
      invoiceInputRef,
      invoiceText,
      isDismissed,
      focusInput,
      handleDismiss,
      submit,
      t,
      locale,
      showNotif,
      shippingServices,
      features,
      isMobile,
      dynamicHeight
    };
  },
});
</script>

<style lang="scss" scoped>
.seo-content {
  background-color: #f5f8fa; /* Match the app background color */
  padding-top: 2rem;
  padding-bottom: 2rem;
}

.content-container {
  max-width: 1200px;
  margin: 0 auto;
}

.logo {
  max-width: 80%;
  object-fit: contain;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 10px;
  border-radius: 8px;
  margin-left: auto;
  margin-right: auto;
  display: block;
}

@media (min-width: 768px) {
  .logo {
    max-width: 60%;
  }
}

.service-card {
  height: 100%;
  transition: transform 0.3s ease;
  background-color: white;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  }
}

.location-card {
  background-color: white;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
}

.location-item {
  padding: 0.75rem;
  border-radius: 8px;
  background-color: rgba($primary, 0.05);
  transition: all 0.3s ease;
  border: 1px solid rgba($primary, 0.1);
  
  &:hover {
    background-color: rgba($primary, 0.1);
    transform: translateY(-2px);
  }
}

.section-divider {
  position: relative;
  padding-top: 1.5rem;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 50px;
    height: 3px;
    background-color: rgba($primary, 0.2);
    border-radius: 3px;
  }
}
</style>
