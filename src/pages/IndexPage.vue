<template>
  <!-- Main content of the index page -->

  <!-- Invoice tracking form -->
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
        <!-- Button to open the invoice dialog -->
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

  <!-- Logo display -->
  <div class="row flex-center q-py-xl">
    <q-img
      class="q-my-xl"
      id="logo"
      src="../assets/logo.png"
      fit="contain"
      :style="dynamicHeight"
    />
  </div>

  <!-- Invoice dialog -->
  <q-dialog v-model="invoiceDialog" transition-hide="slide-down">
    <q-card>
      <q-toolbar class="bg-primary">
        <div class="text-white text-center q-px-sm q-py-md dialogToolbar">
          <!-- Title of the invoice dialog -->
          {{ $t('findInv')
          }}<span class="text-weight-bold">{{ $t('findInvTwo') }}</span>
        </div>
      </q-toolbar>
      <q-separator />
      <q-card-section class="row full-height justify-center">
        <!-- Display an image based on the selected locale -->
        <q-img
          loading="eager"
          v-if="$i18n.locale == 'en-US'"
          class="self-center"
          id="logo"
          fit="contain"
          src="../assets/trackEN.png"
        />
        <q-img
          loading="eager"
          v-else
          class="self-center"
          id="logo"
          fit="contain"
          src="../assets/trackES.png"
        />
      </q-card-section>
    </q-card>
  </q-dialog>

  <!-- Tab bar component -->
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
    // State variables
    const isDismissed = ref(false);
    const invoiceText = ref('');
    const invoiceDialog = ref(false);
    const invoiceInputRef: Ref<QInput | null> = ref(null);

    // Access Quasar utilities
    const $router = useRouter();
    const $q = useQuasar();
    const { t } = useI18n();

    // Computed property for dynamic logo height
    const dynamicHeight = computed(() => {
      return $q.platform.is.mobile ? 'height: 33vh' : 'height: 50vh';
    });

    // Function to handle input blur event
    const handleDismiss = () => {
      isDismissed.value = true;
    };

    // Focus the input element
    const focusInput = () => {
      isDismissed.value = false;
      const inputEl = invoiceInputRef.value?.$el.querySelector('input');
      inputEl?.focus();
    };

    // Blur the input element
    const blurInput = () => {
      const inputEl = invoiceInputRef.value?.$el.querySelector('input');
      inputEl?.blur();
    };

    // Show a notification
    const showNotif = () => {
      $q.notify({
        message: t('invalidInvoice'),
        type: 'negative',
        icon: 'error',
      });
    };

    // Handle form submission
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

    // Return data and methods for the component
    return {
      dynamicHeight,
      invoiceDialog,
      invoiceInputRef,
      invoiceText,
      isDismissed,
      focusInput,
      handleDismiss,
      submit,
    };
  },
};
</script>
