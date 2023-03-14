import { GetterTree } from 'vuex';

import { RootState } from '@/store';

import { Countries, Country_code } from '@/core/types';

import { State } from './state';

export type Getters = {
  getCountries(state: State): Array<Countries> | null;
  getCountryCode(state: State): Array<Country_code> | null;
}

export const getters: GetterTree<State, RootState> & Getters = {
  getCountries: (state) => state.countries,
  getCountryCode: (state) => state.countryCode,
};
