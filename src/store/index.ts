import { createStore } from 'vuex';

import { store as lang, LangStore, State as LangState } from '@/store/modules/Lang/';
import { store as countries, CountryStore, State as CountryState } from '@/store/modules/Countries/';
import { store as insurances, InsuranceStore, State as InsuranceState } from '@/store/modules/Insurances/';
import { store as relationships, RelationshipStore, State as RelationshipState } from '@/store/modules/Relationships/';
import { store as personals, PersonalStore, State as PersonalState } from '@/store/modules/Personals/';
import { store as declarations, DeclarationStore, State as DeclarationState } from '@/store/modules/Declarations/';

export type RootState = {
  countries: CountryState;
  lang: LangState;
  insurances: InsuranceState;
  relationships: RelationshipState;
  personals: PersonalState;
  declarations: DeclarationState;
};

export type Store = LangStore<Pick<RootState, 'lang'>>
& CountryStore<Pick<RootState, 'countries'>>
& InsuranceStore<Pick<RootState, 'insurances'>>
& RelationshipStore<Pick<RootState, 'relationships'>>
& DeclarationStore<Pick<RootState, 'declarations'>>
& PersonalStore<Pick<RootState, 'personals'>>;

export const store = createStore({
  modules: {
    countries,
    declarations,
    insurances,
    lang,
    personals,
    relationships,
  }
});

export function useStore(): Store {
  return store as Store;
}
