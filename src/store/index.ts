import { store } from 'quasar/wrappers';
import { InjectionKey } from 'vue';
import { Router } from 'vue-router';
import {
  createStore,
  Store as VuexStore,
  useStore as vuexUseStore,
} from 'vuex';
import faqs from './faqs';
import rates from './rates';
import invoice from './invoice';
import auth from './auth';
import { FaqsStateInterface } from './faqs/state';
import { InvoiceStateInterface } from './invoice/state';
import { RatesStateInterface } from './rates/state';
import { AuthStateInterface } from './auth/state';

import process from 'process';
// import example from './module-example'
// import { ExampleStateInterface } from './module-example/state';

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export interface StateInterface {
  rates: RatesStateInterface;
  faqs: FaqsStateInterface;
  invoice: InvoiceStateInterface;
  auth: AuthStateInterface;
}

// provide typings for `this.$store`
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: VuexStore<StateInterface>;
  }
}

// provide typings for `useStore` helper
export const storeKey: InjectionKey<VuexStore<StateInterface>> =
  Symbol('vuex-key');

// Provide typings for `this.$router` inside Vuex store
declare module 'vuex' {
  export interface Store<S> {
    readonly $router: Router;
  }
}
export default store(function (/* { ssrContext } */) {
  const Store = createStore<StateInterface>({
    modules: { rates, faqs, invoice, auth },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: !!process.env.DEBUGGING,
  });

  return Store;
});

export function useStore() {
  return vuexUseStore(storeKey);
}
