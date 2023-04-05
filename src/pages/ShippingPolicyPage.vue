<template>
  <div class="q-my-xl">
    <q-list bordered class="rounded-borders q-mx-lg q-pb-lg">
      <h4 class="q-px-lg text-center">
        {{ $t('disclaimer') }}
      </h4>
      <q-item v-for="policy in policies" :key="policy" class="q-px-sm">
        <q-item-section avatar>
          <q-avatar icon="chevron_right" text-color="primary" size="xxl" />
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-subtitle1">
            {{ $t(`policy${policy}`) }}
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>

    <div class="text-center text-subtitle1 q-mt-lg text-bold">
      Our company is backed by F.M.C. 01917n
    </div>
  </div>
  <FooterComponent />
</template>

<script lang="ts">
import FooterComponent from 'src/components/FooterComponent.vue';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
export default {
  name: 'shipping-policy',
  components: { FooterComponent },
  setup() {
    const { t } = useI18n();
    const policies = ref<string[]>();
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
    return { policies };
  },
};
</script>
