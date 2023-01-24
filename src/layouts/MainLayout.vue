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
const label = 'Español';
const drawer = false;

export default {
  data() {
    return {
      drawer,
      subMenuList: [
        {
          icon: 'pin_drop',
          label: this.$t('nyb'),
          route: 'ny-branch',
          separator: false,
        },
        {
          icon: 'pin_drop',
          label: this.$t('drb'),
          route: 'dr-branch',
          separator: false,
        },
      ],
      label,
      title: 'Embarque Tenares',
      menuList: [
        {
          icon: 'home',
          label: this.$t('home'),
          route: '/',
          separator: false,
        },
        {
          icon: 'search',
          label: this.$t('track'),
          route: 'track',
          separator: false,
        },
        {
          icon: 'local_atm',
          label: this.$t('rates'),
          route: 'rates',
          separator: false,
        },
        {
          icon: 'quiz',
          label: this.$t('faqs'),
          route: 'faqs',
          separator: false,
        },
        {
          icon: 'map',
          label: this.$t('branch'),
          separator: false,
        },
      ],
    };
  },
  methods: {
    changeLanguage(i) {
      if (i === 0) {
        this.$i18n.locale = 'en-US';
        this.label = 'English';
      } else {
        this.$i18n.locale = 'es-US';
        this.label = 'Español';
      }
    },
  },
  watch: {
    $route(to) {
      switch (to.name) {
        case 'track': {
          this.title = this.$t('track');
          break;
        }
        case 'rates': {
          this.title = this.$t('rates');
          break;
        }
        case 'nyb': {
          this.title = this.$t('nyb');
          break;
        }
        case 'drb': {
          this.title = this.$t('drb');
          break;
        }
        case 'faqs': {
          this.title = this.$t('faqs');
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
