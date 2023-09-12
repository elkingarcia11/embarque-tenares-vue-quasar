<template>
  <!-- This section contains a list of shipping policies with an associated disclaimer -->
  <div class="q-my-xl">
    <q-list bordered class="rounded-borders q-mx-lg q-pb-lg">
      <!-- Display the disclaimer heading -->
      <h4 class="q-px-lg text-center">
        {{ $t('disclaimer') }}
      </h4>

      <!-- Loop through policies and display each policy as a list item -->
      <q-item v-for="policy in policies" :key="policy" class="q-px-sm">
        <q-item-section avatar>
          <!-- Display a chevron-right icon in an avatar for each policy -->
          <q-avatar icon="chevron_right" text-color="primary" size="xxl" />
        </q-item-section>

        <q-item-section>
          <!-- Display the policy content based on its localized key -->
          <q-item-label class="text-subtitle1">
            {{ $t(`policy${policy}`) }}
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>

    <!-- Display additional information about the company's backing -->
    <div class="text-center text-subtitle1 q-mt-lg text-bold">
      Our company is backed by F.M.C. 01917n
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
export default {
  name: 'shipping-policy',
  setup() {
    // Create a reactive reference to hold the list of policy numbers
    const policies = ref<string[]>();

    // Initialize the policies with numbers from 1 to 15
    policies.value = [
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '10',
      '11',
      '12',
      '13',
      '14',
      '15',
    ];

    // Return the policies reference to be used in the template
    return { policies };
  },
};
</script>
