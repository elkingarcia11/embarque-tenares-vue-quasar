<template>
  <q-item-section
    class="q-py-lg text-h4 text-bold text-center"
    style="font-family: 'BodoniSvtyTwoSCITCTT-Book'"
    >{{ $t('faqs') }}</q-item-section
  >
  <div>
    <q-expansion-item
      v-for="faq in faqsList"
      :key="faq.id"
      expand-separator
      expanded-icon="arrow_drop_down"
      expand-icon="arrow_right"
      :label="printQuestion(faq)"
      header-class="q-py-lg bg-white text-black faqsExpansionHeaderStyle"
      expand-icon-class="text-primary"
    >
      <q-card>
        <q-card-section v-if="$i18n.locale == 'en-US'" style="font-size: 20px">
          {{ faq.a_en }}
        </q-card-section>
        <q-card-section v-else style="font-size: 18px" class="answers q-pl-xl">
          {{ faq.a_es }}
        </q-card-section>
      </q-card>
    </q-expansion-item>
  </div>

  <FooterComponent />
</template>

<script lang="ts">
import { ref, computed } from 'vue';
import { onBeforeMount } from 'vue';
import { useI18n } from 'vue-i18n';
import { DocumentData } from 'firebase/firestore';
import { useQuasar } from 'quasar';

import db from '../boot/firebase';
import FooterComponent from 'src/components/FooterComponent.vue';

import '../css/faqs.scss';
import { useStore } from 'src/store';

export default {
  components: {
    FooterComponent,
  },
  setup() {
    const $q = useQuasar();
    const $store = useStore();
    const { locale } = useI18n();

    const faqsList = computed(() => $store.state.faqs.faqsList);

    const printQuestion = (question: DocumentData) => {
      if (locale.value == 'en-US') {
        return question.q_en;
      } else {
        return question.q_es;
      }
    };

    onBeforeMount(async () => {
      $q.loading.show();
      if (faqsList.value.length < 1) {
        await $store.dispatch('faqs/fetchFaqs');
      }
      $q.loading.hide();
    });

    return {
      faqsList,
      printQuestion,
    };
  },
};
</script>
