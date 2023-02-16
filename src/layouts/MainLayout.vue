<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="text-light row">
      <q-toolbar>
        <q-toolbar-title class="row">
          <ToolbarWrapper />
          <q-space />
          <q-btn-dropdown
            :ripple="false"
            flat
            round
            dense
            icon="language"
            :label="label"
            style="
              font-family: 'BodoniSvtyTwoSCITCTT-Book';
              font-weight: bolder;
            "
          >
            <q-list class="text-h6 text-black">
              <q-item clickable v-close-popup @click="changeLanguage(1)">
                <q-item-section>
                  <q-item-label
                    :class="esClass"
                    style="font-family: 'BodoniSvtyTwoSCITCTT-Book'"
                    >Español</q-item-label
                  >
                </q-item-section>
              </q-item>
              <q-item clickable v-close-popup @click="changeLanguage(0)">
                <q-item-section>
                  <q-item-label
                    :class="engClass"
                    style="font-family: 'BodoniSvtyTwoSCITCTT-Book'"
                    >English</q-item-label
                  >
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';
import ToolbarWrapper from '../components/ToolbarWrapper.vue';

export default defineComponent({
  components: {
    ToolbarWrapper,
  },
  data() {
    return {
      drawer: ref(false),
      label: 'Español',
      title: 'Embarque Tenares',
      engClass: '',
      esClass: 'text-bold',
    };
  },
  methods: {
    changeLanguage(i: number) {
      if (i === 0) {
        this.$i18n.locale = 'en-US';
        this.label = 'English';
        this.engClass = 'text-bold';
        this.esClass = '';
      } else {
        this.$i18n.locale = 'es-US';
        this.label = 'Español';
        this.esClass = 'text-bold';
        this.engClass = '';
      }
    },
  },
});
</script>
