<template>
  <q-btn @click="$router.push('/')" flat class="q-py-md q-ml-none">
    <q-avatar>
      <img src="../assets/logo.png" style="background-color: white" />
    </q-avatar>
    <div
      class="q-pl-md"
      style="
        font-family: 'BodoniSvtyTwoSCITCTT-Book';
        font-size: xx-large;
        font-weight: bold;
      "
    >
      Embarque Tenares
    </div>
  </q-btn>
  <div class="row flex-center q-pl-lg">
    <q-btn
      class="q-py-md"
      @click="$router.push('/track')"
      flat
      text-color="white"
      :label="$t('track')"
      size="lg"
      style="font-family: 'BodoniSvtyTwoSCITCTT-Book'; font-weight: bolder"
    />
    <q-btn
      class="q-py-md"
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
      class="q-py-md"
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
      class="q-py-md"
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
      class="q-py-md"
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
