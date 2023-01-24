<template>
  <q-page-container class="branches-body">
        <q-scroll-area
          class="scroll-area">
                    <iframe class="iframe" src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15016.306657341116!2d-70.7169399!3d19.7943466!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xae7c740c0802d3fd!2sTenares%20shipment%20Corp.!5e0!3m2!1sen!2sus!4v1639282574677!5m2!1sen!2sus" width="350" height="250"  style="border:0; display: block; margin: 0 auto;" allowfullscreen="" loading="lazy"></iframe>
                    <q-item class="q-py-md" id="branch_row_one" clickable @click="getDirections" v-ripple:primary style="margin-top: 2vh;">
                      <q-item-section avatar>
                        <q-icon name="directions" color="primary" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>San Marcos #10</q-item-label>
                        <q-item-label style="font-size: 12px;" caption lines="1">{{$t('dr_province')}}</q-item-label>
                      </q-item-section>
                    </q-item>
                     <q-item class="q-py-md" id="branch_row_two" clickable @click="call" v-ripple:secondary :active="active" active-class="bg-white text-black">
                      <q-item-section avatar >
                        <q-icon name="call" color="secondary" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>(809) - 970 - 0007</q-item-label>
                      </q-item-section>
                    </q-item>
                     <q-item class="q-py-md" id="branch_row_three" clickable @click="email"  v-ripple:dark :active="active" active-class="bg-white text-black">
                      <q-item-section avatar>
                        <q-icon name="email" color="dark" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>rd@embarquetenares.com</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-expansion-item
                      id="schedule_expansion_item"
                      icon="schedule"
                      :label="$t('hours')"
                      header-class="text-black text-bold q-py-md"
                      expand-icon-class="text-black text-bold"
                    >
                      <q-list>
                        <q-item style="padding-top: 1.5vh;">
                          <q-item-section >
                            <q-item-label overline style="text-align: center; font-weight: bold; font-size: 18px;">{{$t('monToFri')}}</q-item-label>
                            <q-item-label style="text-align: center;">8AM - 5PM</q-item-label>
                          </q-item-section>
                        </q-item>
                        <q-item>
                          <q-item-section >
                            <q-item-label overline style="text-align: center; font-weight: bold; font-size: 18px;">{{$t('sat')}}</q-item-label>
                            <q-item-label style="text-align: center;">8AM - 12PM</q-item-label>
                          </q-item-section>
                        </q-item>

                        <q-item style="padding-bottom: 1vh;">
                          <q-item-section >
                            <q-item-label overline style="text-align: center; font-weight: bold; font-size: 18px;">{{$t('sunday')}}</q-item-label>
                            <q-item-label style="text-align: center;">{{$t('closed')}}</q-item-label>
                          </q-item-section>
                        </q-item>
                      </q-list>
                    </q-expansion-item>
              <div class="social-media-btns">
                <q-btn class="social-media-btn" flat square @click="openFB" :icon="'lab la-facebook-f'" label="facebook" style="color: #1778F2;"/>
                <q-btn class="social-media-btn instagram" flat square @click="openIG" :icon="'lab la-instagram'" label="instagram" />
              </div>
        </q-scroll-area>
  </q-page-container>
  <q-footer>
  </q-footer>
</template>

<script>
import { ref } from 'vue'
import { openURL } from 'quasar'
import '../css/branches.scss'

export default {
  setup () {
    return {
      active: ref(true),
      expanded: ref(false)
    }
  },
  methods: {
    getDirections () {
      openURL('https://www.google.com/maps/dir/?api=1&destination=Tenares+Shipping+Corp.,+San+Marcos,+Puerto+Plata+57000,+Dominican+Republic')
    },
    call () {
      openURL('tel:8099700007')
    },
    email () {
      openURL('mailto:rd@embarquetenares.com')
    },
    openFB () {
      openURL('https://www.facebook.com/EmbarqueTenaress/')
    },
    openIG () {
      openURL('https://instagram.com/embarquetenares')
    }
  }
}
</script>
