<template>
  <q-form @submit="search" class="invoiceForm">
    <q-input
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
        <q-btn flat round color="primary" icon="search" @click="search" />
      </template>
    </q-input>
  </q-form>

  <div v-if="onSubmitted">
    <q-item-section
      class="q-my-lg text-h4 text-bold text-center"
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
      @click="search"
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
</template>

<script lang="ts">
import { ref, onBeforeMount } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { api } from 'boot/axios';
import { getDoc, doc } from '@firebase/firestore';
import { QInput, useQuasar } from 'quasar';

import CircularProg from 'src/components/CircularProg.vue';
import TrackError from 'src/components/TrackError.vue';
import db from '../boot/firebase';

export default {
  name: 'TrackSpecificPage',
  components: {
    CircularProg,
    TrackError,
  },
  setup() {
    const $q = useQuasar();
    const $route = useRoute();
    const $router = useRouter();
    const { t } = useI18n();

    const invoiceInputRef = ref<QInput>();

    const invoiceText = ref('');
    const invoiceNumber = ref('');
    const enDate = ref('');
    const esDate = ref('');
    const percent = ref(0);
    const etaDays = ref(-1);
    const onSubmitted = ref(false);
    const querySuccess = ref(false);
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

    const search = () => {
      if (invoiceInputRef.value !== undefined) {
        invoiceInputRef.value.focus();
      } else {
        $router.push({
          name: 'search',
          params: { invoice: invoiceText.value },
        });
      }
    };

    const submit = async (invoice: string | string[]) => {
      if (
        typeof invoice === 'string' &&
        invoice !== '' &&
        Number.isInteger(parseInt(invoice, 10))
      ) {
        const n = Number(invoice);
        if (n > 0) {
          await retrieveEtaDays();
          await retrieveInvoiceInfo(invoice);
        } else {
          showNotif();
        }
      } else {
        showNotif();
      }
    };

    const retrieveEtaDays = async () => {
      const docRef = doc(db, 'eta/eta_days');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const d = docSnap.data();
        etaDays.value = d.days;
      } else {
        console.log('No such document! Default to 25 days');
      }
    };

    const retrieveInvoiceInfo = (invoice: string) => {
      onSubmitted.value = true;
      invoiceNumber.value = invoice;
      let url = '/invoice/' + invoice;
      api
        .get(url)
        .then((response) => {
          var a = new Date(response.data.response[0].date);
          const b = new Date();
          const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          };

          a.setDate(a.getDate() + 25);
          enDate.value = a.toLocaleDateString('en-US', options);
          esDate.value = a.toLocaleDateString('es-US', options);

          const _MS_PER_DAY = 1000 * 60 * 60 * 24;
          // Discard the time and time-zone information.
          const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
          const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

          let dLeft = Math.floor((utc1 - utc2) / _MS_PER_DAY);
          if (dLeft <= 0) {
            percent.value = 100;
          } else {
            percent.value = (1 - dLeft / etaDays.value) * 100;
          }

          querySuccess.value = true;
        })
        .catch((error) => {
          console.log(error);
          querySuccess.value = false;
        });
    };

    return {
      search,
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
