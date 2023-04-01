import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { getDoc, doc } from '@firebase/firestore';
import { InvoiceStateInterface } from './state';
import { api } from 'boot/axios';

import db from 'src/boot/firebase';
import { ref } from 'vue';

const actions: ActionTree<InvoiceStateInterface, StateInterface> = {
  async fetchAuthHeader({ dispatch }) {
    const docRef = doc(db, 'auth', 'login');
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const d = docSnap.data();
      try {
        api.defaults.headers.common['App-Id'] = d['App-Id'];
        api.defaults.headers.common['Api-Key'] = d['Api-Key'];
        api.defaults.headers.common['Auth-Type'] = process.env.HECTOR_AUTH_TYPE;
        const t = await dispatch('fetchToken');
        api.defaults.headers.common['Authorization'] = t;
      } catch (e) {
        console.log(e);
      }
    } else {
      console.log('Failed to retrieve app id and api key');
    }
  },
  async fetchToken() {
    const data = {
      Username: process.env.HECTOR_USERNAME,
      Type: process.env.HECTOR_TYPE,
    };
    try {
      const response = await api.post('/auth/login', data);

      const t = 'Bearer ' + response.data.response[0].token.access;
      return t;
    } catch (error) {
      console.log('Token retrieval error: ', error);
    }
  },
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
  async fetchInvoice({ commit, dispatch, state }, payload) {
    const eta = ref(0);
    if (state.etaDays < 0) {
      eta.value = await dispatch('fetchEtaDays');
    } else {
      eta.value = state.etaDays;
    }
    if (api.defaults.headers.common['Authorization'] === undefined) {
      const t = await dispatch('fetchToken');
      api.defaults.headers.common['Authorization'] = t;
    }
    try {
      const response = await api.get(payload);

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
        commit('setInvoiceResponse', invoiceResponse);
      } else {
        const invoiceResponse = {
          enDate: '',
          esDate: '',
          percent: 0,
          querySuccess: false,
        };
        commit('setInvoiceResponse', invoiceResponse);
      }
    } catch (error) {
      console.log(error);
      const invoiceResponse = {
        enDate: '',
        esDate: '',
        percent: 0,
        querySuccess: false,
      };
      commit('setInvoiceResponse', invoiceResponse);
    }
  },
};

export default actions;
