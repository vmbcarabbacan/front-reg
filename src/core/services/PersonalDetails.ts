import { store } from "@/store";
import { App } from "vue";
import { PersonalActionTypes } from "@/core/enum/Personals/Actions";
import { PersonalMutationTypes } from "@/core/enum/Personals/Mutations";
import { Result, Generics, Health } from '@/core/types';

class personalDetails{

    public static vueInstance: App;

    public static init(app: App<Element>) {
        personalDetails.vueInstance = app;
    }

    public static async post(payload) {
        return await store
        .dispatch(PersonalActionTypes.POST_PERSONAL_DETAILS, payload);
    }

    public static setCustomer(payload: Health) {
        store.commit(PersonalMutationTypes.SET_CUSTOMER, payload);
    }

    public static setResult(payload: Result) {
        store.commit(PersonalMutationTypes.SET_CUSTOMER_RESULT, payload);
    }

    public static setMembers(payload: Array<Generics>) {
        store.commit(PersonalMutationTypes.SET_CUSTOMER_MEMBERS, payload);
    }

    public static setAges(payload: Array<number>) {
        store.commit(PersonalMutationTypes.SET_CUSTOMER_AGES, payload);
    }

    public static setLoading(payload: boolean) {
        store.commit(PersonalMutationTypes.SET_CUSTOMER_LOADING, payload);
    }
}

export default personalDetails;