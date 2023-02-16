<template>
  <q-toolbar>
    <q-btn
      :ripple="false"
      flat
      @click="drawer = !drawer"
      round
      dense
      icon="menu"
    />
    <q-toolbar-title>
      <a
        id="appTitle"
        href="/"
        class="q-pl-md"
        style="font-family: 'BodoniSvtyTwoSCITCTT-Book'"
      >
        Embarque Tenares
      </a>
    </q-toolbar-title>
    <q-btn-dropdown
      :ripple="false"
      flat
      round
      dense
      icon="language"
      :label="label"
    >
      <q-list>
        <q-item
          class="text-h6 text-black"
          clickable
          v-close-popup
          @click="changeLanguage(0)"
        >
          <q-item-section>
            <q-item-label style="font-family: 'BodoniSvtyTwoSCITCTT-Book'"
              >English</q-item-label
            >
          </q-item-section>
        </q-item>
        <q-item
          class="text-h6 text-black"
          clickable
          v-close-popup
          @click="changeLanguage(1)"
        >
          <q-item-section>
            <q-item-label style="font-family: 'BodoniSvtyTwoSCITCTT-Book'"
              >Español</q-item-label
            >
          </q-item-section>
        </q-item>
      </q-list>
    </q-btn-dropdown>
  </q-toolbar>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';
export default defineComponent({
  data() {
    return {
      drawer: ref(false),
      label: 'Español',
      title: 'Embarque Tenares',
      subMenuList: [
        {
          icon: 'pin_drop',
          label: 'nyb',
          route: 'ny-branch',
          separator: false,
        },
        {
          icon: 'pin_drop',
          label: 'drb',
          route: 'dr-branch',
          separator: false,
        },
      ],
      menuList: [
        {
          icon: 'home',
          label: 'home',
          route: '/',
          separator: false,
        },
        {
          icon: 'search',
          label: 'track',
          route: 'track',
          separator: false,
        },
        {
          icon: 'local_atm',
          label: 'rates',
          route: 'rates',
          separator: false,
        },
        {
          icon: 'quiz',
          label: 'faqs',
          route: 'faqs',
          separator: false,
        },
        {
          icon: 'map',
          label: 'branch',
          separator: false,
        },
      ],
    };
  },
  methods: {
    changeLanguage(i: number) {
      if (i === 0) {
        this.$i18n.locale = 'en-US';
        this.label = 'English';
      } else {
        this.$i18n.locale = 'es-US';
        this.label = 'Español';
      }
    },
  },
});
</script>
