import { MutationTree } from 'vuex';

import { Health, Result, Generics } from '@/core/types';

import { State } from './state';
import { PersonalMutationTypes } from '@/core/enum/Personals/Mutations';

export type Mutations<S = State> = {
  [PersonalMutationTypes.SET_CUSTOMER](state: S, payload: Health): void;
  [PersonalMutationTypes.SET_CUSTOMER_AGES](state: S, payload: Array<number>): void;
  [PersonalMutationTypes.SET_CUSTOMER_MEMBERS](state: S, payload: Array<Generics>): void;
  [PersonalMutationTypes.SET_CUSTOMER_RESULT](state: S, payload: Result): void;
  [PersonalMutationTypes.SET_CUSTOMER_LOADING](state: S, payload: boolean): void;
}

export const mutations: MutationTree<State> & Mutations = {
  [PersonalMutationTypes.SET_CUSTOMER](state: State, customer: Health) {
    state.customer = customer;
  },
  [PersonalMutationTypes.SET_CUSTOMER_AGES](state: State, ages: Array<number>) {
    state.ages = ages;
  },
  [PersonalMutationTypes.SET_CUSTOMER_MEMBERS](state: State, members: Array<Generics>) {
    state.members = members;
  },
  [PersonalMutationTypes.SET_CUSTOMER_RESULT](state: State, result: Result) {
    state.result = result;
  },
  [PersonalMutationTypes.SET_CUSTOMER_LOADING](state: State, loading: boolean) {
    state.loading = loading;
  },
};
