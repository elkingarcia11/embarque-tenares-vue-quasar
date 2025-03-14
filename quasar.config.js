/* eslint-env node */

/*
 * This file runs in a Node context (it's NOT transpiled by Babel), so use only
 * the ES6 features that are supported by your Node version. https://node.green/
 */

// Configuration for your app
// https://v2.quasar.dev/quasar-cli-webpack/quasar-config-js

/* eslint-disable @typescript-eslint/no-var-requires */
const process = require('process');
const path = require('path');
const { configure } = require('quasar/wrappers');

module.exports = configure(function (ctx) {
  // Load environment variables from .env file
  require('dotenv').config();

  // Get raw environment variables
  const {
    QENV_FIREBASE_API_KEY,
    QENV_FIREBASE_AUTH_DOMAIN,
    QENV_FIREBASE_DATABASE_URL,
    QENV_FIREBASE_PROJECT_ID,
    QENV_FIREBASE_STORAGE_BUCKET,
    QENV_FIREBASE_MESSAGING_SENDER_ID,
    QENV_FIREBASE_APP_ID,
    QENV_FIREBASE_MEASUREMENT_ID,
    QENV_FIREBASE_USERNAME,
    QENV_FIREBASE_PASSWORD,
    GOOGLE_MAPS_API_KEY,
    HECTOR_BASE_URL,
    HECTOR_USERNAME,
    HECTOR_TYPE
  } = process.env;

  return {
    // https://v2.quasar.dev/quasar-cli-webpack/supporting-ts
    supportTS: {
      tsCheckerConfig: {
        eslint: {
          enabled: true,
          files: './src/**/*.{ts,tsx,js,jsx,vue}',
        },
      },
    },

    // https://v2.quasar.dev/quasar-cli-webpack/prefetch-feature
    // preFetch: true,

    // app boot file (/src/boot)
    // --> boot files are part of "main.js"
    // https://v2.quasar.dev/quasar-cli-webpack/boot-files
    boot: ['i18n', 'axios', 'firebase'],

    // https://v2.quasar.dev/quasar-cli-webpack/quasar-config-js#Property%3A-css
    css: ['app.scss'],

    // https://github.com/quasarframework/quasar/tree/dev/extras
    extras: [
      'ionicons-v4',
      'roboto-font',
      'material-icons',
    ],

    // Full list of options: https://v2.quasar.dev/quasar-cli-webpack/quasar-config-js#Property%3A-build
    build: {
      vueRouterMode: 'history',
      env: {
        FIREBASE_API_KEY: QENV_FIREBASE_API_KEY,
        FIREBASE_AUTH_DOMAIN: QENV_FIREBASE_AUTH_DOMAIN,
        FIREBASE_DATABASE_URL: QENV_FIREBASE_DATABASE_URL,
        FIREBASE_PROJECT_ID: QENV_FIREBASE_PROJECT_ID,
        FIREBASE_STORAGE_BUCKET: QENV_FIREBASE_STORAGE_BUCKET,
        FIREBASE_MESSAGING_SENDER_ID: QENV_FIREBASE_MESSAGING_SENDER_ID,
        FIREBASE_APP_ID: QENV_FIREBASE_APP_ID,
        FIREBASE_MEASUREMENT_ID: QENV_FIREBASE_MEASUREMENT_ID,
        FIREBASE_USERNAME: QENV_FIREBASE_USERNAME,
        FIREBASE_PASSWORD: QENV_FIREBASE_PASSWORD,
        GOOGLE_MAPS_API_KEY: GOOGLE_MAPS_API_KEY,
        HECTOR_BASE_URL: HECTOR_BASE_URL,
        HECTOR_USERNAME: HECTOR_USERNAME,
        HECTOR_TYPE: HECTOR_TYPE,
      },
      chainWebpack: (chain) => {
        chain.module
          .rule('i18n-resource')
          .test(/\.(json5?|ya?ml)$/)
          .include.add(path.resolve(__dirname, './src/i18n'))
          .end()
          .type('javascript/auto')
          .use('i18n-resource')
          .loader('@intlify/vue-i18n-loader');
        chain.module
          .rule('i18n')
          .resourceQuery(/blockType=i18n/)
          .type('javascript/auto')
          .use('i18n')
          .loader('@intlify/vue-i18n-loader');
      },
      // Add robots.txt and sitemap.xml generation
      generateRobotsTxt: true,
      generateSitemap: true,
      sitemapOptions: {
        hostname: 'https://embarquetenares.com',
        gzip: true,
        exclude: ['/admin/**'],
        routes: [
          '/',
          '/track',
          '/rates',
          '/ny-branch',
          '/dr-branch',
          '/faqs',
          '/shipping-policy'
        ]
      }
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli-webpack/quasar-config-js#Property%3A-devServer
    devServer: {
      server: {
        type: 'http',
      },
      port: 9000,
      open: true, // opens browser window automatically
    },

    // https://v2.quasar.dev/quasar-cli-webpack/quasar-config-js#Property%3A-framework
    framework: {
      config: {
        notify: {
          /* look at QuasarConfOptions from the API card */
        },
        loading: {
          /* look at QuasarConfOptions from the API card */
        },
      },

      // iconSet: 'material-icons', // Quasar icon set
      // lang: 'en-US', // Quasar language pack

      // For special cases outside of where the auto-import strategy can have an impact
      // (like functional components as one of the examples),
      // you can manually specify Quasar components/directives to be available everywhere:
      //
      // components: [],
      // directives: [],

      // Quasar plugins
      plugins: ['LocalStorage', 'SessionStorage', 'Loading', 'Notify'],
    },

    // animations: 'all', // --- includes all animations
    // https://quasar.dev/options/animations
    animations: [],

    // https://v2.quasar.dev/quasar-cli-webpack/developing-ssr/configuring-ssr
    ssr: {
      pwa: true, // Enable PWA in SSR mode

      // manualStoreHydration: true,
      // manualPostHydrationTrigger: true,

      prodPort: 80, // The default port that the production server should use
      // (gets superseded if process.env.PORT is specified at runtime)

      maxAge: 1000 * 60 * 60 * 24 * 30,
      // Tell browser when a file from the server should expire from cache (in ms)

      // chainWebpackWebserver (/* chain */) {},

      middlewares: [
        ctx.prod ? 'compression' : '',
        'render', // keep this as last one
      ],
    },

    // https://v2.quasar.dev/quasar-cli-webpack/developing-pwa/configuring-pwa
    pwa: {
      workboxPluginMode: 'GenerateSW', // 'GenerateSW' or 'InjectManifest'
      workboxOptions: {},

      manifest: {
        name: 'Embarque Tenares',
        short_name: 'Embarque Tenares',
        description: 'Una aplicación para rastrear tus paquetes, ver tarifas y más',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#027be3',
        start_url: '/',
        scope: '/',
        icons: [
          {
            src: 'icons/icon-128x128.png',
            sizes: '128x128',
            type: 'image/png',
          },
          {
            src: 'icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'icons/icon-256x256.png',
            sizes: '256x256',
            type: 'image/png',
          },
          {
            src: 'icons/icon-384x384.png',
            sizes: '384x384',
            type: 'image/png',
          },
          {
            src: 'icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    },

    // Add meta tags configuration
    meta: {
      title: 'Embarque Tenares - International Shipping Services to Dominican Republic',
      description: 'Professional shipping services from New York to Dominican Republic. Door-to-door delivery, customs clearance, and affordable rates. Serving the Dominican community in NYC, Bronx, Brooklyn, Queens, and more.',
      keywords: 'shipping, international shipping, overseas shipping, global shipping, freight, cargo, logistics, transporte, customs clearance, parcel shipping, package delivery, Dominican Republic shipping, envíos a República Dominicana, shipping from New York, NYC shipping, Bronx shipping, Brooklyn shipping, Queens shipping, Staten Island shipping, Long Island shipping, Westchester shipping, Connecticut shipping, North Carolina shipping, New Jersey shipping, Eastchester shipping',
      ogTitle: 'Embarque Tenares - International Shipping Services to Dominican Republic',
      ogDescription: 'Professional shipping services from New York to Dominican Republic. Door-to-door delivery, customs clearance, and affordable rates.',
      ogImage: 'icons/icon-512x512.png',
      ogUrl: 'https://embarquetenares.com',
      twitterCard: 'summary_large_image',
      twitterTitle: 'Embarque Tenares - International Shipping Services to Dominican Republic',
      twitterDescription: 'Professional shipping services from New York to Dominican Republic. Door-to-door delivery, customs clearance, and affordable rates.',
      twitterImage: 'icons/icon-512x512.png',
      robots: 'index, follow',
      canonical: 'https://embarquetenares.com',
      lang: ['en-US', 'es-US'],
      author: 'Embarque Tenares',
      version: new Date().toISOString(),
      geo: {
        region: 'US-NY',
        position: '40.854549806144156,-73.89396628342254',
        placename: 'Bronx, New York',
        ICBM: '40.854549806144156, -73.89396628342254'
      }
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli-webpack/developing-cordova-apps/configuring-cordova
    cordova: {
      // noIosLegacyBuildFlag: true, // uncomment only if you know what you are doing
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli-webpack/developing-capacitor-apps/configuring-capacitor
    capacitor: {
      hideSplashscreen: true,
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli-webpack/developing-electron-apps/configuring-electron
    electron: {
      bundler: 'packager', // 'packager' or 'builder'

      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options
        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',
        // Windows only
        // win32metadata: { ... }
      },

      builder: {
        // https://www.electron.build/configuration/configuration

        appId: 'embarquetenaresvuequasar',
      },

      // "chain" is a webpack-chain object https://github.com/neutrinojs/webpack-chain
      chainWebpackMain(/* chain */) {
        // do something with the Electron main process Webpack cfg
        // extendWebpackMain also available besides this chainWebpackMain
      },

      // "chain" is a webpack-chain object https://github.com/neutrinojs/webpack-chain
      chainWebpackPreload(/* chain */) {
        // do something with the Electron main process Webpack cfg
        // extendWebpackPreload also available besides this chainWebpackPreload
      },
    },
  };
});
