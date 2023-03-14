import { ActionTree, ActionContext } from 'vuex';

import { RootState } from '@/store';

import { State } from './state';
import { Mutations } from './mutations';
import { RelationshipMutationTypes } from '@/core/enum/Relationships/Mutations';
import { RelationshipActionTypes } from '@/core/enum/Relationships/Actions';
import { Links } from '@/core/enum/Links';
import axios from 'axios';
import { isCalled } from '@/store/stateless';

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1],
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, RootState>, 'commit'>

export interface Actions {
  [RelationshipActionTypes.GET_RELATIONSHIPS](
    { commit }: AugmentedActionContext
  ): void;
}

export const actions: ActionTree<State, RootState> & Actions = {
  async [RelationshipActionTypes.GET_RELATIONSHIPS]({ commit }) {
    try {
      // if (isCalled.getInsurances) return;
      const payload = {
        lang: window.localStorage.getItem('language'),
        isDropdown: true
      }
      const data = await axios.post(Links.GET_RELATIONSHIPS, payload);
      commit(RelationshipMutationTypes.SET_RELATIONSHIP_FAMILIES, data.data.data.relationships);
      commit(RelationshipMutationTypes.SET_RELATIONSHIP_DOMESTICS, data.data.data.domesticRelationships);
      commit(RelationshipMutationTypes.SET_RELATIONSHIP_PARENTS, data.data.data.parentsRelationship);
      isCalled.getInsurances = true;
    }
    catch (err) {
      return err;
    }
  },
};
