<template>
  <q-page-container id="home-body">
    <q-page-sticky position="top" :offset="[0, 0]">
      <q-input
        ref="invoiceInput"
        square
        class="window-width overflow-hidden"
        outlined
        v-model="invoice_text"
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
          <q-btn flat round color="primary" icon="search" @click="inputFocus" />
        </template>
      </q-input>
    </q-page-sticky>
    <div id="logoDiv">
      <q-img id="logo" src="../assets/logo.png" fit="contain" />
    </div>
    <q-dialog
      v-model="invoiceDialog"
      full-width
      position="bottom"
      transition-hide="slide-down"
    >
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
          <q-img
            class="self-center"
            id="logo"
            :src="$t('inv_img_src')"
            fit="contain"
          />
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page-container>
</template>

<script lang="ts">
import { ref } from 'vue';
import '../css/home.scss';

export default {
  setup() {
    return {
      invoiceDialog: ref(false),
      invoice_text: ref(''),
    };
  },
};
</script>
