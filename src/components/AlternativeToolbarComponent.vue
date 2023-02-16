<template>
  <q-toolbar>
    <q-toolbar-title class="row">
      <q-btn flat class="q-pl-none">
        <q-avatar>
          <img src="../assets/logo.png" style="background-color: white" />
        </q-avatar>
        <div
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
          flat
          text-color="white"
          label="Track"
          size="lg"
          style="font-family: 'BodoniSvtyTwoSCITCTT-Book'; font-weight: bolder"
        />
        <q-btn
          flat
          text-color="white"
          label="Rates"
          size="lg"
          style="font-family: 'BodoniSvtyTwoSCITCTT-Book'; font-weight: bolder"
        />
        <q-btn
          flat
          text-color="white"
          label="New York"
          size="lg"
          style="font-family: 'BodoniSvtyTwoSCITCTT-Book'; font-weight: bolder"
        />
        <q-btn
          flat
          text-color="white"
          label="Dominican Republic"
          size="lg"
          style="font-family: 'BodoniSvtyTwoSCITCTT-Book'; font-weight: bolder"
        />
        <q-btn
          flat
          text-color="white"
          label="FAQs"
          size="lg"
          style="font-family: 'BodoniSvtyTwoSCITCTT-Book'; font-weight: bolder"
        />
      </div>
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
