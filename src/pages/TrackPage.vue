<template>
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
    <CircularProg
      v-if="querySuccess"
      ref="circularProgRef"
      :percent="percent"
      :invoice="invoiceNumber"
      :eta="eta"
    />
    <TrackError v-else :invoice="invoiceNumber" />
  </div>
  <q-page-sticky position="bottom" :offset="[18, 18]">
    <q-btn
      color="primary"
      style="width: 90vw"
      :label="$t('search')"
      size="lg"
      @click="search"
    />
  </q-page-sticky>

  <TabBar
    ref="tabBarRef"
    :buttonNumber="1"
    @focus-input="$refs['invoiceInputRef'].focus()"
  />

  <q-dialog v-model="invoiceDialog" transition-hide="slide-down">
    <q-card style="width: 90vw">
      <q-toolbar class="bg-primary text-white">
        <q-toolbar-title
          >{{ $t('findInv')
          }}<span class="text-weight-bold">{{
            $t('findInvTwo')
          }}</span></q-toolbar-title
        >
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
import { defineComponent, ref } from 'vue';
import CircularProg from 'src/components/CircularProg.vue';
import TrackError from 'src/components/TrackError.vue';
import TabBar from 'src/components/TabBar.vue';

import db from '../boot/firebase';
import { getDoc, doc } from '@firebase/firestore/lite';

import { api } from 'boot/axios';

export default defineComponent({
  components: {
    CircularProg,
    TrackError,
    TabBar,
  },
  data: function () {
    return {
      percent: 20,
      daysLeft: 25,
      eta: 'December 20, 2023',
      invoiceText: ref(''),
      invoiceNumber: ref(''),
      invoiceDialog: ref(false),
      etaDays: -1,
      onSubmitted: ref(false),
      querySuccess: ref(false),
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
      this.$q.loading.show();
      // Submit
      if (this.invoiceText === '') {
        (this.$refs['invoiceInputRef'] as any).focus();
        this.$q.loading.hide();
      } else {
        (this.$refs['invoiceInputRef'] as any).blur();

        await this.retrieveEtaDays();
        this.retrieveInvoiceInfo();
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
        this.etaDays = 25;
        console.log('No such document! Default to 25 days');
      }
    },
    retrieveInvoiceInfo() {
      this.onSubmitted = true;
      this.invoiceNumber = this.invoiceText;
      let url = '/invoice/' + this.invoiceText;
      console.log(api);
      api
        .get(url)
        .then((response) => {
          console.log(response);
          this.querySuccess = true;
          this.$q.loading.hide();
        })
        .catch((error) => {
          console.log(error);
          this.querySuccess = false;
          this.$q.loading.hide();
        });
    },
  },
});
</script>
