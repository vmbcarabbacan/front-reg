import { GetterTree } from 'vuex';

import { RootState } from '@/store';

import { Declaration } from '@/core/types';

import { State } from './state';

export type Getters = {
  getDeclarations(state: State): Array<Declaration> | null;
}

export const getters: GetterTree<State, RootState> & Getters = {
  getDeclarations: (state) => state.declarations,
  getNotValidDeclaration : (state) => (insured_type_id: number) => {
    const declarations = state.declarations.filter(x => x.answer === true)
    if(insured_type_id === 1 && declarations.length > 0) return true
    if(insured_type_id !== 1 && declarations.length > 0 && declarations.filter(x => x.members.length > 0).length > 0) return true

    return false
  }
};
