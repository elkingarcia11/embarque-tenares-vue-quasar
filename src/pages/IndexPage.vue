<template>
  <q-page-container id="home-body">
    <q-form @submit="submit" class="invoiceForm">
      <q-input
        ref="invoiceInputRef"
        square
        class="window-width overflow-hidden bg-white"
        outlined
        v-model="invoiceText"
        :label="$t('trackPack')"
        type="number"
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
    <div id="logoDiv">
      <q-img id="logo" src="../assets/logo.png" fit="contain" />
    </div>

    <TabBar
      v-if="$q.platform.is.mobile"
      ref="tabBarRef"
      :buttonNumber="0"
      @focus-input="focus"
    />
    <q-dialog v-model="invoiceDialog" transition-hide="slide-down">
      <q-card>
        <q-toolbar class="bg-primary">
          <div class="text-white text-center q-px-sm q-py-md dialogToolbar">
            {{ $t('findInv')
            }}<span class="text-weight-bold">{{ $t('findInvTwo') }}</span>
          </div>
        </q-toolbar>
        <q-separator />
        <q-card-section class="row full-height justify-center">
          <q-img
            loading="lazy"
            v-if="$i18n.locale == 'en-US'"
            class="self-center"
            id="logo"
            fit="contain"
            src="../assets/trackEN.png"
          />
          <q-img
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
    <FooterComponent />
  </q-page-container>
</template>

<script lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { QInput, useQuasar } from 'quasar';

import TabBar from 'src/components/TabBar.vue';
import FooterComponent from 'src/components/FooterComponent.vue';

import '../css/home.scss';

export default {
  name: 'IndexPage',
  components: {
    TabBar,
    FooterComponent,
  },
  setup() {
    const $router = useRouter();
    const invoiceText = ref('');
    const invoiceDialog = ref(false);
    const invoiceInputRef = ref<QInput>();

    const $q = useQuasar();
    const { t } = useI18n();

    const focus = () => {
      if (invoiceInputRef.value !== undefined) {
        invoiceInputRef.value.focus();
      }
    };

    const showNotif = () => {
      $q.notify({
        message: t('invalidInvoice'),
        type: 'negative',
        icon: 'error',
      });
    };

    const submit = () => {
      if (invoiceText.value === '') {
        if (invoiceInputRef.value !== undefined) {
          invoiceInputRef.value.focus();
        }
      } else if (Number.isInteger(parseInt(invoiceText.value, 10))) {
        const n = Number(invoiceText.value);
        if (n > 0) {
          if (invoiceInputRef.value !== undefined) {
            invoiceInputRef.value.blur();
          }
          $router.push({
            name: 'search',
            params: { invoice: invoiceText.value },
          });
        } else {
          showNotif();
        }
      } else {
        if (invoiceInputRef.value !== undefined) {
          invoiceInputRef.value.blur();
        }
        showNotif();
      }
    };

    return { invoiceText, invoiceDialog, focus, submit };
  },
};
</script>
