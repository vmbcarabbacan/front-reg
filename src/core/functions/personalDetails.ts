/* eslint-disable */
import { App } from "vue";
import { FormInstance } from "element-plus";
import { Member } from "@/core/types";
import pd from "@/core/services/PersonalDetails";
import { store } from "@/store";
import { focus } from "@/store/stateless"
import router from "@/router";

export const personalDetails = (app: App<Element>) => {
    const dates = app.config.globalProperties.dates;
    app.config.globalProperties.personalDetails = {
        async click(formEl: FormInstance) {
            if (!formEl) return;
            formEl.validate(async (valid, fields: any) => {
                if (valid) {
                    pd.setLoading(true);
                    const customer = store.state.personals.customer
                    customer.query = router.currentRoute.value.query
                    customer.age = dates.getAge(customer.dob);
                    pd.setCustomer(customer)
                    await pd.post(customer);

                    pd.setLoading(false);
                } else {
                    focus.personal = ''
                    formEl.scrollToField(Object.keys(fields)[0])
                    focus.personal = Object.keys(fields)[0]
                    focus.member = ''
                }
            })
        },

        reset(formEl: FormInstance | undefined) {
            if (!formEl) return
            formEl.clearValidate()
        },

        deleteMember(members: Array<Member>, index: number) {
            members.splice(index, 1);
            if(members.length === 0) return members.push({
                id: null,
                member_name: null,
                relationship: null,
                gender: null,
                dob: null,
                age: 0,
                dob_day: "",
                dob_month: "",
                dob_year: "",
                nationality_id: null,
                is_salary: true,
                declaration_answers: [],
                is_editable: true
            })
        },

        editMember(members: Array<Member>, member: Member) {
            members.map(x => {
                x.is_editable = false;
            });

            member.is_editable = true;

            members.map(x => {
                if (!x.member_name || x.dob === 'Invalid date' || !x.gender || !x.nationality_id || !x.relationship) {
                    this.deleteMember(members, members.length - 1);
                }
            })
        }
    }
}