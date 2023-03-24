<template>
  <router-view />
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';
import { api } from 'boot/axios';
import db from './boot/firebase';
import { doc, getDoc } from 'firebase/firestore';

export default defineComponent({
  name: 'App',
  created() {
    this.retrieveHectorApiInfo();
  },
  data() {
    return {
      token: ref(''),
      user: ref(''),
    };
  },
  methods: {
    async retrieveHectorApiInfo() {
      const docRef = doc(db, 'auth', 'login');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        let d = docSnap.data();
        try {
          api.defaults.headers.common['App-Id'] = d['App-Id'];
          api.defaults.headers.common['Api-Key'] = d['Api-Key'];
          api.defaults.headers.common['Auth-Type'] = 'basic';

          this.login();
        } catch (e) {
          console.log('Failed to store app id and api key');
        }
      } else {
        // doc.data() will be undefined in this case
        console.log('Failed to retrieve app id and api key');
      }
    },
    async login() {
      const data = {
        Username: process.env.HECTOR_USERNAME,
        Type: process.env.HECTOR_TYPE,
      };
      api
        .post('/auth/login', data)
        .then((response) => {
          this.token = response.data.response[0].token.access;
          this.saveAuthData();
        })
        .catch(() => {
          console.log('Token retrieval failed');
        });
    },
    saveAuthData() {
      try {
        api.defaults.headers.common['Authorization'] = 'Bearer ' + this.token;
      } catch (e) {
        console.log('Token save failed');
      }
    },
  },
});
</script>
