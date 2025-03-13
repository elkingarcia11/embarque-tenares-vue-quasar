<template>
  <q-page :class="{'pb-tabbar': isMobile}" class="faqs-page">
    <q-inner-loading :showing="loading" color="primary" />
    <div v-show="!loading">
      <!-- Hero Section -->
      <section class="hero-section bg-primary text-white q-py-lg">
        <div class="container text-center q-px-md">
          <h1 class="text-h3 text-weight-bold q-mb-md" style="font-family: 'BodoniSvtyTwoSCITCTT-Book'">
            {{ t('faqs.title') }}
          </h1>
          <p class="text-h6 q-mb-md">
            {{ t('faqs.subtitle') }}
          </p>
        </div>
      </section>

      <!-- FAQs Section -->
      <section class="q-py-lg">
        <div class="container q-px-md q-mx-auto" style="max-width: 900px;">
          <div class="row justify-center q-mb-lg">
            <div class="col-12 col-md-10">
              <q-card flat bordered class="faq-card q-mb-md" v-for="faq in faqsList" :key="faq.id">
                <q-expansion-item
                  expand-separator
                  expanded-icon="arrow_drop_down"
                  expand-icon="arrow_right"
                  :label="printQuestion(faq)"
                  header-class="faq-header q-py-md"
                  expand-icon-class="text-primary"
                >
                  <q-card-section class="faq-answer q-pa-lg bg-grey-1">
                    <div v-if="locale == 'en-US'" class="text-body1">
                      {{ faq.a_en }}
                    </div>
                    <div v-else class="text-body1">
                      {{ faq.a_es }}
                    </div>
                  </q-card-section>
                </q-expansion-item>
              </q-card>
            </div>
          </div>
          
          <!-- Contact Section -->
          <ContactSection />
        </div>
      </section>
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
import { computed, ref, onBeforeMount } from 'vue';
import { useI18n } from 'vue-i18n';
import { DocumentData } from 'firebase/firestore';
import { useStore } from 'src/store';
import { useQuasar } from 'quasar';
import TabBar from 'src/components/TabBar.vue';
import ContactSection from 'src/components/ContactSection.vue';

import '../css/faqs.scss';
export default {
  components: {
    TabBar,
    ContactSection
  },
  setup() {
    const $store = useStore();
    const { locale, t } = useI18n();
    const $q = useQuasar();

    // Check if mobile
    const isMobile = computed(() => $q.platform.is.mobile);

    // Compute the list of FAQs from the store
    const faqsList = computed(() => $store.state.faqs.faqsList);

    // Function to print the question based on the selected locale
    const printQuestion = (question: DocumentData) => {
      return locale.value == 'en-US' ? question.q_en : question.q_es;
    };

    const loading = ref(false);

    // Fetch FAQs before component mount
    onBeforeMount(async () => {
      loading.value = true;
      if (faqsList.value.length < 1) {
        await $store.dispatch('faqs/fetchFaqs');
      }
      loading.value = false;
    });

    // Dummy function for TabBar focus-input event
    const focusInput = () => {
      // Navigate to the home page when track tab is clicked
      window.location.href = '/';
    };

    return {
      faqsList,
      loading,
      printQuestion,
      locale,
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

.faq-card {
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  }
}

.faq-header {
  font-size: 18px;
  font-weight: 600;
  background-color: white;
}

.faq-answer {
  line-height: 1.6;
}

@media (max-width: 599px) {
  .faq-header {
    font-size: 16px;
  }
  
  .faq-answer {
    font-size: 15px;
  }
}
</style>
