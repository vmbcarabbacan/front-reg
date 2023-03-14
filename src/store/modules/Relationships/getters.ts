import { GetterTree } from 'vuex';

import { RootState } from '@/store';

import { Generics } from '@/core/types';

import { State } from './state';

export type Getters = {
  getFamilies(state: State): Array<Generics> | null;
}

export const getters: GetterTree<State, RootState> & Getters = {
  getFamilies: (state) => state.families,
  getRelationships: (state) => (id: number) => {
      switch(id) {
        case 2: return state.domestics
        case 3: return state.families
        case 5: return state.parents
        default: break;
      }
  }
};
