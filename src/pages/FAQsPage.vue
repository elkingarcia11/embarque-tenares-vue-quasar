<template>
  <q-scroll-area style="height: 85vh">
    <q-list>
      <q-expansion-item
        v-for="faq in faqsList"
        :key="faq.id"
        expand-separator
        expanded-icon="arrow_drop_down"
        expand-icon="arrow_right"
        :label="printQuestion(faq)"
        header-style="font-size: 18px; font-weight: bold;"
        header-class="q-py-lg"
        active-class="expansion_active"
      >
        <q-card>
          <q-card-section
            v-if="$i18n.locale == 'en-US'"
            style="font-size: 16px"
          >
            {{ faq.a_en }}
          </q-card-section>
          <q-card-section v-else style="font-size: 16px">
            {{ faq.a_es }}
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </q-list>
  </q-scroll-area>
</template>

<script lang="ts">
import '../css/faqs.scss';
import db from '../boot/firebase';
import { collection, DocumentData, getDocs } from 'firebase/firestore/lite';

let fL: DocumentData[] = [];
export default {
  data: function () {
    return {
      faqsList: fL,
    };
  },
  methods: {
    printQuestion(question: DocumentData) {
      if (this.$i18n.locale == 'en-US') {
        return question.q_en;
      } else {
        return question.q_es;
      }
    },
  },
  async created() {
    const faqsCol = collection(db, 'faqs');
    const faqsSnapshot = await getDocs(faqsCol);
    const fL = faqsSnapshot.docs.map((doc) => doc.data());
    this.faqsList = fL;
  },
};
</script>
