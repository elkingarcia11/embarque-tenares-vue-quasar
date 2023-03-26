import { DocumentData } from 'firebase/firestore';
import { MutationTree } from 'vuex';
import { FaqsStateInterface } from './state';

const mutation: MutationTree<FaqsStateInterface> = {
  setFaqsList(state, payload: DocumentData[]) {
    state.faqsList = payload;
  },
};

export default mutation;
