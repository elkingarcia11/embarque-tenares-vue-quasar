<template>
  <router-view />
</template>

<script lang="ts">
import { ref, onBeforeMount } from 'vue';
import { api } from 'boot/axios';
import { doc, getDoc } from 'firebase/firestore';

import db from './boot/firebase';

export default {
  name: 'App',
  setup() {
    const token = ref('');

    onBeforeMount(async () => {
      await retrieveHectorApiInfo();
    });

    const saveAuthData = () => {
      try {
        api.defaults.headers.common['Authorization'] = 'Bearer ' + token.value;
      } catch (e) {
        console.log('Token save failed');
      }
    };

    const login = async () => {
      const data = {
        Username: process.env.HECTOR_USERNAME,
        Type: process.env.HECTOR_TYPE,
      };
      await api
        .post('/auth/login', data)
        .then((response) => {
          token.value = response.data.response[0].token.access;
          saveAuthData();
        })
        .catch(() => {
          console.log('Token retrieval failed');
        });
    };

    const retrieveHectorApiInfo = async () => {
      const docRef = doc(db, 'auth', 'login');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        let d = docSnap.data();
        try {
          api.defaults.headers.common['App-Id'] = d['App-Id'];
          api.defaults.headers.common['Api-Key'] = d['Api-Key'];
          api.defaults.headers.common['Auth-Type'] = 'basic';

          await login();
        } catch (e) {
          console.log('Failed to store app id and api key');
        }
      } else {
        console.log('Failed to retrieve app id and api key');
      }
    };
  },
};
</script>
