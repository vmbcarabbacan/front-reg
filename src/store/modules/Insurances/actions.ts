import { ActionTree, ActionContext } from 'vuex';

import { RootState } from '@/store';

import { State } from './state';
import { Mutations } from './mutations';
import { InsuranceMutationTypes } from '@/core/enum/Insurances/Mutations';
import { InsuranceActionTypes } from '@/core/enum/Insurances/Actions';
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
  [InsuranceActionTypes.GET_INSURED_TYPES](
    { commit }: AugmentedActionContext
  );
}

export const actions: ActionTree<State, RootState> & Actions = {
  async [InsuranceActionTypes.GET_INSURED_TYPES]({ commit }) {
    try {
      if (isCalled.getInsurances) return;
      const payload = {
        lang: window.localStorage.getItem('language'),
        isDropdown: true
      }
      const data = await axios.post(Links.GET_INSURED_TYPES, payload);
      commit(InsuranceMutationTypes.SET_INSURED_TYPES, data.data.data.health_insurance_types);
      isCalled.getInsurances = true;
    }
    catch (err) {
      return err;
    }
  },
};
