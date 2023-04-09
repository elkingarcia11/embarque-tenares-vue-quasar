<template>
  <q-form @submit="search" class="invoiceForm">
    <q-input
      ref="invoiceInputRef"
      square
      class="window-width overflow-hidden"
      outlined
      v-model="invoiceText"
      :label="$t('trackPack')"
    >
      <template v-slot:append>
        <q-btn
          flat
          round
          color="secondary"
          icon="quiz"
          @click="invoiceDialog = true"
        />
        <q-btn flat round color="primary" icon="search" @click="search" />
      </template>
    </q-input>
  </q-form>

  <div v-if="onSubmitted">
    <q-item-section
      class="q-py-lg text-h4 text-bold text-center"
      style="font-family: 'BodoniSvtyTwoSCITCTT-Book'"
      >{{ $t('track') }}</q-item-section
    >
    <CircularProg
      v-if="querySuccess"
      ref="circularProgRef"
      :percent="percent"
      :invoice="invoiceNumber"
      :enDate="enDate"
      :esDate="esDate"
    />
    <TrackError v-else :invoice="invoiceNumber" />
  </div>
  <div :class="searchButtonClass">
    <q-btn
      color="primary"
      style="width: 90vw; font-weight: bold"
      :label="$t('search')"
      size="lg"
      @click="search"
    />
  </div>

  <q-dialog v-model="invoiceDialog" transition-hide="slide-down">
    <q-card style="width: 90vw">
      <q-toolbar class="bg-primary">
        <div class="text-white text-center q-px-sm q-py-md dialogToolbar">
          {{ $t('findInv')
          }}<span class="text-weight-bold">{{ $t('findInvTwo') }}</span>
        </div>
      </q-toolbar>
      <q-separator />
      <q-card-section class="row full-height justify-center">
        <img
          loading="lazy"
          v-if="$i18n.locale == 'en-US'"
          class="self-center"
          id="logo"
          fit="contain"
          src="../assets/trackEN.png"
        />
        <img
          loading="lazy"
          v-else
          class="self-center"
          id="logo"
          fit="contain"
          src="../assets/trackES.png"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { Ref, ref, onBeforeMount, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { QInput, useQuasar } from 'quasar';

import CircularProg from 'src/components/CircularProg.vue';
import TrackError from 'src/components/TrackError.vue';
import { useStore } from 'src/store';

import '../css/track.scss';

export default {
  name: 'TrackSpecificPage',
  components: {
    CircularProg,
    TrackError,
  },
  setup() {
    const $q = useQuasar();
    const $store = useStore();
    const $route = useRoute();
    const $router = useRouter();
    const { t } = useI18n();

    const invoiceInputRef: Ref<QInput | null> = ref(null);

    const invoiceText = ref('');
    const invoiceNumber = ref('');

    const onSubmitted = ref(false);

    const querySuccess = ref(false);
    const enDate = ref('');
    const esDate = ref('');
    const percent = ref(0);

    const invoiceDialog = ref(false);

    onBeforeMount(async () => {
      $q.loading.show();
      if (typeof $route.params.invoice === 'string') {
        invoiceText.value = $route.params.invoice;
      }
      await submit($route.params.invoice);
      $q.loading.hide();
    });

    const showNotif = () => {
      $q.notify({
        message: t('invalidInvoice'),
        type: 'negative',
        icon: 'error',
      });
    };

    const focusInput = () => {
      const inputEl = invoiceInputRef.value?.$el.querySelector('input');
      inputEl?.focus();
    };

    const searchButtonClass = computed(() =>
      querySuccess.value && $q.platform.is.mobile
        ? 'search-button-mobile'
        : 'search-button'
    );

    const search = () => {
      if (
        invoiceText.value === '' ||
        $route.params.invoice === invoiceText.value
      ) {
        focusInput();
      } else {
        $router.push({
          name: 'search',
          params: { invoice: invoiceText.value },
        });
      }
    };

    const submit = (invoice: string | string[]) => {
      if (
        typeof invoice === 'string' &&
        invoice !== '' &&
        Number.isInteger(parseInt(invoice, 10))
      ) {
        const n = Number(invoice);
        if (n > 0) {
          retrieveInvoiceInfo(invoice);
        } else {
          showNotif();
        }
      } else {
        showNotif();
      }
    };

    const retrieveInvoiceInfo = async (invoice: string) => {
      invoiceNumber.value = invoice;
      const url = '/invoice/' + invoice;
      try {
        const response = await $store.dispatch('invoice/fetchInvoice', url);
        querySuccess.value = response.querySuccess;
        enDate.value = response.enDate;
        esDate.value = response.esDate;
        percent.value = response.percent;
      } catch {
        querySuccess.value = false;
        enDate.value = '';
        esDate.value = '';
        percent.value = 0;
      }
      onSubmitted.value = true;
    };

    return {
      search,
      invoiceText,
      invoiceInputRef,
      invoiceDialog,
      onSubmitted,
      querySuccess,
      percent,
      invoiceNumber,
      enDate,
      esDate,
      searchButtonClass,
    };
  },
};
</script>
