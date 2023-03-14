import router from "@/router";
// import { store } from "@/store";
import { App } from "vue";
import { routes } from "../utils";


export const header = (app: App<Element>) => {
    app.config.globalProperties.header = {
        go(header_id: number) {
            const selectedRoute = routes.find(x => x.header_id === header_id)
            const currentRoute = routes.find(x => x.name === router.currentRoute.value.name)
           if(selectedRoute) {
            const route = router.resolve({ name: selectedRoute.name })
            if(currentRoute && selectedRoute.header_id < currentRoute.header_id) window.location.href = route.href;
           }
        },

    }
}