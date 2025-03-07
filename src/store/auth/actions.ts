import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { getDoc, doc } from '@firebase/firestore';
import { AuthStateInterface } from './state';
import { getAuth } from 'firebase/auth';

import db from 'src/boot/firebase';

const actions: ActionTree<AuthStateInterface, StateInterface> = {
  async fetchAuthData({ state }) {
    let appId: string | null, apiKey: string | null, token: string | null;
    
    // Check if we already have the credentials in state
    if (state.apiKey && state.appId) {
      apiKey = state.apiKey;
      appId = state.appId;
    } else {
      try {
        const docRef = doc(db, 'auth', 'login');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const d = docSnap.data();
          appId = d['App-Id'];
          apiKey = d['Api-Key'];
        } else {
          throw new Error('Auth document not found');
        }
      } catch (error) {
        console.error('Error fetching auth data:', error);
        throw new Error('Failed to fetch auth data');
      }
    }

    // Get the auth token
    try {
      const auth = getAuth();
      const currentUser = auth.currentUser;
      
      if (currentUser) {
        token = await currentUser.getIdToken();
      } else {
        throw new Error('No authenticated user');
      }
    } catch (error) {
      console.error('Error getting auth token:', error);
      throw new Error('Failed to get auth token');
    }

    return {
      'App-Id': appId,
      'Api-Key': apiKey,
      Authorization: `Bearer ${token}`,
    };
  },
};

export default actions;
