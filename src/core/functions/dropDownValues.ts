import { store } from "@/store";
import { App } from "vue";
import { Generics } from "../types";
import { genders } from "@/core/utils";

export const dropDown = (app: App<Element>) => {
    app.config.globalProperties.dropDown = {
        getNationality(e: number) {
            const countries = store.state.countries.countries;
            const nationality = countries.find(x => x.value === e);
            return nationality?.label;
        },

        getRelationship(e: number, insured_type: number) {
            let relationships: Array<Generics> = [];
            switch (insured_type) {
                case 2:
                    relationships = store.state.relationships.domestics;
                    break;
                case 3:
                    relationships = store.state.relationships.families;
                    break;
                case 5:
                    relationships = store.state.relationships.parents;
                    break;
                default:
                    relationships = [];
                    break;
              }

            const relationship = relationships.find(x => x.value === e);
            return relationship?.label;
        },

        getGender(e: string) {
            const gents: Array<Generics> = genders;
            const gender = gents.find(x => x.value === e);
            return gender?.label
        }
    }
}