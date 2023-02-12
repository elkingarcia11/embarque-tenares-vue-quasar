<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="text-light">
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
          <a id="appTitle" href="/" class="q-pl-md">Embarque Tenares</a>
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
                <q-item-label>English</q-item-label>
              </q-item-section>
            </q-item>
            <q-item
              class="text-h6 text-black"
              clickable
              v-close-popup
              @click="changeLanguage(1)"
            >
              <q-item-section>
                <q-item-label>Español</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="drawer"
      :width="300"
      :breakpoint="500"
      overlay
      bordered
      class="bg-white"
    >
      <q-scroll-area class="fit q-pt-xl">
        <q-list>
          <template v-for="(menuItem, index) in menuList" :key="index">
            <q-item
              class="text-h6 q-pb-lg q-px-l"
              v-if="index < 4"
              clickable
              @click="$router.push(menuItem.route)"
              v-ripple
            >
              <q-item-section avatar>
                <q-avatar
                  :icon="menuItem.icon"
                  color="primary"
                  text-color="white"
                />
              </q-item-section>
              <q-item-section>
                {{ $t(menuItem.label) }}
              </q-item-section>
            </q-item>
            <q-expansion-item
              class="text-h6"
              v-if="index > 3"
              clickable
              :label="$t(menuItem.label)"
              default-closed
            >
              <template v-slot:header>
                <q-item-section avatar>
                  <q-avatar
                    :icon="menuItem.icon"
                    color="primary"
                    text-color="white"
                  />
                </q-item-section>

                <q-item-section> {{ $t(menuItem.label) }} </q-item-section>
              </template>
              <q-item
                class="text-subtitle1 q-py-md q-px-xl"
                v-for="(subMenuItem, index) in subMenuList"
                :key="index"
                clickable
                @click="$router.push(subMenuItem.route)"
                v-ripple
              >
                <q-avatar
                  :icon="subMenuItem.icon"
                  color="primary"
                  text-color="white"
                />
                <q-item-section class="q-pl-md">
                  {{ $t(subMenuItem.label) }}
                </q-item-section>
              </q-item>
            </q-expansion-item>
            <q-separator :key="'sep' + index" v-if="menuItem.separator" />
          </template>
        </q-list>
      </q-scroll-area>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
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
