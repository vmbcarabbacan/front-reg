import { GetterTree } from 'vuex';

import { RootState } from '@/store';

import { Generics } from '@/core/types';

import { State } from './state';

export type Getters = {
  getInsuredType(state: State): Array<Generics> | null;
}

export const getters: GetterTree<State, RootState> & Getters = {
  getInsuredType: (state) => state.insuredTypes,
};
