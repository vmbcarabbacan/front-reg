import { ActionTree, ActionContext } from 'vuex';

import { RootState } from '@/store';

import { State } from './state';
import { Mutations } from './mutations';
import { DeclarationsMutationTypes } from '@/core/enum/Declarations/Mutations';
import { DeclarationsActionTypes } from '@/core/enum/Declarations/Actions';
import { Links } from '@/core/enum/Links';
import { healthDeclarations } from '@/core/types';
import axios from 'axios';

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1],
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, RootState>, 'commit'>

export interface Actions {
  [DeclarationsActionTypes.GET_DECLARATIONS](
    { commit }: AugmentedActionContext
  );
  [DeclarationsActionTypes.POST_DECLARATION](
    { commit }: AugmentedActionContext,
    payload: healthDeclarations
  );
}

export const actions: ActionTree<State, RootState> & Actions = {
  async [DeclarationsActionTypes.GET_DECLARATIONS]({ commit }) {
    try {
      const payload = {
        lang: window.localStorage.getItem('language'),
        isDropdown: true
      }
      const data = await axios.post(Links.GET_DECLARATIONS, payload);
      const declarations = data.data.data.declaration;
      const val = declarations.map(x => {
        return {
          answer: x.answer === 'NO' ? false : true,
          id: x.id,
          question: x.question,
          members: []
        }
      })
      commit(DeclarationsMutationTypes.SET_DECLARATIONS, val);
    }
    catch (err) {
      return err;
    }
  },

  async [DeclarationsActionTypes.POST_DECLARATION]({ commit }, payload) {
    try {
      const data = await axios.post(Links.POST_HEALTH_DECLARATIONS, payload);
      const result = data.data;
      commit(DeclarationsMutationTypes.SET_DECLARATION_RESULT, result);
      window.localStorage.setItem('health_declaration_submitted', JSON.stringify(payload));
      return result;
    } catch (err) {
      return err;
    }
  } 
};
