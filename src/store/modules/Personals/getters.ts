import { GetterTree } from 'vuex';


import { RootState } from '@/store';

import { Health } from '@/core/types';

import { State } from './state';

export type Getters = {
  getCustomer(state: State): Health;
  getNotValidCustomer(state: State): boolean;
}

export const getters: GetterTree<State, RootState> & Getters = {
  getCustomer: (state) => state.customer,
  getNotValidCustomer: (state) => {
    const { insured_type_id, age, members } = state.customer
    if(insured_type_id === 4) return true
    if(insured_type_id === 1 && age > 65) return true
    if([2, 3, 5].includes(insured_type_id)) {
        if(members.find(x => x.age > 65)) return true
        if(insured_type_id === 3 && getCountRelationships(state.customer, 2) > 0 && getCountRelationships(state.customer, 1) === 0) return true
    }

    return false;
  },
  getHasEditable: (state) => {
    const noEditable = state.customer.members.find(x => x.is_editable)
    if(noEditable) return true

    return false
  },
  getNotValidAge: (state) => {
    const ages:Array<number> = []
    /** Insurance Type */
    const myself = 1;
    // const domestics = 2;
    const family = 3;
    const parent = 5;

    /** Emirates */
    const dubai = 3;

    const { members, age, insured_type_id, insured_city } = state.customer

    if(members.length > 0) {
      /* eslint-disable */
      const member_ages:any = members.map(x => x.age)
      ages.push(member_ages)
    }
    ages.unshift(age)
    if([myself, family].includes(insured_type_id) && insured_city === dubai) return ages.flat().some(greaterThanOrEqualToSixtyFive)
    if([myself, family].includes(insured_type_id) && insured_city !== dubai) return ages.flat().every(greaterThanOrEqualToSixty)
    if([parent].includes(insured_type_id) && insured_city === dubai) return ages.flat().every(greaterThanOrEqualToNinety)
    
    return false
  }
};

const getCountRelationships = (customer, value) => {
  return customer.members.filter(x => x.relationship === value).length
} 

const greaterThanOrEqualToSixtyFive = (value: number) => {
  return value >= 65
}

const greaterThanOrEqualToSixty = (value) => {
  return value >= 60
}

const greaterThanOrEqualToNinety = (value) => {
  return value >= 90
}
