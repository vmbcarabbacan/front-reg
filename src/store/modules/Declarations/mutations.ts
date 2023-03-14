/* eslint-disable */
import { MutationTree } from 'vuex';

import { Declaration } from '@/core/types';

import { State } from './state';
import { DeclarationsMutationTypes } from '@/core/enum/Declarations/Mutations';

export type Mutations<S = State> = {
  [DeclarationsMutationTypes.SET_DECLARATIONS](state: S, payload: Array<Declaration>): void;
  [DeclarationsMutationTypes.SET_DECLARATION_LOADING](state: S, payload: boolean): void;
  [DeclarationsMutationTypes.SET_DECLARATION_RESULT](state: S, payload: any): void;
}

export const mutations: MutationTree<State> & Mutations = {
  [DeclarationsMutationTypes.SET_DECLARATIONS](state: State, declaration: Array<Declaration>) {
    state.declarations = declaration;
  },
  [DeclarationsMutationTypes.SET_DECLARATION_RESULT](state: State, result: any) {
    state.result = result;
  },
  [DeclarationsMutationTypes.SET_DECLARATION_LOADING](state: State, loading: boolean) {
    state.loading = loading;
  },
};
