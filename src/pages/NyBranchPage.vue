<template>
  <q-scroll-area style="width: 100vw; height: 100vh">
    <q-card class="my-card q-mt-xl">
      <q-card-section>
        <div class="col text-h6 ellipsis">Embarque Tenares</div>
      </q-card-section>

      <iframe loading="lazy" class="iframe" :src="iframeSource" />

      <q-card-section class="q-pa-none">
        <q-btn
          fab
          @click="getDirections"
          color="primary"
          icon="directions"
          class="absolute"
          style="top: 0; right: 12px; transform: translateY(-50%)"
        >
          <q-tooltip
            transition-show="scale"
            transition-hide="scale"
            anchor="bottom middle"
            self="center middle"
          >
            <strong>{{ $t('tooltip0') }}</strong></q-tooltip
          ></q-btn
        >
      </q-card-section>
      <q-separator />
      <q-card-actions>
        <q-btn @click="call" flat round color="primary" icon="call" />
        <q-btn @click="call" flat color="black"> (718) 562-1300 </q-btn>
        <q-space />
        <q-btn @click="copy(1)" round flat icon="content_copy" color="grey-7">
          <q-tooltip
            transition-show="scale"
            transition-hide="scale"
            anchor="bottom middle"
            self="center middle"
          >
            <strong>{{ $t('copy1') }}</strong>
          </q-tooltip></q-btn
        >
      </q-card-actions>
      <q-card-actions>
        <q-btn @click="email" flat round color="primary" icon="email" />
        <q-btn @click="email" flat color="black" no-caps>
          ny@embarquetenares.com
        </q-btn>
        <q-space />
        <q-btn @click="copy(2)" round flat icon="content_copy" color="grey-7">
          <q-tooltip
            transition-show="scale"
            transition-hide="scale"
            anchor="bottom middle"
            self="center middle"
          >
            <strong>{{ $t('copy2') }} </strong>
          </q-tooltip></q-btn
        >
      </q-card-actions>

      <q-expansion-item
        id="schedule_expansion_item"
        icon="schedule"
        :label="$t('hours')"
        header-class="text-black text-bold q-py-md"
        expand-icon-class="text-black text-bold"
      >
        <q-list>
          <q-item style="padding-top: 1.5vh">
            <q-item-section>
              <q-item-label
                overline
                style="text-align: center; font-weight: bold; font-size: 18px"
                >{{ $t('monToSat') }}</q-item-label
              >
              <q-item-label style="text-align: center; font-weight: bold"
                >8AM - 6PM</q-item-label
              >
            </q-item-section>
          </q-item>

          <q-item style="padding-bottom: 1vh">
            <q-item-section>
              <q-item-label
                overline
                style="text-align: center; font-weight: bold; font-size: 18px"
                >{{ $t('sunday') }}</q-item-label
              >
              <q-item-label style="text-align: center; font-weight: bold">{{
                $t('closed')
              }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-expansion-item>
      <q-separator />
      <div>
        <q-btn
          flat
          square
          @click="openFB"
          icon="facebook"
          style="color: #1778f2; width: 33%"
          size="lg"
        />
        <q-btn
          flat
          square
          @click="openWhatsapp"
          icon="ion-logo-whatsapp"
          style="color: #25d366; width: 34%"
          size="lg"
        />
        <q-btn
          class="instagram"
          flat
          square
          @click="openIG"
          style="width: 33%"
          icon="ion-logo-instagram"
          size="lg"
        />
      </div>
    </q-card>
    <q-dialog v-model="dialog" seamless position="bottom">
      <q-card style="width: 350px">
        <q-card-section class="row justify-center wrap">
          <div class="text-weight-bold">{{ tooltipResponse }}</div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-scroll-area>

  <TabBar ref="tabBarRef" :buttonNumber="3" />
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';
import { openURL, copyToClipboard } from 'quasar';
import TabBar from 'src/components/TabBar.vue';

import '../css/branches.scss';

const src =
  'https://www.google.com/maps/embed/v1/place?q=place_id:ChIJJ_htcnz0wokRSDrgX-Y-Cv4&key=' +
  process.env.GOOGLE_MAPS_API_KEY;
export default defineComponent({
  components: {
    TabBar,
  },
  setup() {
    return {
      active: ref(true),
      expanded: ref(false),
      dialog: ref(false),
      tooltipResponse: ref(''),
      iframeSource: src,
    };
  },
  methods: {
    getDirections() {
      openURL(
        'https://www.google.com/maps/dir/?api=1&destination=2249+Washington+Ave,+Bronx,+NY+10457-1445,+USA'
      );
    },
    call() {
      openURL('tel:7185621300');
    },
    email() {
      openURL('mailto:ny@embarquetenares.com');
    },
    openFB() {
      openURL('https://www.facebook.com/EmbarqueTenaress/');
    },
    openIG() {
      openURL('https://instagram.com/embarquetenares');
    },
    openWhatsapp() {
      openURL('https://api.whatsapp.com/send?phone=7185621300');
    },
    copy(i: number) {
      let text = '';
      let ttr = '';
      switch (i) {
        case 0:
          ttr = this.$t('tooltipRes0');
          text = '2249 Washington Ave Bronx, NY 10457';
          break;
        case 1:
          ttr = this.$t('tooltipRes1');
          text = '7185621300';
          break;
        case 2:
          ttr = this.$t('tooltipRes2');
          text = 'ny@embarquetenares.com';
          break;
      }
      copyToClipboard(text)
        .then(() => {
          // success!
          this.tooltipResponse = ttr;
          this.dialog = true;
          setTimeout(() => {
            this.dialog = false;
          }, 3000);
        })
        .catch(() => {
          // fail
        });
    },
  },
});
</script>
