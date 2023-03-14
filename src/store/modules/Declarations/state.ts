/* eslint-disable */
import { Declaration } from '@/core/types';


export type State = {
  declarations: Array<Declaration>;
  loading: boolean;
  result: any
}

export const state: State = {
  declarations: [] as Array<Declaration>,
  loading: false,
  result: {}
};