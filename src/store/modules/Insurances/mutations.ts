import { MutationTree } from 'vuex';

import { Generics } from '@/core/types';

import { State } from './state';
import { InsuranceMutationTypes } from '@/core/enum/Insurances/Mutations';

export type Mutations<S = State> = {
  [InsuranceMutationTypes.SET_INSURED_TYPES](state: S, payload: Array<Generics>): void;
}

export const mutations: MutationTree<State> & Mutations = {
  [InsuranceMutationTypes.SET_INSURED_TYPES](state: State, insuredTypes: Array<Generics>) {
    state.insuredTypes = insuredTypes;
  },
};
