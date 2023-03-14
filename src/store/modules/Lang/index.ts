import {
    Store as VuexStore,
    CommitOptions,
    Module,
  } from 'vuex';
  
  // TODO: How to surpass cyclical dependency linting errors cleanly?
  import { RootState } from '@/store';
  
  import { state } from './state';
  import { mutations, Mutations } from './mutations';
  
  import type { State } from './state';
  
  export { State };
  
  export type LangStore<S = State> = Omit<VuexStore<S>,  | 'commit'>
  & {
    commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
      key: K,
      payload: P,
      options?: CommitOptions
    ): ReturnType<Mutations[K]>;
  } 
  
  export const store: Module<State, RootState> = {
    state,
    mutations,
  };
  