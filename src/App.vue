<template>
  <router-view />
</template>

<script lang="ts">
import { onMounted } from 'vue';
import { useStore } from './store';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export default {
  name: 'App',
  setup() {
    const $store = useStore();
    const auth = getAuth(); // Get the Firebase Auth instance
    // Listen for changes in authentication state
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        // Access user credentials from User object
        user
          .getIdToken()
          .then((token) => {
            // Access user token
            $store.commit('invoice/setToken', token);
          })
          .catch((error) => {
            console.log('Error getting user token:', error);
          });
      } else {
        // User is signed out
        console.log('User is signed out');
      }
    });

    onMounted(async () => {
      $store.dispatch('invoice/fetchAuthHeader');
    });
  },
};
</script>
