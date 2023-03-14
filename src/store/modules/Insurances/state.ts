import { Generics } from '@/core/types';


export type State = {
  insuredTypes: Array<Generics>;
}

export const state: State = {
  insuredTypes: [] as Array<Generics>,
};