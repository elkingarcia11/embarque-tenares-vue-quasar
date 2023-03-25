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
import { defineComponent, ref } from 'vue';
import { collection, DocumentData, getDocs } from 'firebase/firestore';
import { onBeforeMount } from 'vue';
import { useI18n } from 'vue-i18n';
import { useQuasar } from 'quasar';

import db from '../boot/firebase';
import FooterComponent from 'src/components/FooterComponent.vue';

import '../css/faqs.scss';

export default defineComponent({
  components: {
    FooterComponent,
  },
  setup() {
    const $q = useQuasar();
    const faqsList = ref<DocumentData[]>([]);
    const { locale } = useI18n();
    const printQuestion = (question: DocumentData) => {
      if (locale.value == 'en-US') {
        return question.q_en;
      } else {
        return question.q_es;
      }
    };

    onBeforeMount(async () => {
      $q.loading.show();
      const faqsCol = collection(db, 'faqs');
      const faqsSnapshot = await getDocs(faqsCol);
      faqsList.value = faqsSnapshot.docs.map((doc) => doc.data());
      $q.loading.hide();
    });

    return {
      faqsList,
      printQuestion,
    };
  },
});
</script>
