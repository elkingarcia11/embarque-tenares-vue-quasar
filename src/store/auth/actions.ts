import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { getDoc, doc } from '@firebase/firestore';
import { AuthStateInterface } from './state';
import { getAuth } from 'firebase/auth';
import { db } from 'src/boot/firebase';

const actions: ActionTree<AuthStateInterface, StateInterface> = {
  async fetchAuthData({ state }) {
    let appId: string | null = null;
    let apiKey: string | null = null;
    let token: string | null = null;
    
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
          console.warn('Auth document not found');
          return null;
        }
      } catch (error) {
        console.error('Error fetching auth data:', error);
        return null;
      }
    }

    // Get the auth token with retry logic
    try {
      const auth = getAuth();
      let retries = 0;
      const maxRetries = 3;
      
      while (retries < maxRetries) {
        const currentUser = auth.currentUser;
        
        if (currentUser) {
          token = await currentUser.getIdToken();
          break;
        } else {
          // Wait for 1 second before retrying
          await new Promise(resolve => setTimeout(resolve, 1000));
          retries++;
          
          if (retries === maxRetries) {
            console.warn('Max retries reached waiting for authentication');
            return null;
          }
        }
      }
      
      return {
        'App-Id': appId,
        'Api-Key': apiKey,
        Authorization: token ? `Bearer ${token}` : undefined,
      };
    } catch (error) {
      console.error('Error getting auth token:', error);
      return null;
    }
  },
};

export default actions;
