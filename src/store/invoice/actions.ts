import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { getDoc, doc } from '@firebase/firestore';
import { InvoiceStateInterface } from './state';
import { api } from 'boot/axios';

import { ref } from 'vue';
import { db } from 'src/boot/firebase';

const actions: ActionTree<InvoiceStateInterface, StateInterface> = {
  async fetchEtaDays({ commit, state }) {
    const docRef = doc(db, 'eta/eta_days');
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const d = docSnap.data();
      commit('setEtaDay', d.days);
      return state.etaDays;
    } else {
      commit('setEtaDay', 25);
      return state.etaDays;
    }
  },
  async fetchInvoice({ dispatch, state }, payload) {
    const eta = ref(0);
    if (state.etaDays < 0) {
      eta.value = await dispatch('fetchEtaDays');
    } else {
      eta.value = state.etaDays;
    }
    try {
      const header = await dispatch('auth/fetchAuthData', null, { root: true });
      const response = await api.get(payload, { headers: header });

      if (response.status >= 200 && response.status <= 299) {
        const a = new Date(response.data.response[0].date);
        const b = new Date();
        const options: Intl.DateTimeFormatOptions = {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        };

        a.setDate(a.getDate() + 25);
        const _MS_PER_DAY = 1000 * 60 * 60 * 24;
        // Discard the time and time-zone information.
        const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
        const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

        const enDate = a.toLocaleDateString('en-US', options);
        const esDate = a.toLocaleDateString('es-US', options);
        const dLeft = Math.floor((utc1 - utc2) / _MS_PER_DAY);
        const percent = ref(0);

        if (dLeft <= 0) {
          percent.value = 100;
        } else {
          percent.value = (1 - dLeft / eta.value) * 100;
        }
        const invoiceResponse = {
          enDate: enDate,
          esDate: esDate,
          percent: percent.value,
          querySuccess: true,
        };
        return invoiceResponse;
      } else {
        const invoiceResponse = {
          enDate: '',
          esDate: '',
          percent: 0,
          querySuccess: false,
        };
        return invoiceResponse;
      }
    } catch {
      throw Error();
    }
  },
};

export default actions;
