<template>
  <q-page-container id="home-body">
    <q-form @submit="submit" class="invoiceForm">
      <q-input
        id="q-input"
        ref="invoiceInputRef"
        square
        class="window-width overflow-hidden"
        outlined
        v-model="invoiceText"
        :label="$t('trackPack')"
        mask="############"
        unmasked-value
      >
        <template v-slot:append>
          <q-btn
            flat
            round
            color="secondary"
            icon="quiz"
            @click="invoiceDialog = true"
          />
          <q-btn flat round color="primary" icon="search" @click="submit" />
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
    <q-page-sticky position="bottom" :offset="[18, 18]">
      <q-btn
        color="primary"
        style="width: 90vw; font-weight: bold"
        :label="$t('search')"
        size="lg"
        @click="submit"
      />
    </q-page-sticky>

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
  </q-page-container>
</template>

<script lang="ts">
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { QInput, useQuasar } from 'quasar';
import { useStore } from 'src/store';

import CircularProg from 'src/components/CircularProg.vue';
import TrackError from 'src/components/TrackError.vue';

export default {
  name: 'TrackPage',
  components: {
    CircularProg,
    TrackError,
  },
  setup() {
    const $q = useQuasar();
    const $store = useStore();
    const { t } = useI18n();
    const invoiceInputRef = ref<QInput>();

    const invoiceText = ref('');
    const invoiceNumber = ref('');

    const invoiceDialog = ref(false);
    const onSubmitted = ref(false);
    const querySuccess = computed(() => $store.state.invoice.querySuccess);

    const enDate = computed(() => $store.state.invoice.enDate);
    const esDate = computed(() => $store.state.invoice.esDate);
    const percent = computed(() => $store.state.invoice.percent);

    const showNotif = () => {
      $q.notify({
        message: t('invalidInvoice'),
        type: 'negative',
        icon: 'error',
      });
    };

    const submit = async () => {
      if (
        typeof invoiceText.value === 'string' &&
        invoiceText.value !== '' &&
        Number.isInteger(parseInt(invoiceText.value, 10))
      ) {
        const n = Number(invoiceText.value);
        if (n > 0) {
          $q.loading.show();
          // Submit
          if (invoiceText.value === '') {
            if (invoiceInputRef.value !== undefined) {
              invoiceInputRef.value.focus();
            }
          } else {
            if (invoiceInputRef.value !== undefined) {
              invoiceInputRef.value.blur();
            }
            invoiceNumber.value = invoiceText.value;
            const url = '/invoice/' + invoiceText.value;
            $store.dispatch('invoice/fetchInvoice', url);
            onSubmitted.value = true;
          }
          $q.loading.hide();
        } else {
          showNotif();
        }
      } else {
        showNotif();
      }
    };

    return {
      submit,
      invoiceText,
      invoiceDialog,
      onSubmitted,
      querySuccess,
      percent,
      invoiceNumber,
      enDate,
      esDate,
    };
  },
};
</script>
