import { Generics } from '@/core/types';


export type State = {
  families: Array<Generics>;
  domestics: Array<Generics>;
  parents: Array<Generics>;
}

export const state: State = {
  families: [] as Array<Generics>,
  domestics: [] as Array<Generics>,
  parents: [] as Array<Generics>,
};