import { App } from "vue";
import * as ElementPlusIconsVue from '@element-plus/icons-vue';

/**
 * @description skeleton
 */
import HeaderView from '@/components/skeleton/HeaderView.vue';
import headerDef from '@/components/skeleton/headers/DefNav.vue';
import headerNoCompareQuotes from '@/components/skeleton/headers/NoCompareQuotes.vue';
import headerDeclarationThankyou from '@/components/skeleton/headers/DeclarationThankyou.vue';

/**
 * @description reusables
 */
import ResTitle from '@/components/reusables/Title.vue';
import inputText from '@/components/reusables/InputText.vue';
import inputCheckBox from '@/components/reusables/InputCheckBox.vue';
import selectDate from '@/components/reusables/SelectDate.vue';
import selectNationality from '@/components/reusables/SelectNationality.vue';
import selectInsuredType from '@/components/reusables/SelectInsuredType.vue';
import selectGender from '@/components/reusables/SelectGender.vue';
import selectRelationship from '@/components/reusables/SelectRelationships.vue';
import MembersForm from '@/components/reusables/Members.vue';
import buttonProceed from '@/components/reusables/ButtonProceed.vue';

/**
 * @description views
 */
 import PersonalDetails from '@/components/forms/PersonalDetails.vue';
 import HealthDeclarations from '@/components/forms/HealthDeclarations.vue';

 /**
  * @description Myself, Domestic Workers, Family, Employee and Parents fields
  */
 import typeOthers from '@/components/forms/Fields/others.vue';
 import typeEmployees from '@/components/forms/Fields/employee.vue';

export function initComponent(app: App<Element>) {

    const data = [
        { key: 'h-header', component: HeaderView },
        { key: 'h-header-default', component: headerDef },
        { key: 'h-header-no-compare-quotes', component: headerNoCompareQuotes },
        { key: 'h-header-no-compare-quotes-thank-you', component: headerDeclarationThankyou },
        { key: 'h-title', component: ResTitle },
        { key: 'h-input', component: inputText },
        { key: 'h-checkbox', component: inputCheckBox },
        { key: 'h-date', component: selectDate },
        { key: 'h-nationality', component: selectNationality },
        { key: 'h-insured-type', component: selectInsuredType },
        { key: 'h-gender', component: selectGender },
        { key: 'h-relationship', component: selectRelationship },
        { key: 'h-proceed', component: buttonProceed },
        { key: 'h-member-form', component: MembersForm },
        { key: 'h-personal-details', component: PersonalDetails },
        { key: 'h-type-not-employee', component: typeOthers },
        { key: 'h-type-employee', component: typeEmployees },
        { key: 'h-health-declarations', component: HealthDeclarations },
    ];

    data.forEach(element => {
        app.component(element.key, element.component);
    });

    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
        app.component(key, component)
    }
}
