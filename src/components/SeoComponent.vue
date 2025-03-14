<template>
  <div style="display:none">
    <!-- This component doesn't render anything visible but needs a root element -->
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'SeoComponent',
  setup() {
    const { t } = useI18n();

    onMounted(() => {
      // Add structured data for LocalBusiness
      const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'ShippingCompany',
        name: 'Embarque Tenares',
        description: t('home.seo.description'),
        url: window.location.origin,
        logo: `${window.location.origin}/logo.png`,
        sameAs: [
          // Add your social media profiles here
          // 'https://www.facebook.com/embarquetenares',
          // 'https://www.instagram.com/embarquetenares'
        ],
        address: [
          {
            '@type': 'PostalAddress',
            addressCountry: 'US',
            addressLocality: 'New York',
            name: t('nyo')
            // Add more address details as needed
          },
          {
            '@type': 'PostalAddress',
            addressCountry: 'DO',
            addressLocality: t('dr_province'),
            name: t('dro')
            // Add more address details as needed
          }
        ],
        areaServed: [
          {
            '@type': 'Country',
            name: 'Dominican Republic'
          },
          {
            '@type': 'Country',
            name: 'United States'
          }
        ],
        serviceArea: {
          '@type': 'GeoCircle',
          geoMidpoint: {
            '@type': 'GeoCoordinates',
            latitude: 40.7128,
            longitude: -74.0060
          },
          geoRadius: '300km',
          description: 'Serving New York City, Brooklyn, Queens, Bronx, Manhattan, Long Island, New Jersey, Connecticut, Yonkers, Mount Vernon, upstate New York, and North Carolina'
        },
        openingHoursSpecification: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday'
          ],
          opens: '08:00',
          closes: '18:00'
        },
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'customer service',
          availableLanguage: ['English', 'Spanish'],
          hoursAvailable: {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: [
              'Monday',
              'Tuesday',
              'Wednesday',
              'Thursday',
              'Friday',
              'Saturday'
            ],
            opens: '08:00',
            closes: '18:00'
          }
        },
        // Add services offered
        makesOffer: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: t('home.services.boxes.title'),
              description: t('home.services.boxes.description')
            }
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: t('home.services.barrels.title'),
              description: t('home.services.barrels.description')
            }
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: t('home.services.doorToDoor.title'),
              description: t('home.services.doorToDoor.description')
            }
          }
        ],
        // Add keywords for SEO
        keywords: [
          'shipping to Dominican Republic',
          'boxes to Dominican Republic',
          'barrels to Dominican Republic',
          'door-to-door shipping',
          'envios a Republica Dominicana',
          'cajas a Republica Dominicana',
          'envios de cajas',
          'door-to-door services',
          'cargo shipping',
          'shipping from New York to Dominican Republic',
          'shipping from Brooklyn to Dominican Republic',
          'shipping from Queens to Dominican Republic',
          'shipping from Bronx to Dominican Republic',
          'shipping from Manhattan to Dominican Republic',
          'shipping from Long Island to Dominican Republic',
          'shipping from New Jersey to Dominican Republic',
          'shipping from Connecticut to Dominican Republic',
          'shipping from Yonkers to Dominican Republic',
          'shipping from Mount Vernon to Dominican Republic',
          'shipping from upstate New York to Dominican Republic',
          'shipping from North Carolina to Dominican Republic'
        ].join(',')
      };

      // Add the structured data to the page
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(structuredData);
      document.head.appendChild(script);
    });

    return {};
  }
});
</script> 