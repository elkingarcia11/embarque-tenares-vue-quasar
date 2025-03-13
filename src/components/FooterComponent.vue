<template>
  <div class="footer full-width">
    <!-- Footer Title -->
    <div class="text-primary q-pt-lg footer-title">Embarque Tenares Corp.</div>

    <!-- Social Media Icons -->
    <div class="q-pt-sm row justify-center">
      <SocialMediaBar :isRound="true" fontSize="30px" />
    </div>

    <!-- Navigation Links -->
    <div class="row text-grey-7 flex-center">
      <q-btn flat @click="router.push('faqs')">{{ t('about') }}</q-btn>
      <q-btn flat @click="router.push('track')">{{ t('track') }}</q-btn>
      <q-btn flat @click="router.push('rates')">{{ t('rates') }}</q-btn>

      <!-- Contact Dropdown Menu -->
      <q-btn flat
        >{{ t('contact') }}
        <q-menu anchor="top middle" self="bottom middle">
          <q-item
            clickable
            @click="router.push('ny-branch')"
            class="text-accent"
          >
            <q-avatar icon="person" />
            <q-item-section>{{ t('nyb') }}</q-item-section>
          </q-item>
          <q-item
            clickable
            @click="router.push('dr-branch')"
            class="text-secondary"
          >
            <q-avatar icon="person" />
            <q-item-section>{{ t('drb') }}</q-item-section>
          </q-item>
        </q-menu>
      </q-btn>
      <q-btn flat @click="router.push('faqs')">{{ t('faqs') }}</q-btn>
      <q-btn flat @click="router.push('shipping-policy')">{{ t('policy') }}</q-btn>
    </div>

    <!-- Copyright Notice -->
    <div class="text-caption text-center q-px-md q-py-md copyright-notice">
      © 1998-2025 EMBARQUE TENARES CORP. {{ t('rights') }}
    </div>
  </div>
</template>

<script lang="ts">
import { openURL } from 'quasar';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import '../css/footer.scss';
import SocialMediaBar from './SocialMediaBar.vue';

export default {
  name: 'FooterComponent',
  components: {
    SocialMediaBar
  },
  setup() {
    const router = useRouter();
    const { t } = useI18n();
    const openUrl = (url: string) => {
      openURL(url);
    };

    return {
      openUrl,
      router,
      t
    };
  },
};
</script>
