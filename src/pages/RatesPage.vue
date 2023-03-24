<template>
  <q-item-section
    class="q-py-lg text-h4 text-bold text-center"
    style="font-family: 'BodoniSvtyTwoSCITCTT-Book'"
    >{{ $t('rates') }}</q-item-section
  >
  <div class="expansion_rows">
    <q-expansion-item
      v-for="(category, index) in ratesList"
      :key="category.name_en"
      expanded-icon="arrow_drop_down"
      expand-icon="arrow_right"
      header-class="expansion q-py-lg bg-white text-primary"
      expand-icon-class="text-primary"
    >
      <template v-slot:header>
        <q-item-section avatar>
          <img class="img" :src="`../assets/${category.name_en}.png`" />
        </q-item-section>

        <q-item-section
          v-if="$i18n.locale == 'en-US'"
          class="text-h4"
          style="font-family: 'BodoniSvtyTwoSCITCTT-Book'"
        >
          {{ category.name_en }} </q-item-section
        ><q-item-section
          v-else
          class="text-h4"
          style="font-family: 'BodoniSvtyTwoSCITCTT-Book'"
        >
          {{ category.name_es }}
        </q-item-section>
      </template>
      <q-list bordered separator>
        <q-item
          clickable
          v-for="item in listOfLists[index]"
          :key="item.id"
          class="q-py-md"
        >
          <q-item-section class="text-h6">
            <q-item-label v-if="$i18n.locale == 'en-US'">{{
              item.name_en
            }}</q-item-label>
            <q-item-label v-else>{{ item.name_es }}</q-item-label>
          </q-item-section>
          <q-item-section side center>
            <q-badge
              color="primary"
              :label="item.price"
              class="text-subtitle1"
            />
          </q-item-section>
        </q-item>
      </q-list>
    </q-expansion-item>
  </div>
  <FooterComponent />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import FooterComponent from 'src/components/FooterComponent.vue';
import db from '../boot/firebase';
import { collection, DocumentData, getDocs } from 'firebase/firestore';

import '../css/rates.scss';

let rL: DocumentData[] = [];
let arrayOfiL: DocumentData[][] = [];

export default defineComponent({
  components: { FooterComponent },
  data: function () {
    return {
      ratesList: rL,
      listOfLists: arrayOfiL,
    };
  },
  async created() {
    this.$q.loading.show();
    const ratesRef = collection(db, 'rates');
    const ratesSnapshot = await getDocs(ratesRef);
    const rL = ratesSnapshot.docs.map((doc) => doc.data());
    this.ratesList = rL;

    let itemsRef = collection(db, 'rates/0/items');
    let itemsSnapshot = await getDocs(itemsRef);
    let iL = itemsSnapshot.docs.map((doc) => doc.data());
    arrayOfiL.push(iL);

    itemsRef = collection(db, 'rates/1/items');
    itemsSnapshot = await getDocs(itemsRef);
    iL = itemsSnapshot.docs.map((doc) => doc.data());
    arrayOfiL.push(iL);

    itemsRef = collection(db, 'rates/2/items');
    itemsSnapshot = await getDocs(itemsRef);
    iL = itemsSnapshot.docs.map((doc) => doc.data());
    arrayOfiL.push(iL);

    itemsRef = collection(db, 'rates/3/items');
    itemsSnapshot = await getDocs(itemsRef);
    iL = itemsSnapshot.docs.map((doc) => doc.data());
    arrayOfiL.push(iL);
    this.listOfLists = arrayOfiL;
    this.$q.loading.hide();
  },
});
</script>
