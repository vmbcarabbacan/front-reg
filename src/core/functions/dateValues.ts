import { App } from "vue";
import moment from "moment";

export const dates = (app: App<Element>) => {
    app.config.globalProperties.dates = {
        getDays() {
            return Array.from({ length: 31 }, (_, i) => i + 1);
        },

        getYears() {
            const year = new Date().getFullYear();
            return Array.from(
                { length: year - 1900 },
                (value, index) => year - index);
        },

        getYearAddOne() {
            const year = new Date().getFullYear();
            return [year, year + 1];

        },

        filtered(e: Date) {
            return moment(e, 'YYYY-MM-DD').format('DD/MM/YYYY');
        },

        getAge(e: Date) {
            return moment().diff(moment(e, "YYYY MM DD"), 'years');
        }
    }
}