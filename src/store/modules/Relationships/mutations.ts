import { MutationTree } from 'vuex';

import { Generics } from '@/core/types';

import { State } from './state';
import { RelationshipMutationTypes } from '@/core/enum/Relationships/Mutations';

export type Mutations<S = State> = {
  [RelationshipMutationTypes.SET_RELATIONSHIP_FAMILIES](state: S, payload: Array<Generics>): void;
  [RelationshipMutationTypes.SET_RELATIONSHIP_DOMESTICS](state: S, payload: Array<Generics>): void;
  [RelationshipMutationTypes.SET_RELATIONSHIP_PARENTS](state: S, payload: Array<Generics>): void;
}

export const mutations: MutationTree<State> & Mutations = {
  [RelationshipMutationTypes.SET_RELATIONSHIP_FAMILIES](state: State, families: Array<Generics>) {
    state.families = families;
  },
  [RelationshipMutationTypes.SET_RELATIONSHIP_DOMESTICS](state: State, domestics: Array<Generics>) {
    state.domestics = domestics;
  },
  [RelationshipMutationTypes.SET_RELATIONSHIP_PARENTS](state: State, parents: Array<Generics>) {
    state.parents = parents;
  },
};
