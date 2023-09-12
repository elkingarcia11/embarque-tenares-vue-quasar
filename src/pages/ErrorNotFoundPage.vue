<template>
  <!-- Fullscreen error page with background color and text -->
  <div
    class="fullscreen bg-primary text-white text-center q-pa-md flex flex-center"
  >
    <div>
      <!-- Display a large "404" text in the center -->
      <div style="font-size: 30vh">404</div>

      <!-- Display a message indicating nothing is found -->
      <div class="text-h2" style="opacity: 0.4">Oops. Nothing here...</div>

      <!-- Button to go back to the home page -->
      <q-btn
        class="q-mt-xl"
        color="white"
        text-color="primary"
        unelevated
        to="/"
        label="Go Home"
        no-caps
      />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'ErrorNotFound',
};
</script>
