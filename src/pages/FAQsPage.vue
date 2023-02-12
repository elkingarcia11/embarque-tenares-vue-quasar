<template>
  <q-scroll-area class="scrollArea">
    <q-item-section class="q-py-md q-pl-md text-h4 text-bold">{{
      $t('faqs')
    }}</q-item-section>
    <q-expansion-item
      v-for="faq in faqsList"
      :key="faq.id"
      expand-separator
      expanded-icon="arrow_drop_down"
      expand-icon="arrow_right"
      :label="printQuestion(faq)"
      header-style="font-size: 18px; font-weight: bold;
  border-bottom-style: solid; border-color:grey; border-width: 0.25px;"
      header-class="q-py-lg"
      active-class="expansion_active"
    >
      <q-card>
        <q-card-section v-if="$i18n.locale == 'en-US'" style="font-size: 16px">
          {{ faq.a_en }}
        </q-card-section>
        <q-card-section v-else style="font-size: 16px">
          {{ faq.a_es }}
        </q-card-section>
      </q-card>
    </q-expansion-item>
  </q-scroll-area>

  <TabBar ref="tabBarRef" :buttonNumber="4" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import '../css/faqs.scss';
import db from '../boot/firebase';
import { collection, DocumentData, getDocs } from 'firebase/firestore/lite';
import TabBar from 'src/components/TabBar.vue';

let fL: DocumentData[] = [];
export default defineComponent({
  components: {
    TabBar,
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
