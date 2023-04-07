<template>
  <div></div>
  <q-form @submit="submit" class="invoiceForm">
    <q-input
      ref="invoiceInputRef"
      square
      class="bg-white"
      outlined
      @blur="handleDismiss"
      v-model="invoiceText"
      :label="$t('trackPack')"
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

  <div class="row flex-center q-py-xl">
    <q-img
      class="q-my-xl"
      id="logo"
      src="../assets/logo.png"
      fit="contain"
      :style="dynamicHeight"
    />
  </div>

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

  <TabBar
    @focus-input="focusInput"
    class="tabBar"
    v-if="$q.platform.is.mobile"
    :is-dismissed="isDismissed"
  />
</template>

<script lang="ts">
import { Ref, computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { QInput, useQuasar } from 'quasar';
import TabBar from 'src/components/TabBar.vue';

import '../css/app.scss';

export default {
  name: 'IndexPage',
  components: {
    TabBar,
  },
  setup() {
    const isDismissed = ref(false);

    const handleDismiss = () => {
      isDismissed.value = true;
    };

    const $router = useRouter();
    const $q = useQuasar();
    const { t } = useI18n();

    const invoiceText = ref('');

    const invoiceDialog = ref(false);

    const invoiceInputRef: Ref<QInput | null> = ref(null);

    const focusInput = () => {
      isDismissed.value = false;
      const inputEl = invoiceInputRef.value?.$el.querySelector('input');
      inputEl?.focus();
    };

    const blurInput = () => {
      const inputEl = invoiceInputRef.value?.$el.querySelector('input');
      inputEl?.blur();
    };

    const dynamicHeight = computed(() => {
      return $q.platform.is.mobile ? 'height: 33vh' : 'height: 50vh';
    });

    const showNotif = () => {
      $q.notify({
        message: t('invalidInvoice'),
        type: 'negative',
        icon: 'error',
      });
    };

    const submit = () => {
      if (invoiceText.value === '') {
        blurInput();
      } else if (Number.isInteger(parseInt(invoiceText.value, 10))) {
        const n = Number(invoiceText.value);
        if (n > 0) {
          blurInput();
          $router.push({
            name: 'search',
            params: { invoice: invoiceText.value },
          });
        } else {
          showNotif();
        }
      } else {
        if (invoiceInputRef.value !== undefined) {
          blurInput();
        }
        showNotif();
      }
    };

    return {
      invoiceText,
      invoiceDialog,
      invoiceInputRef,
      dynamicHeight,
      isDismissed,
      focusInput,
      submit,
      handleDismiss,
    };
  },
};
</script>
