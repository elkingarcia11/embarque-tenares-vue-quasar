import { Module } from 'vuex';
import { StateInterface } from '../index';
import state, { FaqsStateInterface } from './state';
import actions from './actions';
import mutations from './mutations';

const faqsModule: Module<FaqsStateInterface, StateInterface> = {
  namespaced: true,
  actions,
  mutations,
  state,
};

export default faqsModule;
