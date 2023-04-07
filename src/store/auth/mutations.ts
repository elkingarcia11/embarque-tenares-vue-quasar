import { MutationTree } from 'vuex';
import { AuthStateInterface } from './state';

const mutation: MutationTree<AuthStateInterface> = {
  setAuthData(state, payload: AuthStateInterface) {
    state.apiKey = payload.apiKey;
    state.appId = payload.appId;
    state.token = payload.token;
  },
};

export default mutation;
