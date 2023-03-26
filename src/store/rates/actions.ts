import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { collection, getDocs } from 'firebase/firestore';
import { RatesStateInterface } from './state';
import db from 'src/boot/firebase';

const actions: ActionTree<RatesStateInterface, StateInterface> = {
  async fetchRates({ commit }) {
    const ratesRef = collection(db, 'rates');
    const ratesSnapshot = await getDocs(ratesRef);
    commit(
      'setRatesList',
      ratesSnapshot.docs.map((doc) => doc.data())
    );

    let itemsRef = collection(db, 'rates/0/items');
    let itemsSnapshot = await getDocs(itemsRef);
    let iL = itemsSnapshot.docs.map((doc) => doc.data());
    commit('addToLoL', iL);

    itemsRef = collection(db, 'rates/1/items');
    itemsSnapshot = await getDocs(itemsRef);
    iL = itemsSnapshot.docs.map((doc) => doc.data());
    commit('addToLoL', iL);

    itemsRef = collection(db, 'rates/2/items');
    itemsSnapshot = await getDocs(itemsRef);
    iL = itemsSnapshot.docs.map((doc) => doc.data());
    commit('addToLoL', iL);

    itemsRef = collection(db, 'rates/3/items');
    itemsSnapshot = await getDocs(itemsRef);
    iL = itemsSnapshot.docs.map((doc) => doc.data());
    commit('addToLoL', iL);
  },
};

export default actions;
