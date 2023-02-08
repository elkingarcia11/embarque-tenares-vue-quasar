<template>
  <q-page-sticky position="top" :offset="[0, 0]">
    <q-form @submit="searchOrSubmit">
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
          <q-btn
            flat
            round
            color="primary"
            icon="search"
            @click="searchOrSubmit"
          />
        </template>
      </q-input>
    </q-form>
  </q-page-sticky>
  <CircularProg
    v-if="successfullyRetrieved"
    ref="circularProgRef"
    :percent="percent"
    :invoice="invoiceNumber"
    :eta="eta"
  />
  <q-page-sticky position="bottom" :offset="[18, 18]">
    <q-btn
      color="primary"
      style="width: 90vw"
      :label="$t('search')"
      size="lg"
      @click="searchOrSubmit"
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
          v-if="$i18n.locale == 'en-US'"
          class="self-center"
          id="logo"
          fit="contain"
          src="../assets/trackEN.png"
        />
        <img
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
import TabBar from 'src/components/TabBar.vue';

export default defineComponent({
  components: {
    CircularProg,
    TabBar,
  },
  data: function () {
    return {
      percent: 20,
      daysLeft: 25,
      eta: 'December 20, 2023',
      invoiceNumber: 123456,
      invoiceDialog: ref(false),
      invoiceText: '',
      successfullyRetrieved: false,
    };
  },
  methods: {
    isMobile() {
      if (this.$q.platform.is.mobile) {
        return true;
      }
      return false;
    },
    searchOrSubmit() {
      if (this.invoiceText === '') {
        (this.$refs['invoiceInputRef'] as any).focus();
      } else {
        // Submit
        this.successfullyRetrieved = true;
        console.log('SUBMITTED');
      }
    },
  },
});
</script>
