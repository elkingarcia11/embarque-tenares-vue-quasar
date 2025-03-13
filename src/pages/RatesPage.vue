<template>
  <q-page :class="{'pb-tabbar': isMobile}">
    <!-- Hero Section -->
    <section class="rates-hero bg-primary text-white q-py-lg">
      <div class="container text-center q-px-md">
        <h1 class="text-h3 text-weight-bold q-mb-md">
          {{ t('rates') }}
        </h1>
        <p class="text-h6 q-mb-md">
          {{ t('ratesSubtitle') || 'Check our shipping rates for different categories' }}
        </p>
      </div>
    </section>

    <!-- Main Content -->
    <div class="container q-pa-md q-mx-auto">
      <q-inner-loading :showing="loading" color="primary" />
      
      <div v-show="!loading" class="rates-container q-my-md">
        <!-- Categories Grid -->
        <q-expansion-item
          v-for="(category, index) in ratesList"
          :key="category.name_en"
          expanded-icon="arrow_drop_down"
          expand-icon="arrow_right"
          class="rates-category-item q-mb-md"
          header-class="rates-category-header"
          expand-icon-class="text-primary"
        >
          <!-- Category Header -->
          <template v-slot:header>
            <q-item-section avatar>
              <div class="category-icon-wrapper">
                <img class="img" :src="`/assets/${category.name_en}.png`" />
              </div>
            </q-item-section>

            <q-item-section>
              <div class="text-h5 text-weight-medium">
                {{ locale == 'en-US' ? category.name_en : category.name_es }}
              </div>
            </q-item-section>
          </template>

          <!-- Category Items -->
          <div class="rates-items-container">
            <q-list separator>
              <q-item
                v-for="item in listOfLists[index]"
                :key="item.id"
                class="rates-item q-py-md"
              >
                <q-item-section>
                  <q-item-label class="text-subtitle1 text-weight-medium">
                    {{ locale == 'en-US' ? item.name_en : item.name_es }}
                  </q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-badge
                    color="primary"
                    :label="item.price"
                    class="rates-price-badge"
                  />
                </q-item-section>
              </q-item>
            </q-list>
          </div>
        </q-expansion-item>
      </div>

      <!-- Contact Section -->
      <div class="rates-container q-mt-xl">
        <section class="contact-section q-py-xl">
          <q-card flat bordered class="contact-card q-pa-lg">
            <h2 class="text-h5 text-weight-bold q-mb-md text-center">{{ t('stillHaveQuestions') }}</h2>
            <p class="text-body1 q-mb-lg text-center">{{ t('contactUs') }}</p>
            
            <!-- Social Media Bar -->
            <div>
              <SocialMediaBar />
            </div>
          </q-card>
        </section>
      </div>
    </div>

    <!-- Tab bar component -->
    <TabBar
      @focus-input="focusInput"
      class="tabBar"
      v-if="isMobile"
    />
  </q-page>
</template>

<script lang="ts">
import { onBeforeMount, computed, ref } from 'vue';
import { useStore } from 'src/store';
import { useI18n } from 'vue-i18n';
import { useQuasar } from 'quasar';
import TabBar from 'src/components/TabBar.vue';
import SocialMediaBar from 'src/components/SocialMediaBar.vue';

import '../css/rates.scss';

export default {
  components: {
    TabBar,
    SocialMediaBar
  },
  setup() {
    const { t, locale } = useI18n();
    const $store = useStore();
    const $q = useQuasar();
    
    // Check if mobile
    const isMobile = computed(() => $q.platform.is.mobile);

    // Get the rates data from the Vuex store
    const listOfLists = computed(() => $store.state.rates.listOfLists);
    const ratesList = computed(() => $store.state.rates.ratesList);
    const loading = ref(false);

    // Dummy function for TabBar focus-input event
    const focusInput = () => {
      // Navigate to the home page when track tab is clicked
      window.location.href = '/';
    };

    // Fetch rates data from the store before mounting the component
    onBeforeMount(async () => {
      loading.value = true;

      // Fetch rates data only if it hasn't been loaded yet
      if (listOfLists.value.length < 1 && ratesList.value.length < 1) {
        await $store.dispatch('rates/fetchRates');
      }
      loading.value = false;
    });

    // Return computed properties to be used in the template
    return {
      listOfLists,
      loading,
      ratesList,
      t,
      locale,
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

.rates-hero {
  background: linear-gradient(rgba(var(--q-primary-rgb), 0.9), rgba(var(--q-primary-rgb), 0.7)), url('/pattern.svg') repeat;
  background-size: cover;
}

.rates-container {
  max-width: 900px;
  margin: 0 auto;
}

.rates-category-item {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
}

.rates-category-header {
  background-color: white;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  padding: 16px;
}

.category-icon {
  background-color: rgba(var(--q-primary-rgb), 0.1);
  padding: 8px;
}

.category-icon-wrapper {
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(var(--q-primary-rgb), 0.1);
  padding: 8px;
  border-radius: 4px;
}

.img {
  width: 40px;
  height: 40px;
  object-fit: contain;
}

.rates-items-container {
  background-color: #f9f9f9;
  padding: 8px 16px;
}

.rates-item {
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: rgba(var(--q-primary-rgb), 0.05);
  }
}

.rates-price-badge {
  font-size: 1rem;
  padding: 8px 12px;
  border-radius: 20px;
}

.contact-section {
  /* This class is no longer needed since we're using rates-container */
}

.contact-card {
  border-radius: 8px;
  background-color: #f8f9fa;
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  }
}

@media (max-width: 599px) {
  .rates-category-header {
    padding: 12px;
  }
  
  .img {
    width: 30px;
    height: 30px;
  }
  
  .rates-price-badge {
    font-size: 0.9rem;
    padding: 6px 10px;
  }
}
</style>
