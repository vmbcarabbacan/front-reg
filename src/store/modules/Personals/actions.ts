import { ActionTree, ActionContext } from 'vuex';

import { RootState } from '@/store';

import { State } from './state';
import { Mutations } from './mutations';
import { PersonalMutationTypes } from '@/core/enum/Personals/Mutations';
import { PersonalActionTypes } from '@/core/enum/Personals/Actions';
import { Links } from '@/core/enum/Links';
import axios from 'axios';
import { Health, Information } from '@/core/types';
import router from '@/router';

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1],
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, RootState>, 'commit'>

export interface Actions {
  [PersonalActionTypes.POST_PERSONAL_DETAILS](
    { commit }: AugmentedActionContext,
    payload: Health
  ): void;
}

export const actions: ActionTree<State, RootState> & Actions = {
  async [PersonalActionTypes.POST_PERSONAL_DETAILS]({ commit }, payload) {
    commit(PersonalMutationTypes.SET_CUSTOMER_LOADING, true);
    try {

      const data = await axios.post(Links.POST_PERSONAL_DETAILS, payload);
      const personal_details = data.data.data.data;
      commit(PersonalMutationTypes.SET_CUSTOMER_RESULT, personal_details);
      commit(PersonalMutationTypes.SET_CUSTOMER_LOADING, false);
      const members = personal_details.lead_information.map((x: Information) => {
        return {
          value: x.id,
          label: x.member_name
        }
      })
      commit(PersonalMutationTypes.SET_CUSTOMER_MEMBERS, members);
      const ages = payload.members.map((x) => {
          return x.age;
      })
      ages.unshift(payload.age);
      window.localStorage.setItem('personal_details', JSON.stringify(personal_details));
      commit(PersonalMutationTypes.SET_CUSTOMER_AGES, ages.filter(x => x !== 0));
      window.localStorage.setItem('personal_detail_submitted', JSON.stringify(payload));
      const route = router.resolve({ name: 'HealthDeclaration' });
      window.location.href = route.href;
    }
    catch (err) {
      return err;
    }
  },

};
