<template>
  <q-inner-loading :showing="loading" color="primary" />
  <div v-show="!loading">
    <q-form @submit="submit" class="invoiceForm">
      <q-input
        ref="invoiceInputRef"
        square
        class="window-width overflow-hidden"
        outlined
        v-model="invoiceText"
        :label="t('trackPack')"
      >
        <template v-slot:append>
          <q-btn
            flat
            round
            color="secondary"
            icon="quiz"
            @click="invoiceDialog = true"
          />
        </template>
      </q-input>
    </q-form>
    <div v-if="onSubmitted">
      <q-item-section
        class="q-py-lg text-h4 text-bold text-center"
        style="font-family: 'BodoniSvtyTwoSCITCTT-Book'"
        >{{ t('track') }}</q-item-section
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
        :label="t('search')"
        size="lg"
        @click="submit"
      />
    </div>

    <q-dialog v-model="invoiceDialog" transition-hide="slide-down">
      <q-card style="width: 90vw">
        <q-toolbar class="bg-primary">
          <div class="text-white text-center q-px-sm q-py-md dialogToolbar">
            {{ t('findInv')
            }}<span class="text-weight-bold">{{ t('findInvTwo') }}</span>
          </div>
        </q-toolbar>
        <q-separator />
        <q-card-section class="row full-height justify-center">
          <img
            loading="eager"
            v-if="locale == 'en-US'"
            class="self-center"
            id="logo"
            fit="contain"
            src="../assets/trackEN.png"
          />
          <img
            loading="eager"
            v-else
            class="self-center"
            id="logo"
            fit="contain"
            src="../assets/trackES.png"
          />
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script lang="ts">
import { Ref, computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { QInput, useQuasar } from 'quasar';
import { useStore } from 'src/store';

import CircularProg from 'src/components/CircularProg.vue';
import TrackError from 'src/components/TrackError.vue';

import '../css/home.scss';

export default {
  name: 'TrackPage',
  components: {
    CircularProg,
    TrackError,
  },
  setup() {
    const $q = useQuasar();
    const $store = useStore();
    const { t, locale } = useI18n();

    const previousInvoice = ref('-1');
    const invoiceText = ref('');
    const invoiceNumber = ref('');

    const invoiceDialog = ref(false);
    const onSubmitted = ref(false);

    const loading = ref(false);

    const querySuccess = ref(false);
    const enDate = ref('');
    const esDate = ref('');
    const percent = ref(0);

    const showNotif = () => {
      $q.notify({
        message: t('invalidInvoice'),
        type: 'negative',
        icon: 'error',
      });
    };

    const invoiceInputRef: Ref<QInput | null> = ref(null);

    const focusInput = () => {
      const inputEl = invoiceInputRef.value?.$el.querySelector('input');
      inputEl?.focus();
    };

    const blurInput = () => {
      const inputEl = invoiceInputRef.value?.$el.querySelector('input');
      inputEl?.blur();
    };
    const searchButtonClass = computed(() =>
      querySuccess.value && $q.platform.is.mobile
        ? 'search-button-mobile'
        : 'search-button'
    );
    const submit = async () => {
      loading.value = true;
      if (
        invoiceText.value === '' ||
        previousInvoice.value === invoiceText.value
      ) {
        focusInput();
      } else if (
        typeof invoiceText.value === 'string' &&
        invoiceText.value !== '' &&
        Number.isInteger(parseInt(invoiceText.value, 10))
      ) {
        const n = Number(invoiceText.value);
        if (n > 0) {
          blurInput();
          previousInvoice.value = invoiceText.value;
          invoiceNumber.value = invoiceText.value;
          const url = '/invoice/' + invoiceText.value;

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
        } else {
          showNotif();
        }
      } else {
        showNotif();
      }
      loading.value = false;
    };

    return {
      enDate,
      esDate,
      invoiceDialog,
      invoiceInputRef,
      invoiceNumber,
      invoiceText,
      loading,
      onSubmitted,
      percent,
      querySuccess,
      searchButtonClass,
      submit,
      t,
      locale
    };
  },
};
</script>
