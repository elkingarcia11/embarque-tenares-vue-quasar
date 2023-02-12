<template>
  <router-view />
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';
import { api } from 'boot/axios';

export default defineComponent({
  name: 'App',
  created() {
    this.login();
  },
  data() {
    return {
      token: ref(''),
      user: ref(''),
    };
  },
  methods: {
    login() {
      console.log('logging in...');
      const data = {
        Username: process.env.HECTOR_USERNAME,
        Type: process.env.HECTOR_TYPE,
      };

      api
        .post('/auth/login', data)
        .then((response) => {
          this.token = response.data.response[0].token.access;
          console.log('token retrieved...');
          this.saveAuthData();
        })
        .catch(() => {
          console.log('Token retrieval failed');
        });
    },
    saveAuthData() {
      try {
        api.defaults.headers.common['Authorization'] = 'Bearer ' + this.token;
        console.log('Tokens set');
      } catch (e) {
        console.log('Token save failed');
      }
    },
  },
});
</script>
