<template>
  <div class="footer full-width">
    <div class="text-primary q-pt-lg footer-title">Embarque Tenares Corp.</div>
    <div class="q-pt-sm row">
      <q-btn
        flat
        square
        @click="openWhatsapp"
        icon="ion-logo-whatsapp"
        style="color: #25d366"
        size="30px"
      />
      <q-btn
        flat
        square
        @click="openFB"
        icon="facebook"
        style="color: #1778f2"
        size="30px"
      />
      <q-btn
        class="instagram"
        flat
        square
        @click="openIG"
        icon="ion-logo-instagram"
        size="30px"
      />
      <q-btn flat square icon="phone" size="30px" color="accent">
        <q-menu anchor="top middle" self="bottom middle">
          <q-item clickable @click="callNy" class="text-accent">
            <q-avatar icon="phone" />
            <q-item-section>{{ $t('nyb') }}</q-item-section>
          </q-item>
          <q-item clickable @click="callDr" class="text-secondary">
            <q-avatar icon="phone" />
            <q-item-section>{{ $t('drb') }}</q-item-section>
          </q-item>
        </q-menu>
      </q-btn>
      <q-btn flat square icon="mail" color="red" size="30px">
        <q-menu anchor="top middle" self="bottom middle">
          <q-item clickable @click="emailNy" class="text-accent">
            <q-avatar icon="mail" />
            <q-item-section>{{ $t('nyb') }}</q-item-section>
          </q-item>
          <q-item clickable @click="emailDr" class="text-secondary">
            <q-avatar icon="mail" />
            <q-item-section>{{ $t('drb') }}</q-item-section>
          </q-item>
        </q-menu>
      </q-btn>
    </div>
    <div class="row text-grey-7 flex-center">
      <q-btn flat @click="$router.push('faqs')">{{ $t('about') }}</q-btn>
      <q-btn flat @click="$router.push('track')">{{ $t('track') }}</q-btn>
      <q-btn flat @click="$router.push('rates')">{{ $t('rates') }}</q-btn>

      <q-btn flat
        >{{ $t('contact') }}
        <q-menu anchor="top middle" self="bottom middle">
          <q-item
            clickable
            @click="$router.push('ny-branch')"
            class="text-accent"
          >
            <q-avatar icon="person" />
            <q-item-section>{{ $t('nyb') }}</q-item-section>
          </q-item>
          <q-item
            clickable
            @click="$router.push('dr-branch')"
            class="text-secondary"
          >
            <q-avatar icon="person" />
            <q-item-section>{{ $t('drb') }}</q-item-section>
          </q-item>
        </q-menu>
      </q-btn>
      <q-btn flat @click="$router.push('faqs')">{{ $t('faqs') }}</q-btn>
      <q-btn flat @click="$router.push('shipping-policy')">{{
        $t('policy')
      }}</q-btn>
    </div>

    <div class="text-caption text-center q-px-md q-py-sm">
      © 1998-2023 EMBARQUE TENARES CORP. {{ $t('rights') }}
    </div>

    <div>CI/CD Test</div>
  </div>
</template>

<script lang="ts">
import { openURL } from 'quasar';
import '../css/footer.scss';

export default {
  setup() {
    const callNy = () => {
      openURL('tel:7185621300');
    };

    const callDr = () => {
      openURL('tel:8099700007');
    };

    const emailNy = () => {
      openURL('mailto:ny@embarquetenares.com');
    };

    const emailDr = () => {
      openURL('mailto:rd@embarquetenares.com');
    };

    const openFB = () => {
      openURL('https://www.facebook.com/EmbarqueTenaress/');
    };

    const openIG = () => {
      openURL('https://instagram.com/embarquetenares');
    };

    const openWhatsapp = () => {
      openURL('https://api.whatsapp.com/send?phone=7185621300');
    };

    return {
      openWhatsapp,
      openFB,
      openIG,
      callNy,
      callDr,
      emailNy,
      emailDr,
    };
  },
};
</script>
