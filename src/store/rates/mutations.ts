import { DocumentData } from 'firebase/firestore';
import { MutationTree } from 'vuex';
import { RatesStateInterface } from './state';

const mutation: MutationTree<RatesStateInterface> = {
  setRatesList(state, payload: DocumentData[]) {
    state.ratesList = payload;
  },
  addToLoL(state, payload: DocumentData[]) {
    state.listOfLists.push(payload);
  },
};

export default mutation;
