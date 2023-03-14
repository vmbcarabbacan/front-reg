import { MutationTree } from 'vuex';

import { Countries, Country_code } from '@/core/types';

import { State } from './state';
import { CountriesMutationTypes } from '@/core/enum/Countries/Mutations';

export type Mutations<S = State> = {
  [CountriesMutationTypes.SET_COUNTRIES](state: S, payload: Array<Countries>): void;
  [CountriesMutationTypes.SET_COUNTRY_CODE](state: S, payload: Array<Country_code>): void;
}

export const mutations: MutationTree<State> & Mutations = {
  [CountriesMutationTypes.SET_COUNTRIES](state: State, countries: Array<Countries>) {
    state.countries = countries;
  },
  [CountriesMutationTypes.SET_COUNTRY_CODE](state: State, country_code: Array<Country_code>) {
    state.countryCode = country_code;
  },
};
