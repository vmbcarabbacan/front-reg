import { Health, Result, Generics } from '@/core/types';

export type State = {
  customer: Health;
  result: Result;
  members: Array<Generics>;
  loading: boolean;
  ages: Array<number>
}

export const state: State = {
  customer: {
    id: null,
    lang: window.localStorage.getItem('language'),
    name: null,
    email: null,
    phone_number: null,
    phone_country_code: "+971",
    insured_city: null,
    insured_type_id: 1,
    is_salary: true,
    expected_insurance_start_date: null,
    expected_insurance_start_day: "",
    expected_insurance_start_month: "",
    expected_insurance_start_year: "",
    customer_source: null,
    is_health: 1,
    utm_source: null,
    utm_medium: null,
    utm_campaign: null,
    utm_content: null,
    age: 0,
    dob: null,
    dob_day: "",
    dob_month: "",
    dob_year: "",
    nationality_id: null,
    gender: null,
    company_name: null,
    is_self: null,
    agent: null,
    is_company: false,
    members: [{
      id: null,
      member_name: null,
      relationship: null,
      gender: null,
      age: 0,
      dob: null,
      dob_day: "",
      dob_month: "",
      dob_year: "",
      nationality_id: null,
      is_salary: true,
      declaration_answers: [],
      is_editable: true
    }],
    categories: [{
      id: null,
      name: null,
      groups: [{
        id: null,
        age_group: null,
        plan: null,
        group_count: 1
      }]
    }],
    query: {},
    is_web: true
  } as Health,

  result: {} as Result,
  members: [] as Array<Generics>,
  ages: [] as Array<number>,
  loading: false,
};