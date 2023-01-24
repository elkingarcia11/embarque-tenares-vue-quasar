<template>
  <q-page-container id="home-body">
    <q-page-sticky position="top" :offset="[0, 0]">
      <q-input
        ref="invoiceInput"
        square
        class="window-width overflow-hidden"
        outlined
        v-model="text"
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
    <q-page-sticky position="bottom" class="window-width" :offset="[18, 18]">
      <q-card class="q-mx-md q-py-sm">
        <q-btn-toggle
          spread
          :ripple="false"
          @click="open()"
          v-model="buttonGroup"
          text-color="primary"
          toggle-color="white"
          toggle-text-color="secondary"
          :options="[
            { value: 1, slot: 'one' },
            { value: 2, slot: 'two' },
            { value: 3, slot: 'three' },
            { value: 4, slot: 'four' },
          ]"
        >
          <template v-slot:one>
            <div class="column items-center no-wrap btn-tgle">
              <q-icon center name="search" />
              <div class="text-center labels">
                {{ $t('track') }}
              </div>
            </div>
          </template>
          <template v-slot:two>
            <div class="column items-center no-wrap btn-tgle">
              <q-icon center name="local_atm" />
              <div class="text-center labels">
                {{ $t('rates') }}
              </div>
            </div>
          </template>

          <template v-slot:three>
            <div class="column items-center no-wrap btn-tgle">
              <q-icon center name="domain" />
              <div class="text-center labels">
                {{ $t('branch') }}
              </div>
            </div>
          </template>

          <template v-slot:four>
            <div class="column items-center no-wrap btn-tgle">
              <q-icon center name="quiz" />
              <div class="text-center labels">
                {{ $t('faqs') }}
              </div>
            </div>
          </template>
        </q-btn-toggle>
      </q-card>
    </q-page-sticky>
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
      buttonGroup: ref(0),
      invoiceDialog: ref(false),
      dialog: ref(false),
    };
  },
  methods: {
    open() {
      if (this.buttonGroup === 1) {
        this.$refs.invoiceInput.focus();
      }
      if (this.buttonGroup === 2) {
        this.buttonGroup = 2;
        this.$router.push('rates');
      }
      if (this.buttonGroup === 3) {
        this.dialog = true;
        this.buttonGroup = 3;
      }
      if (this.buttonGroup === 4) {
        this.buttonGroup = 4;
        this.$router.push('faqs');
      }
    },
    dialogClosed() {
      this.buttonGroup = 0;
    },
  },
};
</script>
