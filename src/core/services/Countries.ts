import { store } from "@/store";
import { App } from "vue";
import { CountriesActionTypes } from "@/core/enum/Countries/Actions";

class Countries{

    public static vueInstance: App;

    public static init(app: App<Element>) {
        Countries.vueInstance = app;
    }

    public static async getCountries() {
        return await store
        .dispatch(CountriesActionTypes.GET_COUNTRIES)
    }

    public static async getCountryCode() {
        return await store
        .dispatch(CountriesActionTypes.GET_COUNTRY_CODE)
    }
}

export default Countries;