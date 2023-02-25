<template>
  <q-page-container id="specficTransactionBody">
    <q-page-sticky position="top" :offset="[0, 0]">
      <q-form @submit="submit">
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
            <q-btn flat round color="primary" icon="search" @click="submit" />
          </template>
        </q-input>
      </q-form>
    </q-page-sticky>

    <div v-if="onSubmitted">
      <q-item-section
        class="q-my-xl q-pt-xl text-h4 text-bold text-center"
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
  </q-page-container>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import CircularProg from 'src/components/CircularProg.vue';
import TrackError from 'src/components/TrackError.vue';

import db from '../boot/firebase';
import { getDoc, doc } from '@firebase/firestore/lite';

import { api } from 'boot/axios';

export default defineComponent({
  components: {
    CircularProg,
    TrackError,
  },
  data: function () {
    return {
      percent: ref(0),
      daysLeft: 25,
      invoiceText: ref(''),
      invoiceNumber: ref(''),
      invoiceDialog: ref(false),
      etaDays: -1,
      onSubmitted: ref(false),
      querySuccess: ref(false),
      enDate: ref(''),
      esDate: ref(''),
    };
  },
  methods: {
    isMobile() {
      if (this.$q.platform.is.mobile) {
        return true;
      }
      return false;
    },
    search() {
      (this.$refs['invoiceInputRef'] as any).focus();
    },
    async submit() {
      console.log(this.invoiceText);
      //setTimeout({}, 10000)
      // Submit
      if (this.invoiceText === '') {
        (this.$refs['invoiceInputRef'] as any).focus();
        this.$q.loading.hide();
      } else {
        (this.$refs['invoiceInputRef'] as any).blur();

        await this.retrieveEtaDays();
        await this.retrieveInvoiceInfo();

        this.$q.loading.hide();
      }
    },
    async retrieveEtaDays() {
      const docRef = doc(db, 'eta/eta_days');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const d = docSnap.data();
        this.etaDays = d.days;
      } else {
        // doc.data() will be undefined in this case
        console.log('No such document! Default to 25 days');
      }
    },
    async retrieveInvoiceInfo() {
      this.onSubmitted = true;
      this.invoiceNumber = this.invoiceText;
      let url = '/invoice/' + this.invoiceText;
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
          this.enDate = a.toLocaleDateString('en-US', options);
          this.esDate = a.toLocaleDateString('es-US', options);

          const _MS_PER_DAY = 1000 * 60 * 60 * 24;
          // Discard the time and time-zone information.
          const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
          const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

          let dLeft = Math.floor((utc1 - utc2) / _MS_PER_DAY);
          if (dLeft <= 0) {
            this.percent = 100;
          } else {
            this.percent = (1 - dLeft / this.etaDays) * 100;
          }
          this.querySuccess = true;
        })
        .catch((error) => {
          console.log(error);
          this.querySuccess = false;
        });
    },
  },
});
</script>
