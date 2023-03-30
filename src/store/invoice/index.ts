import { Module } from 'vuex';
import { StateInterface } from '../index';
import state, { InvoiceStateInterface } from './state';
import actions from './actions';
import mutations from './mutations';

const invoiceModule: Module<InvoiceStateInterface, StateInterface> = {
  namespaced: true,
  actions,
  mutations,
  state,
};

export default invoiceModule;
