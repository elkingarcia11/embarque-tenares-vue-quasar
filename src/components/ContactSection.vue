<template>
  <div class="row justify-center q-mt-xl">
    <div class="col-12 col-md-10 text-center">
      <q-card flat bordered class="contact-card q-pa-lg">
        <h2 class="text-h5 text-weight-bold q-mb-md">{{ t('faqs.stillHaveQuestions') }}</h2>
        <p class="text-body1 q-mb-lg">{{ t('faqs.contactUs') }}</p>
        
        <!-- Social Media Bar -->
        <div>
          <SocialMediaBar />
        </div>
      </q-card>
    </div>
  </div>
</template>

<script lang="ts">
import { useI18n } from 'vue-i18n';
import SocialMediaBar from './SocialMediaBar.vue';

export default {
  name: 'ContactSection',
  components: {
    SocialMediaBar
  },
  setup() {
    const { t } = useI18n();

    return {
      t
    };
  }
};
</script>

<style lang="scss" scoped>
.contact-card {
  border-radius: 8px;
  background-color: #f8f9fa;
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  }
}
</style> 