<template>
  <q-page-container id="home-body">
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
          key=""
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
    <div id="logoDiv">
      <q-img id="logo" src="../assets/logo.png" fit="contain" />
    </div>
    <q-dialog v-model="invoiceDialog" full-width transition-hide="slide-down">
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

    <TabBar
      ref="tabBarRef"
      :buttonNumber="0"
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
  </q-page-container>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import TabBar from 'src/components/TabBar.vue';
import '../css/home.scss';

export default defineComponent({
  components: {
    TabBar,
  },
  setup() {
    return {
      invoiceDialog: ref(false),
      invoiceText: '',
      successfullyRetrieved: false,
    };
  },
  methods: {
    submit() {
      // Submit
      if (this.invoiceText === '') {
        (this.$refs['invoiceInputRef'] as any).focus();
      } else {
        (this.$refs['invoiceInputRef'] as any).blur();
        this.$router.push({
          name: 'trackSpecific',
          params: { invoice: this.invoiceText },
        });
      }
    },
  },
});
</script>
