import { store } from "@/store";
import { App } from "vue";

/** Insurance Type */
const myself = 1;
const domestics = 2;
const family = 3;
const parent = 5;

/** Emirates */
const dubai = 3;

export const rule = (app: App<Element>) => {
    app.config.globalProperties.rule = {
        members(insurance_type_id: number) {
            return [parent, family, domestics].includes(insurance_type_id);
        },

        go_thank_you(insurance_type_id: number, emirates: number) {
            const ages = store.state.personals.ages;

            if([myself, family].includes(insurance_type_id) && emirates === dubai) {
                return ages.includes(65);
            }

            if([myself, family].includes(insurance_type_id) && emirates !== dubai) {
                return ages.includes(60);
            }

            if([parent].includes(insurance_type_id) && emirates === dubai) {
                return ages.includes(90);
            }

            return false;
        }
    }
}