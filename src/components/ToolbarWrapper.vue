<template>
  <MobileToolbarComponent v-if="$q.platform.is.mobile" />
  <AlternativeToolbarComponent v-else />
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';
import MobileToolbarComponent from './MobileToolbarComponent.vue';
import AlternativeToolbarComponent from './AlternativeToolbarComponent.vue';

export default defineComponent({
  components: {
    MobileToolbarComponent,
    AlternativeToolbarComponent,
  },
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
