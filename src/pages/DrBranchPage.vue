<template>
  <div class="body">
    <iframe
      class="iframe window-width"
      src="https://www.google.com/maps/embed/v1/place?q=place_id:ChIJ8VOEoNjtsY4R_dMCCAx0fK4&key=AIzaSyB0kKuIKDbsDYz_vbDTdFF2jomVUjcVKdY"
      height="250"
    />

    <div class="window-width">
      <div class="text-h5 q-pa-md">Tenares Shipping Corp.</div>
      <q-item>
        <q-item-section avatar>
          <q-icon name="location_on" color="primary" />
        </q-item-section>
        <q-item-section>
          <q-item-label>San Marcos #10</q-item-label>
          <q-item-label style="font-size: 12px" caption lines="1">{{
            $t('dr_province')
          }}</q-item-label>
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
          <q-item-label>(809) 970-0007</q-item-label>
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
          <q-item-label>rd@embarquetenares.com</q-item-label>
        </q-item-section>

        <q-btn @click="copy(2)" round flat icon="content_copy" color="grey-7">
          <q-tooltip
            transition-show="scale"
            transition-hide="scale"
            anchor="bottom middle"
            self="center middle"
          >
            <strong>{{ $t('copy2') }}</strong>
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
                >{{ $t('monToFri') }}</q-item-label
              >
              <q-item-label style="text-align: center; font-weight: bold"
                >8AM - 5PM</q-item-label
              >
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label
                overline
                style="text-align: center; font-weight: bold; font-size: 18px"
                >{{ $t('sat') }}</q-item-label
              >
              <q-item-label style="text-align: center; font-weight: bold"
                >8AM - 12PM</q-item-label
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
import { copyToClipboard } from 'quasar';
import '../css/branches.scss';

export default {
  setup() {
    return {
      active: ref(true),
      expanded: ref(false),
      dialog: ref(false),
      tooltipResponse: ref(''),
    };
  },
  methods: {
    getDirections() {
      openURL(
        'https://www.google.com/maps/dir/?api=1&destination=Tenares+Shipping+Corp.,+San+Marcos,+Puerto+Plata+57000,+Dominican+Republic'
      );
    },
    call() {
      openURL('tel:8099700007');
    },
    email() {
      openURL('mailto:rd@embarquetenares.com');
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
          text = 'San Marcos #10 Puerto Plata, RD 57000';
          break;
        case 1:
          ttr = this.$t('tooltipRes1');
          text = '8099700007';
          break;
        case 2:
          ttr = this.$t('tooltipRes2');
          text = 'rd@embarquetenares.com';
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
