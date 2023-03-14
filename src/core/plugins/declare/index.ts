import { App } from 'vue';
import { initComponent } from '../components';
import { dates } from '@/core/functions/dateValues';
import { personalDetails } from '@/core/functions/personalDetails';
import { healthDeclarations } from '@/core/functions/healthDeclarations';
import { dropDown } from '@/core/functions/dropDownValues';
import { rule } from '@/core/functions/rulesValues';
import { header } from '@/core/functions/headerFunction';

import Language from '@/core/services/Language';
import Countries from '@/core/services/Countries';
import Insurances from '@/core/services/Insurances';
import Relationships from '@/core/services/Relationships';
import PersonalDetails from '@/core/services/PersonalDetails';
import Declarations from '@/core/services/Declarations';
import ApiService from '@/core/services/ApiService';

export function initGlobal (app: App<Element>) {
    initComponent(app);
    
    dates(app);
    healthDeclarations(app);
    personalDetails(app);
    dropDown(app);
    rule(app);
    header(app);
    
    Language.init(app);
    Countries.init(app);
    Insurances.init(app);
    Relationships.init(app);
    PersonalDetails.init(app);
    Declarations.init(app);
    ApiService.init(app);
}