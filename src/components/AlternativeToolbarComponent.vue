<template>
  <q-btn flat class="q-pl-none">
    <q-avatar>
      <img src="../assets/logo.png" style="background-color: white" />
    </q-avatar>
    <div
      @click="
        $router.push({
          name: 'main',
        })
      "
      class="q-pl-md"
      style="
        font-family: 'BodoniSvtyTwoSCITCTT-Book';
        font-size: x-large;
        font-weight: bold;
      "
    >
      Embarque Tenares
    </div>
  </q-btn>
  <div class="row flex-center q-pl-lg">
    <q-btn
      @click="
        $router.push({
          name: 'track',
          params: { invoice: '' },
        })
      "
      flat
      text-color="white"
      :label="$t('track')"
      size="lg"
      style="font-family: 'BodoniSvtyTwoSCITCTT-Book'; font-weight: bolder"
    />
    <q-btn
      @click="
        $router.push({
          name: 'rates',
        })
      "
      flat
      text-color="white"
      :label="$t('rates')"
      size="lg"
      style="font-family: 'BodoniSvtyTwoSCITCTT-Book'; font-weight: bolder"
    />
    <q-btn
      @click="
        $router.push({
          name: 'nyb',
        })
      "
      flat
      text-color="white"
      :label="$t('nyb')"
      size="lg"
      style="font-family: 'BodoniSvtyTwoSCITCTT-Book'; font-weight: bolder"
    />
    <q-btn
      @click="
        $router.push({
          name: 'drb',
        })
      "
      flat
      text-color="white"
      :label="$t('drb')"
      size="lg"
      style="font-family: 'BodoniSvtyTwoSCITCTT-Book'; font-weight: bolder"
    />
    <q-btn
      @click="
        $router.push({
          name: 'faqs',
        })
      "
      flat
      text-color="white"
      :label="$t('faqs')"
      size="lg"
      style="font-family: 'BodoniSvtyTwoSCITCTT-Book'; font-weight: bolder"
    />
  </div>
</template>
