import { Countries, Country_code } from '@/core/types';


export type State = {
  countries: Array<Countries>;
  countryCode: Array<Country_code>;
}

export const state: State = {
  countries: [] as Array<Countries>,
  countryCode: [] as Array<Country_code>,
};