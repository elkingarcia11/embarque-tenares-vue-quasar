<template>
  <q-page :class="{'pb-tabbar': isMobile}" class="policy-page">
    <!-- Hero Section -->
    <section class="hero-section bg-primary text-white q-py-lg">
      <div class="container text-center q-px-md">
        <h1 class="text-h3 text-weight-bold q-mb-md">
          {{ t('policy') }}
        </h1>
      </div>
    </section>

    <!-- Policy Section -->
    <section class="q-py-lg">
      <div class="container q-px-md q-mx-auto" style="max-width: 900px;">
        <div class="row justify-center">
          <div class="col-12 col-md-10">
            <q-card flat bordered class="policy-card q-pa-lg q-mb-lg">
              <!-- Display the disclaimer heading -->
              <h4 class="text-center q-mb-lg">
                {{ t('disclaimer') }}
              </h4>

              <!-- Loop through policies and display each policy as a list item -->
              <q-list separator>
                <q-item v-for="policy in policies" :key="policy" class="q-py-md">
                  <q-item-section avatar>
                    <!-- Display a chevron-right icon in an avatar for each policy -->
                    <q-avatar icon="chevron_right" color="primary" text-color="white" />
                  </q-item-section>

                  <q-item-section>
                    <!-- Display the policy content based on its localized key -->
                    <q-item-label class="text-body1">
                      {{ t(`policy${policy}`) }}
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card>

            <!-- Display additional information about the company's backing -->
            <div class="text-center text-subtitle1 q-mt-lg text-weight-medium">
              {{ t('companyBacking') }}
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Tab bar component -->
    <TabBar
      @focus-input="focusInput"
      class="tabBar"
      v-if="isMobile"
    />
  </q-page>
</template>

<script lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useQuasar } from 'quasar';
import { computed } from 'vue';
import TabBar from 'src/components/TabBar.vue';

export default {
  name: 'shipping-policy',
  components: {
    TabBar
  },
  setup() {
    const { t } = useI18n();
    const $q = useQuasar();
    const policies = ref<string[]>();

    // Check if mobile
    const isMobile = computed(() => $q.platform.is.mobile);

    // Initialize the policies with numbers from 1 to 15
    policies.value = [
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '10',
      '11',
      '12',
      '13',
      '14',
      '15',
    ];

    // Dummy function for TabBar focus-input event
    const focusInput = () => {
      // Navigate to the home page when track tab is clicked
      window.location.href = '/';
    };

    // Return the policies reference to be used in the template
    return { 
      policies, 
      t, 
      isMobile,
      focusInput
    };
  },
};
</script>

<style lang="scss" scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
}

.hero-section {
  background: linear-gradient(rgba(var(--q-primary-rgb), 0.9), rgba(var(--q-primary-rgb), 0.7)), url('/pattern.svg') repeat;
  background-size: cover;
}

.policy-card {
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  }
}

@media (max-width: 599px) {
  .policy-card {
    padding: 16px !important;
  }
}
</style>
