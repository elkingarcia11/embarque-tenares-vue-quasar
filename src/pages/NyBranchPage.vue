<template>
  <iframe
    class="iframe full-width"
    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12071.159342342082!2d-73.8939588!3d40.8545378!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xc4366e78110568f2!2sEmbarque%20Tenares!5e0!3m2!1sen!2sus!4v1638554477836!5m2!1sen!2sus"
    height="250"
  />
  <div class="full-width">
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
          <strong>Copy address</strong>
        </q-tooltip></q-btn
      >
      <q-btn @click="getDirections" round flat icon="directions" color="grey-7">
        <q-tooltip
          transition-show="scale"
          transition-hide="scale"
          anchor="bottom middle"
          self="center middle"
        >
          <strong>Get directions</strong>
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
          <strong>Copy address</strong>
        </q-tooltip></q-btn
      >
      <q-btn @click="call" round flat icon="call" color="grey-7">
        <q-tooltip
          transition-show="scale"
          transition-hide="scale"
          anchor="bottom middle"
          self="center middle"
        >
          <strong>Call phone number</strong>
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
          <strong>Copy address</strong>
        </q-tooltip></q-btn
      >
      <q-btn @click="email" round flat icon="email" color="grey-7">
        <q-tooltip
          transition-show="scale"
          transition-hide="scale"
          anchor="bottom middle"
          self="center middle"
        >
          <strong>Send email</strong>
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
    <div class="full-width">
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
  <q-dialog v-model="dialog" position="bottom">
    <q-card style="width: 350px">
      <q-card-section class="row items-center no-wrap">
        <div>
          <div class="text-weight-bold">Copied to clipboard!</div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { ref } from 'vue';
import { openURL } from 'quasar';
import '../css/branches.scss';
import { copyToClipboard } from 'quasar';

export default {
  setup() {
    return {
      active: ref(true),
      expanded: ref(false),
      dialog: ref(false),
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
      switch (i) {
        case 0:
          text = '2249 Washington Ave Bronx, NY 10457';
          break;
        case 1:
          text = '7185621300';
          break;
        case 2:
          text = 'ny@embarquetenares.com';
          break;
      }
      copyToClipboard(text)
        .then(() => {
          // success!
          this.dialog = true;
        })
        .catch(() => {
          // fail
        });
    },
  },
};
</script>
