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
          <a v-if="returnRoute() === 0" id="appTitle" href="/" class="q-pl-md"
            >Embarque Tenares</a
          >
          <a
            v-else-if="returnRoute() === 1"
            id="appTitle"
            href="/"
            class="q-pl-md"
            >{{ $t('track') }}</a
          >
          <a
            v-else-if="returnRoute() === 2"
            id="appTitle"
            href="/"
            class="q-pl-md"
            >{{ $t('rates') }}</a
          >
          <a
            v-else-if="returnRoute() === 3"
            id="appTitle"
            href="/"
            class="q-pl-md"
            >{{ $t('nyb') }}</a
          >
          <a
            v-else-if="returnRoute() === 4"
            id="appTitle"
            href="/"
            class="q-pl-md"
            >{{ $t('drb') }}</a
          >
          <a
            v-else-if="returnRoute() === 5"
            id="appTitle"
            href="/"
            class="q-pl-md"
            >{{ $t('faqs') }}</a
          >
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
      <TabBar
        ref="tabBarRef"
        @tabOne="goToTabOne"
        @tabTwo="goToTabTwo"
        @tabThree="goToTabThree"
        @tabFour="goToTabFour"
      />
      <q-dialog v-model="dialog">
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
  </q-layout>
</template>

<script lang="ts">
import { ref } from 'vue';
import TabBar from '../components/TabBar.vue';

export default {
  components: {
    TabBar,
  },
  data() {
    return {
      dialog: ref(false),
      drawer: ref(false),
      label: 'Español',
      title: 'Embarque Tenares',
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
    changeLanguage(i: number) {
      if (i === 0) {
        this.$i18n.locale = 'en-US';
        this.label = 'English';
      } else {
        this.$i18n.locale = 'es-US';
        this.label = 'Español';
      }
    },
    goToTabOne() {
      this.$router.push('track');
    },
    goToTabTwo() {
      this.$router.push('rates');
    },
    goToTabThree() {
      this.dialog = true;
    },
    goToTabFour() {
      this.$router.push('faqs');
    },
    returnRoute() {
      switch (this.$route.name) {
        case 'main':
          return 0;
        case 'track':
          return 1;
        case 'rates':
          return 2;
        case 'nyb':
          return 3;
        case 'drb':
          return 4;
        case 'faqs':
          return 5;
        default:
          return 0;
      }
    },
  },
};
</script>
