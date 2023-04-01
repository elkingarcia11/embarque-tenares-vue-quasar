import { MutationTree } from 'vuex';
import { InvoiceResponse, InvoiceStateInterface } from './state';

const mutation: MutationTree<InvoiceStateInterface> = {
  setEtaDay(state, payload: number) {
    state.etaDays = payload;
  },
  setInvoiceResponse(state, payload: InvoiceResponse) {
    state.enDate = payload.enDate;
    state.esDate = payload.esDate;
    state.percent = payload.percent;
    state.querySuccess = payload.querySuccess;
  },
  setToken(state, payload: string) {
    state.token = payload;
  },
};

export default mutation;
