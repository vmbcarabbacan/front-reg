import { ActionTree, ActionContext } from 'vuex';

import { RootState } from '@/store';

import { State } from './state';
import { Mutations } from './mutations';
import { CountriesMutationTypes } from '@/core/enum/Countries/Mutations';
import { CountriesActionTypes } from '@/core/enum/Countries/Actions';
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
  [CountriesActionTypes.GET_COUNTRIES](
    { commit }: AugmentedActionContext
  );
  [CountriesActionTypes.GET_COUNTRY_CODE](
    { commit }: AugmentedActionContext
  );
}

export const actions: ActionTree<State, RootState> & Actions = {
  async [CountriesActionTypes.GET_COUNTRIES]({ commit }) {
    try {
      // if (isCalled.getCountrie) return;
      const payload = {
        lang: window.localStorage.getItem('language'),
        isDropdown: true 
      }
      const data = await axios.post(Links.GET_COUNTRIES, payload);
      commit(CountriesMutationTypes.SET_COUNTRIES, data.data.data.countries);
      isCalled.getCountries = true;
    }
    catch (err) {
      return err;
    }
  },

  async [CountriesActionTypes.GET_COUNTRY_CODE]({ commit }) {
    try {
      if (isCalled.getCountryCode) return;
      const payload = {
        lang: window.localStorage.getItem('language'),
        isDropdown: true
      }
      const data = await axios.post(Links.GET_COUNTRIES_CODE, payload);
      commit(CountriesMutationTypes.SET_COUNTRY_CODE, data.data.data.codes);
      isCalled.getCountryCode = true;
    }
    catch (err) {
      return err;
    }
  },
};
