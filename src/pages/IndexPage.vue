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

    <q-dialog v-model="dialog" @hide="dialogClosed">
      <q-card style="width: 300px" class="q-px-sm q-pb-md">
        <q-card-section>
          <div class="text-h6">{{ $t('branch') }}</div>
        </q-card-section>

        <q-item clickable v-ripple:primary @click="$router.push('ny-branch')">
          <q-item-section avatar>
            <q-avatar color="accent" text-color="white" icon="pin_drop" />
          </q-item-section>

          <q-item-section>{{ $t('ny') }}</q-item-section>
        </q-item>
        <q-item clickable v-ripple:primary @click="$router.push('dr-branch')">
          <q-item-section avatar>
            <q-avatar color="dark" text-color="white" icon="pin_drop" />
          </q-item-section>

          <q-item-section>{{ $t('dr') }}</q-item-section>
        </q-item>
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
