<template>
  <!-- Logo and Title Button -->
  <q-btn @click="$router.push('/')" flat class="q-py-md q-ml-none">
    <q-avatar>
      <img src="/logo.png" alt="Logo" />
    </q-avatar>
    <div class="logo-text q-pl-md">Embarque Tenares</div>
  </q-btn>

  <!-- Navigation Buttons -->
  <div class="row flex-center q-pl-lg">
    <q-btn
      v-for="route in routes"
      :key="route.name"
      class="q-py-md"
      @click="navigate(route.name)"
      flat
      text-color="white"
      :label="$t(route.label)"
      size="lg"
      :class="routeButtonClass"
    />
  </div>
</template>

<script>
export default {
  methods: {
    /**
     * Navigate to the specified route.
     * @param {string} routeName - The name of the route to navigate to.
     */
    navigate(routeName) {
      this.$router.push({ name: routeName });
    },
  },
  data() {
    return {
      /**
       * List of route information objects.
       * Each object contains the name of the route and its label for display.
       * @type {Array}
       */
      routes: [
        { name: 'track', label: 'track' },
        { name: 'rates', label: 'rates' },
        { name: 'nyb', label: 'nyb' },
        { name: 'drb', label: 'drb' },
        { name: 'faqs', label: 'faqs' },
      ],
    };
  },
  computed: {
    /**
     * Computed class for styling route buttons.
     * @type {string}
     */
    routeButtonClass() {
      return 'font-family-bolder';
    },
  },
};
</script>

<style scoped>
/* Styles for the logo and title */
.logo-text {
  font-family: 'BodoniSvtyTwoSCITCTT-Book';
  font-size: xx-large;
  font-weight: bold;
}

/* Styles for route buttons */
.font-family-bolder {
  font-family: 'BodoniSvtyTwoSCITCTT-Book';
  font-weight: bolder;
}

/* Style for the logo image */
img {
  background-color: white;
}
</style>
