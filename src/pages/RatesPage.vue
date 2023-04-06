<template>
  <q-item-section
    class="q-py-lg text-h4 text-bold text-center"
    style="font-family: 'BodoniSvtyTwoSCITCTT-Book'"
    >{{ $t('rates') }}</q-item-section
  >
  <div>
    <q-expansion-item
      v-for="(category, index) in ratesList"
      :key="category.name_en"
      expanded-icon="arrow_drop_down"
      expand-icon="arrow_right"
      header-class="expansion q-py-lg bg-white text-black"
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
</template>

<script lang="ts">
import { onBeforeMount, computed } from 'vue';
import { useQuasar } from 'quasar';

import '../css/rates.scss';
import { useStore } from 'src/store';

export default {
  setup() {
    const $store = useStore();
    const $q = useQuasar();
    const listOfLists = computed(() => $store.state.rates.listOfLists);
    const ratesList = computed(() => $store.state.rates.ratesList);

    onBeforeMount(async () => {
      $q.loading.show();
      if (listOfLists.value.length < 1 && ratesList.value.length < 1) {
        await $store.dispatch('rates/fetchRates');
      }
      $q.loading.hide();
    });

    return {
      ratesList,
      listOfLists,
    };
  },
};
</script>
