import { store } from "@/store";
import { App } from "vue";
import { RelationshipActionTypes } from "@/core/enum/Relationships/Actions";

class Insurances{

    public static vueInstance: App;

    public static init(app: App<Element>) {
        Insurances.vueInstance = app;
    }

    public static async getInsuredTypes() {
        return await store
        .dispatch(RelationshipActionTypes.GET_RELATIONSHIPS)
    }
}

export default Insurances;