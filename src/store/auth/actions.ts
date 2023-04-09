import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { getDoc, doc } from '@firebase/firestore';
import { AuthStateInterface } from './state';
import { getAuth } from 'firebase/auth';

import db from 'src/boot/firebase';

const actions: ActionTree<AuthStateInterface, StateInterface> = {
  async fetchAuthData({ state }) {
    let appId: string | null, apiKey: string | null, token: string | null;
    if (state.apiKey && state.appId) {
      appId = state.apiKey;
      apiKey = state.appId;
    } else {
      const docRef = doc(db, 'auth', 'login');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const d = docSnap.data();
        appId = d['App-Id'];
        apiKey = d['Api-Key'];
      } else {
        throw Error();
      }
    }

    if (state.token) {
      token = state.token;
    } else {
      const auth = getAuth();
      const t = await auth.currentUser?.getIdToken();
      if (typeof t === 'string') {
        token = t;
      } else {
        throw Error();
      }
    }

    return {
      'App-Id': appId,
      'Api-Key': apiKey,
      Authorization: `Bearer ${token}`,
    };
  },
};

export default actions;
