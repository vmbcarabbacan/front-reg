import { store } from "@/store";
import { App } from "vue";
import { DeclarationsActionTypes } from "@/core/enum/Declarations/Actions";
import { DeclarationsMutationTypes } from "../enum/Declarations/Mutations";
import { healthDeclarations } from '@/core/types';

class Declarations{

    public static vueInstance: App;

    public static init(app: App<Element>) {
        Declarations.vueInstance = app;
    }

    public static async getDeclarations() {
        return await store
        .dispatch(DeclarationsActionTypes.GET_DECLARATIONS)
    }

    public static async postDeclarations(payload: healthDeclarations) {
        return await store
        .dispatch(DeclarationsActionTypes.POST_DECLARATION, payload)
    }

    public static setLoading(payload: boolean) {
        store.commit(DeclarationsMutationTypes.SET_DECLARATION_LOADING, payload)
    }
}

export default Declarations;