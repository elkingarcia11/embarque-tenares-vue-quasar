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
        <q-toolbar-title
          ><a id="appTitle" href="/" class="q-pl-md">{{
            title
          }}</a></q-toolbar-title
        >
        <q-btn-dropdown :ripple="false" flat round dense icon="language">
          <q-list>
            <q-item
              class="text-h6 text-black"
              clickable
              v-close-popup
              @click="$i18n.locale = 'en-US'"
            >
              <q-item-section>
                <q-item-label>English</q-item-label>
              </q-item-section>
            </q-item>
            <q-item
              class="text-h6 text-black"
              clickable
              v-close-popup
              @click="$i18n.locale = 'es-US'"
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
      <q-scroll-area class="fit">
        <q-list>
          <template v-for="(menuItem, index) in menuList" :key="index">
            <q-item
              class="text-h6 q-py-lg q-px-lg text-black"
              v-if="index < 4"
              clickable
              @click="$router.push(menuItem.route)"
              v-ripple
            >
              <q-item-section avatar>
                <q-icon :name="menuItem.icon" />
              </q-item-section>
              <q-item-section>
                {{ menuItem.label }}
              </q-item-section>
            </q-item>
            <q-expansion-item
              class="text-h6 text-black"
              v-if="index > 3"
              clickable
              :icon="menuItem.icon"
              expand-icon-class="text-black"
              :label="menuItem.label"
              header-class="q-py-lg q-px-lg text-black"
              default-closed
            >
              <q-item
                class="text-subtitle1 q-py-md q-px-xl text-black"
                v-for="(subMenuItem, index) in subMenuList"
                :key="index"
                clickable
                @click="$router.push(subMenuItem.route)"
                v-ripple
              >
                <q-item-section avatar>
                  <q-icon :name="subMenuItem.icon" />
                </q-item-section>
                <q-item-section>
                  {{ subMenuItem.label }}
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

<script>
const drawer = false;
const menuList = [
  {
    icon: 'home',
    label: 'Home',
    route: '/',
    separator: false,
  },
  {
    icon: 'search',
    label: 'Track',
    route: 'track',
    separator: false,
  },
  {
    icon: 'local_atm',
    label: 'Rates',
    route: 'rates',
    separator: false,
  },
  {
    icon: 'quiz',
    label: 'FAQs',
    route: 'faqs',
    separator: false,
  },
  {
    icon: 'map',
    label: 'Locations',
    separator: false,
  },
];

const subMenuList = [
  {
    icon: 'pin_drop',
    label: 'New York',
    route: 'ny-branch',
    separator: false,
  },
  {
    icon: 'pin_drop',
    label: 'Dominican Republic',
    route: 'dr-branch',
    separator: false,
  },
];

export default {
  data() {
    return {
      drawer,
      menuList,
      subMenuList,
      title: 'Embarque Tenares',
    };
  },
  watch: {
    $route(to) {
      switch (to.name) {
        case 'track': {
          this.title = 'Track';
          break;
        }
        case 'rates': {
          this.title = 'Rates';
          break;
        }
        case 'nyb': {
          this.title = 'New York';
          break;
        }
        case 'drb': {
          this.title = 'Dominican Republic';
          break;
        }
        case 'faqs': {
          this.title = 'FAQs';
          break;
        }
        default: {
          this.title = 'Embarque Tenares';
          //statements;
          break;
        }
      }
    },
  },
};
</script>
