import { Module } from 'vuex';
import { StateInterface } from '../index';
import state, { RatesStateInterface } from './state';
import actions from './actions';
import mutations from './mutations';

const ratesModule: Module<RatesStateInterface, StateInterface> = {
  namespaced: true,
  actions,
  mutations,
  state,
};

export default ratesModule;
