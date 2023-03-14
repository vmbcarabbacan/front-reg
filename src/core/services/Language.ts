import { store } from "@/store";
import { App } from 'vue';
import { LanguageMutationTypes } from "@/core/enum/Language/Mutation";

class Language { 
    public static vueInstance: App;

    public static init(app: App<Element>) {
        Language.vueInstance = app;
    }

    public static setLanguage(payload: string) {
        const lang = payload.slice(0, 2);
        const prevs = window.localStorage.getItem('language');
        window.localStorage.setItem('language', lang);
        store.commit(LanguageMutationTypes.SET_LANG, lang);
        if(prevs != lang) {
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        }
    }
}

export default Language;
