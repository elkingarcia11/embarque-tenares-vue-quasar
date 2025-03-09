import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { collection, getDocs } from '@firebase/firestore';
import { FaqsStateInterface } from './state';
import { db } from 'src/boot/firebase';

const actions: ActionTree<FaqsStateInterface, StateInterface> = {
  async fetchFaqs({ commit }) {
    const faqsCol = collection(db, 'faqs');
    const faqsSnapshot = await getDocs(faqsCol);
    commit(
      'setFaqsList',
      faqsSnapshot.docs.map((doc) => doc.data())
    );
  },
};

export default actions;
