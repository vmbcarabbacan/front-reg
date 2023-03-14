export type Health = {
    id: number | null;
    lang: string;
    name: string | null;
    email: string | null;
    phone_number: string | number | null;
    phone_country_code: string | null;
    insured_city: number | null;
    insured_type_id: number;
    is_salary: number | boolean | null;
    expected_insurance_start_date: string | null;
    expected_insurance_start_day: string | null;
    expected_insurance_start_month: string | null;
    expected_insurance_start_year: string | null;
    customer_source: string | null;
    is_health: number;
    utm_source: string | null;
    utm_medium: string | null;
    utm_campaign: string | null;
    utm_content: string | null;
    age: number;
    dob: string | null;
    dob_day: string | null;
    dob_month: string | null;
    dob_year: string | null;
    nationality_id: number | null;
    gender: string | null;
    company_name: string | null;
    is_self: boolean | number | null;
    agent: number | null;
    is_company: boolean;
    members: Array<Member>;
    categories: Array<Category> | null;
    query?: Record<string, unknown>;
    is_web: boolean
}

export type Member = {
    id: number | null;
    member_name: string | null;
    relationship: string | null;
    gender: string | null;
    age: number;
    dob: string | null;
    dob_day: string | null;
    dob_month: string | null;
    dob_year: string | null;
    nationality_id: number | null;
    is_salary: number | boolean | null,
    declaration_answers: Array<Declarations>,
    is_editable: boolean
}

export type Declarations = {
    id: number;
    question: string;
    answer: string;
}

export type Category = {
    id: number | null;
    name: string | null;
    groups: Array<Group>;
}

export type Group = {
    id: number | null;
    age_group: string | null;
    plan: string | null;
    group_count: number | null;
}

export type Result = {
    customer_id: number,
    lead_id: number,
    insured_type: number,
    lead_information: Array<Information>
}

export type Information = {
    id: number,
    customer_id: number,
    lead_id: number,
    insured_type: number,
    relationship: number | null,
    member_name: string,
    gender: string,
    dob: string,
    nationality_id: number,
    nationality: string,
    is_salary: number,
    declaration_answers: Array<Declarations>,
    created_at: string,
    updated_at: string,
    deleted_at: string | null
}