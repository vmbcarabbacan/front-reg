import { store } from "@/store";
import { App } from "vue";
import { InsuranceActionTypes } from "@/core/enum/Insurances/Actions";

class Insurances{

    public static vueInstance: App;

    public static init(app: App<Element>) {
        Insurances.vueInstance = app;
    }

    public static async getInsuredTypes() {
        return await store
        .dispatch(InsuranceActionTypes.GET_INSURED_TYPES)
    }
}

export default Insurances;