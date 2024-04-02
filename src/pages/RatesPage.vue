<template>
  <q-inner-loading :showing="loading" color="primary" />
  <div v-show="!loading">
    <!-- This section displays the main header with the localized text for "rates" -->
    <q-item-section
      class="q-py-lg text-h4 text-bold text-center"
      style="font-family: 'BodoniSvtyTwoSCITCTT-Book'"
      >{{ $t('rates') }}</q-item-section
    >
    <div>
      <!-- This loop creates an expansion item for each category in ratesList -->
      <q-expansion-item
        v-for="(category, index) in ratesList"
        :key="category.name_en"
        expanded-icon="arrow_drop_down"
        expand-icon="arrow_right"
        header-class="expansion q-py-lg bg-white text-black"
        expand-icon-class="text-primary"
      >
        <!-- This is the header of the expansion item, containing category information -->
        <template v-slot:header>
          <q-item-section avatar>
            <!-- Display the category image based on its name_en -->
            <img class="img" :src="`../assets/${category.name_en}.png`" />
          </q-item-section>

          <!-- Display the category name based on the selected locale -->
          <q-item-section
            v-if="$i18n.locale == 'en-US'"
            class="text-h4"
            style="font-family: 'BodoniSvtyTwoSCITCTT-Book'"
          >
            {{ category.name_en }}
          </q-item-section>
          <q-item-section
            v-else
            class="text-h4"
            style="font-family: 'BodoniSvtyTwoSCITCTT-Book'"
          >
            {{ category.name_es }}
          </q-item-section>
        </template>

        <!-- This list displays items for each category using nested loops -->
        <q-list bordered separator>
          <q-item
            clickable
            v-for="item in listOfLists[index]"
            :key="item.id"
            class="q-py-md"
          >
            <q-item-section class="text-h6">
              <!-- Display the item name based on the selected locale -->
              <q-item-label v-if="$i18n.locale == 'en-US'">{{
                item.name_en
              }}</q-item-label>
              <q-item-label v-else>{{ item.name_es }}</q-item-label>
            </q-item-section>
            <q-item-section side center>
              <!-- Display the item price as a badge -->
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
  </div>
</template>

<script lang="ts">
import { onBeforeMount, computed, ref } from 'vue';
import { useStore } from 'src/store';

import '../css/rates.scss';

export default {
  setup() {
    // Access the Vuex store and Quasar utilities
    const $store = useStore();

    // Get the rates data from the Vuex store
    const listOfLists = computed(() => $store.state.rates.listOfLists);
    const ratesList = computed(() => $store.state.rates.ratesList);
    const loading = ref(false);

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
    };
  },
};
</script>
