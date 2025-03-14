<template>
  <q-page class="shipping-services-page">

    <!-- SEO Component -->
    <SeoComponent pageType="shipping" />

    <!-- Hero Section -->
    <section class="hero-section bg-primary text-white q-py-lg">
      <div class="container text-center q-px-md">
        <h1 class="text-h3 text-weight-bold q-mb-md">
          {{ t('shipping.hero.title') }}
        </h1> 

        <p class="text-h6 q-mb-md">
          {{ t('shipping.hero.subtitle') }}
        </p>
        <div class="row justify-center q-gutter-md">
          <q-btn
            color="secondary"
            :label="t('shipping.hero.cta')"
            size="lg"
            to="/rates"
            unelevated
          />
          <q-btn
            outline
            color="white"
            :label="t('shipping.hero.track')"
            size="lg"
            to="/track"
          />
        </div>
      </div>
    </section>

    <!-- Services Section -->
    <section class="q-py-md">
      <div class="container q-px-md">
        <h2 class="text-h4 text-center text-weight-bold q-mb-lg">
          {{ t('shipping.services.title') }}
        </h2>
        
        <div class="row q-col-gutter-lg q-mb-md">
          <div class="col-12 col-md-6" v-for="(service, index) in shippingServices" :key="index">
            <q-card class="service-card q-pa-lg">
              <div class="row items-center">
                <div class="col-auto">
                  <q-icon :name="service.icon" size="3rem" color="primary" />
                </div>
                <div class="col q-ml-md">
                  <h3 class="text-h5 text-weight-bold q-mb-sm">
                    {{ t(service.title) }}
                  </h3>
                  <p class="text-body1 q-mb-md">
                    {{ t(service.description) }}
                  </p>
                </div>
              </div>
            </q-card>
          </div>
        </div>
      </div>
    </section>

    <!-- Locations Section -->
    <section class="locations-section bg-grey-2 q-py-md">
      <div class="container q-px-md">
        <h2 class="text-h4 text-center text-weight-bold q-mb-md">
          {{ t('shipping.locations.title') }}
        </h2>
        <p class="text-body1 text-center q-mb-lg">
          {{ t('shipping.locations.description') }}
        </p>
        
        <div class="row q-col-gutter-lg">
          <div class="col-12 col-md-6" v-for="(area, index) in locationAreas" :key="index">
            <q-card class="location-area-card q-pa-lg">
              <h3 class="text-h5 text-weight-bold q-mb-md">
                {{ t(area.title) }}
              </h3>
              <p class="text-body1">
                {{ t(area.description) }}
              </p>
              <div class="row q-col-gutter-sm q-mt-md">
                <div class="col-6" v-for="(location, locIndex) in area.locations" :key="locIndex">
                  <div class="location-chip">
                    <q-icon name="place" size="xs" class="q-mr-xs" />
                    {{ location }}
                  </div>
                </div>
              </div>
            </q-card>
          </div>
        </div>
      </div>
    </section>

    <!-- Benefits Section -->
    <section class="benefits-section bg-grey-2 q-py-md">
      <div class="container q-px-md">
        <h2 class="text-h4 text-center text-weight-bold q-mb-lg">
          {{ t('shipping.benefits.title') }}
        </h2>
        
        <div class="row q-col-gutter-lg">
          <div class="col-12 col-md-4" v-for="(benefit, index) in benefits" :key="index">
            <div class="text-center">
              <q-icon :name="benefit.icon" size="3rem" color="primary" class="q-mb-md" />
              <h3 class="text-h5 text-weight-bold q-mb-md">
                {{ t(benefit.title) }}
              </h3>
              <p class="text-body1">
                {{ t(benefit.description) }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section bg-primary text-white q-py-lg">
      <div class="container text-center q-px-md">
        <h2 class="text-h4 text-weight-bold q-mb-md">
          {{ t('shipping.cta.title') }}
        </h2>
        <p class="text-h6 q-mb-lg">
          {{ t('shipping.cta.subtitle') }}
        </p>
        <q-btn
          color="secondary"
          :label="t('shipping.cta.button')"
          size="lg"
          to="/rates"
          unelevated
        />
      </div>
    </section>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';
import { useMeta } from 'quasar';
import SeoComponent from 'src/components/SeoComponent.vue';

export default defineComponent({
  name: 'ShippingServicesPage',
  components: {
    SeoComponent
  },
  setup() {
    const { t } = useI18n();

    // SEO metadata
    useMeta(() => {
      return {
        title: 'Shipping to Dominican Republic - Boxes, Barrels & Door-to-Door Service',
        meta: {
          description: { name: 'description', content: 'Specialized shipping services to Dominican Republic. We offer door-to-door delivery of boxes, barrels, and all kinds of cargo from the US to any location in the DR.' },
          keywords: { name: 'keywords', content: 'shipping to Dominican Republic, boxes to Dominican Republic, barrels to Dominican Republic, door-to-door shipping, envios a Republica Dominicana, cajas a Republica Dominicana, envios de cajas' }
        }
      }
    });

    const shippingServices = [
      {
        icon: 'inventory_2',
        title: 'shipping.services.boxes.title',
        description: 'shipping.services.boxes.description'
      },
      {
        icon: 'inventory',
        title: 'shipping.services.barrels.title',
        description: 'shipping.services.barrels.description'
      },
      {
        icon: 'local_shipping',
        title: 'shipping.services.doorToDoor.title',
        description: 'shipping.services.doorToDoor.description'
      }
    ];

    const locationAreas = [
      {
        title: 'shipping.locations.areas.0.title',
        description: 'shipping.locations.areas.0.description',
        locations: ['Manhattan', 'Brooklyn', 'Queens', 'Bronx', 'Staten Island']
      },
      {
        title: 'shipping.locations.areas.1.title',
        description: 'shipping.locations.areas.1.description',
        locations: ['New Jersey', 'Connecticut', 'Long Island']
      },
      {
        title: 'shipping.locations.areas.2.title',
        description: 'shipping.locations.areas.2.description',
        locations: ['Yonkers', 'Mount Vernon', 'Upstate New York']
      },
      {
        title: 'shipping.locations.areas.3.title',
        description: 'shipping.locations.areas.3.description',
        locations: ['North Carolina']
      }
    ];

    const benefits = [
      {
        icon: 'verified',
        title: 'shipping.benefits.reliable.title',
        description: 'shipping.benefits.reliable.description'
      },
      {
        icon: 'savings',
        title: 'shipping.benefits.affordable.title',
        description: 'shipping.benefits.affordable.description'
      },
      {
        icon: 'support_agent',
        title: 'shipping.benefits.support.title',
        description: 'shipping.benefits.support.description'
      }
    ];

    const faqs = [
      {
        question: 'shipping.faq.q1',
        answer: 'shipping.faq.a1'
      },
      {
        question: 'shipping.faq.q2',
        answer: 'shipping.faq.a2'
      },
      {
        question: 'shipping.faq.q3',
        answer: 'shipping.faq.a3'
      },
      {
        question: 'shipping.faq.q4',
        answer: 'shipping.faq.a4'
      },
      {
        question: 'shipping.faq.q5',
        answer: 'shipping.faq.a5'
      }
    ];

    return {
      t,
      shippingServices,
      locationAreas,
      benefits,
      faqs
    };
  }
});
</script>

<style lang="scss" scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
}

