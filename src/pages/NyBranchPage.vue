<template>
  <div class="body">
    <iframe
      height="250"
      style="border: 0"
      loading="lazy"
      allowfullscreen
      class="iframe window-width"
      :src="iframeSource"
    ></iframe>
    <div class="window-width">
      <div class="text-h5 q-pa-md">Embarque Tenares Corp.</div>
      <q-item>
        <q-item-section avatar>
          <q-icon name="location_on" color="primary" />
        </q-item-section>
        <q-item-section>
          <q-item-label>2249 Washington Ave</q-item-label>
          <q-item-label style="font-size: 12px" caption lines="1">
            Bronx, NY 10457
          </q-item-label>
        </q-item-section>
        <q-btn @click="copy(0)" round flat icon="content_copy" color="grey-7">
          <q-tooltip
            transition-show="scale"
            transition-hide="scale"
            anchor="bottom middle"
            self="center middle"
          >
            <strong>{{ $t('copy0') }}</strong>
          </q-tooltip></q-btn
        >
        <q-btn
          @click="getDirections"
          round
          flat
          icon="directions"
          color="grey-7"
        >
          <q-tooltip
            transition-show="scale"
            transition-hide="scale"
            anchor="bottom middle"
            self="center middle"
          >
            <strong>{{ $t('tooltip0') }}</strong>
          </q-tooltip>
        </q-btn>
      </q-item>
      <q-item>
        <q-item-section avatar>
          <q-icon name="call" color="primary" />
        </q-item-section>
        <q-item-section>
          <q-item-label>(718) 562-1300</q-item-label>
        </q-item-section>

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
        <q-btn @click="call" round flat icon="call" color="grey-7">
          <q-tooltip
            transition-show="scale"
            transition-hide="scale"
            anchor="bottom middle"
            self="center middle"
          >
            <strong>{{ $t('tooltip1') }}</strong>
          </q-tooltip>
        </q-btn>
      </q-item>
      <q-item>
        <q-item-section avatar>
          <q-icon name="email" color="primary" />
        </q-item-section>
        <q-item-section>
          <q-item-label>ny@embarquetenares.com</q-item-label>
        </q-item-section>
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
        <q-btn @click="email" round flat icon="email" color="grey-7">
          <q-tooltip
            transition-show="scale"
            transition-hide="scale"
            anchor="bottom middle"
            self="center middle"
          >
            <strong>{{ $t('tooltip2') }}</strong>
          </q-tooltip>
        </q-btn>
      </q-item>
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
      <div class="row justify-around q-mt-sm">
        <q-btn
          flat
          square
          @click="openFB"
          icon="facebook"
          label="facebook"
          style="color: #1778f2"
        />
        <q-btn
          flat
          square
          @click="openWhatsapp"
          icon="ion-logo-whatsapp"
          label="whatsapp"
          style="color: #25d366"
        />
        <q-btn
          class="instagram"
          flat
          square
          @click="openIG"
          icon="ion-logo-instagram"
          label="instagram"
        />
      </div>
    </div>
    <q-dialog v-model="dialog" seamless position="bottom">
      <q-card style="width: 350px">
        <q-card-section class="row justify-center wrap">
          <div class="text-weight-bold">{{ this.tooltipResponse }}</div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { ref } from 'vue';
import { openURL } from 'quasar';
import '../css/branches.scss';
import { copyToClipboard } from 'quasar';
const src =
  'https://www.google.com/maps/embed/v1/place?q=place_id:ChIJJ_htcnz0wokRSDrgX-Y-Cv4&key=' +
  process.env.GOOGLE_MAPS_API_KEY;
export default {
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
    copy(i) {
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
};
</script>
