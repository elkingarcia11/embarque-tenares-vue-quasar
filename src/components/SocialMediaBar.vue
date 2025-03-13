<template>
  <div class="social-media-bar">
    <!-- Phone -->
    <q-btn 
      flat 
      :round="isRound" 
      :square="!isRound" 
      class="q-mx-xs" 
      icon="phone" 
      :style="`color: #0c8043; font-size: ${fontSize};`"
    >
      <q-tooltip>{{ t('contact.phone') || 'Phone' }}</q-tooltip>
      <q-menu anchor="top middle" self="bottom middle">
        <q-item
          clickable
          @click="openUrl('tel:7185621300')"
          class="text-accent"
        >
          <q-avatar icon="phone" />
          <q-item-section>{{ t('nyb') }}</q-item-section>
        </q-item>
        <q-item
          clickable
          @click="openUrl('tel:8099700007')"
          class="text-secondary"
        >
          <q-avatar icon="phone" />
          <q-item-section>{{ t('drb') }}</q-item-section>
        </q-item>
      </q-menu>
    </q-btn>

    <!-- WhatsApp -->
    <q-btn
      flat
      :round="isRound" 
      :square="!isRound"
      class="q-mx-xs"
      @click="openUrl('https://api.whatsapp.com/send?phone=7185621300')"
      icon="ion-logo-whatsapp"
      :style="`color: #25d366; font-size: ${fontSize};`"
    >
      <q-tooltip>{{ t('contact.whatsapp') || 'WhatsApp' }}</q-tooltip>
    </q-btn>
                 
    <!-- Email -->
    <q-btn 
      flat 
      :round="isRound" 
      :square="!isRound" 
      class="q-mx-xs" 
      icon="mail" 
      :style="`color: #d93025; font-size: ${fontSize};`"
    >
      <q-tooltip>{{ t('contact.email') || 'Email' }}</q-tooltip>
      <q-menu anchor="top middle" self="bottom middle">
        <q-item
          clickable
          @click="openUrl('mailto:ny@embarquetenares.com')"
          class="text-accent"
        >
          <q-avatar icon="mail" />
          <q-item-section>{{ t('nyb') }}</q-item-section>
        </q-item>
        <q-item
          clickable
          @click="openUrl('mailto:rd@embarquetenares.com')"
          class="text-secondary"
        >
          <q-avatar icon="mail" />
          <q-item-section>{{ t('drb') }}</q-item-section>
        </q-item>
      </q-menu>
    </q-btn>

    <!-- Facebook -->
    <q-btn
      flat
      :round="isRound" 
      :square="!isRound"
      class="q-mx-xs"
      @click="openUrl('https://www.facebook.com/EmbarqueTenaress/')"
      icon="facebook"
      :style="`color: #1778f2; font-size: ${fontSize};`"
    >
      <q-tooltip>{{ t('contact.facebook') || 'Facebook' }}</q-tooltip>
    </q-btn>
    
    <!-- Instagram -->
    <q-btn
      flat
      :round="isRound" 
      :square="!isRound"
      class="q-mx-xs"
      @click="openUrl('https://instagram.com/embarquetenares')"
      icon="ion-logo-instagram"
      :style="`color: #e1306c; font-size: ${fontSize};`"
    >
      <q-tooltip>{{ t('contact.instagram') || 'Instagram' }}</q-tooltip>
    </q-btn>  
  </div>
</template>

<script lang="ts">
import { useI18n } from 'vue-i18n';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SocialMediaBar',
  props: {
    isRound: {
      type: Boolean,
      default: true
    },
    fontSize: {
      type: String,
      default: '1.5rem'
    }
  },
  setup() {
    const { t } = useI18n();

    // Function to open URLs
    const openUrl = (url: string) => {
      window.open(url, '_blank');
    };

    return {
      t,
      openUrl
    };
  }
});
</script>

<style lang="scss" scoped>
.social-media-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  
  .q-btn {
    margin: 0 8px;
    transition: transform 0.3s ease;
    border-radius: 50% !important; /* Force round shape for hover effects */
    
    &:hover {
      transform: translateY(-3px);
    }
    
    /* Ensure the inner button content respects the shape prop */
    &.q-btn--round .q-btn__content {
      border-radius: 50%;
    }
    
    &:not(.q-btn--round) .q-btn__content {
      border-radius: 0;
    }
  }
}
</style> 