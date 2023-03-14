import PersonalDetails from '@//views/PersonalDetails.vue';
import HealthDeclaration from '@/views/HealthDeclaration.vue';
import ThankYou from '@/views/ThankYou.vue';

export const routes = [
    {
        path: '/personal-details',
        name: 'PersonalDetails',
        component: PersonalDetails,
        header_id: 1
    },
    {
        path: '/health-declarations',
        name: 'HealthDeclaration',
        component: HealthDeclaration,
        header_id: 2
    },
    {
        path: '/thank-you',
        name: 'ThankYou',
        component: ThankYou,
        header_id: 5
    }
]