.hero-section {
  background: linear-gradient(rgba(var(--q-primary-rgb), 0.9), rgba(var(--q-primary-rgb), 0.7)), url('/shipping-hero.jpg') no-repeat center center;
  background-size: cover;
  padding: 3rem 0;
}

.service-card, 
.benefit-card {
  height: 100%;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  }
}

.benefits-section {
  background: url('/pattern.svg') repeat;
}

.cta-section {
  background: linear-gradient(rgba(var(--q-primary-rgb), 0.9), rgba(var(--q-primary-rgb), 0.7)), url('/cta-background.jpg') no-repeat center center;
  background-size: cover;
}

.locations-section {
  background: url('/pattern.svg') repeat;
}

.location-area-card {
  height: 100%;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  }
}

.location-chip {
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 0.75rem;
  margin-bottom: 0.5rem;
  border-radius: 16px;
  background-color: rgba($primary, 0.1);
  color: $primary;
  font-weight: 500;
  font-size: 0.9rem;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: rgba($primary, 0.2);
  }
}

.hero-logo {
  height: 120px;
  max-width: 80%;
  background-color: white;
  padding: 10px;
  border-radius: 8px;
  margin: 0 auto;
  display: block;
}

@media (min-width: 768px) {
  .hero-logo {
    height: 150px;
    max-width: 60%;
  }
}
</style> 