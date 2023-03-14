import { MutationTree } from 'vuex';

import { State } from './state';
import { LanguageMutationTypes } from '@/core/enum/Language/Mutation';

export type Mutations<S = State> = {
  [LanguageMutationTypes.SET_LANG](state: S, payload: string);
}

export const mutations: MutationTree<State> & Mutations = {
  [LanguageMutationTypes.SET_LANG](state: State, lang: string) {
    state.lang = lang;
  },
};
