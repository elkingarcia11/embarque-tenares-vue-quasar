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
import { defineComponent } from 'vue';
import db from '../boot/firebase';
import { collection, DocumentData, getDocs } from 'firebase/firestore';
import FooterComponent from 'src/components/FooterComponent.vue';
import '../css/faqs.scss';
let fL: DocumentData[] = [];
export default defineComponent({
  components: {
    FooterComponent,
  },
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
    this.$q.loading.show();
    const faqsCol = collection(db, 'faqs');
    const faqsSnapshot = await getDocs(faqsCol);
    const fL = faqsSnapshot.docs.map((doc) => doc.data());
    this.faqsList = fL;
    this.$q.loading.hide();
  },
});
</script>
