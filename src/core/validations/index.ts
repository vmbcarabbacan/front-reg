/* eslint-disable */
import { store } from "@/store";
import moment from "moment";

class Validations {
    public static customer() {
        return store.state.personals.customer
    }
    
    public static email(rule: any, value: any, callback: any) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!value) {
            callback(new Error('Please enter email'));
        } else if(!re.test(String(value).toLowerCase())) {
            callback(new Error('Email address must be valid'));
        } else {
            callback();
        }
    }

    public static names(rule: any, value: any, callback: any) {
        if(!value) {
            callback(new Error('Please enter your full name'));
        } else {
            callback();
        }
    }

    public static company_name(rule: any, value: any, callback: any) {
        if(!value) {
            callback(new Error('Please enter your company name'));
        } else {
            callback();
        }
    }

    public static number_members(rule: any, value: any, callback: any) {
        if(!value) {
            callback(new Error('Please enter number of members'));
        } else if(value < 1) {
            callback(new Error('Member count must not be less than or equal to 0'))
        } else {
            callback();
        }
    }

    public static member_name(rule: any, value: any, callback: any) {
        if(!value) {
            callback(new Error('Please enter member full name'));
        } else {
            callback();
        }
    }

    public static phone_number(rule: any, value: any, callback: any) {
        if(!value) {
            callback(new Error(`Please enter phone number`));
        } else {
            callback();
        }
    }

    public static emirate(rule: any, value: any, callback: any) {
        if(!value) {
            callback(new Error(`Please select city`));
        } else {
            callback();
        }
    }

    public static dob(rule: any, value: any, callback: any) {
        if(value === 'Invalid date' && Validations.customer().dob_day && Validations.customer().dob_month && Validations.customer().dob_year) {
            callback(new Error(`Please select correct date`));
        } else if(moment().diff(value, 'days') < 1) {
            callback(new Error('You still don\'t exist'))
        } else {
            callback();
        }
    }

    public static insurance_date(rule: any, value: any, callback: any) {
        if(value === 'Invalid date' && Validations.customer().expected_insurance_start_day && Validations.customer().expected_insurance_start_month && Validations.customer().expected_insurance_start_year) {
            callback(new Error(`Please select correct date`));
        } else {
            callback();
        }
    }

    public static day(rule: any, value: any, callback: any) {
        if(!value) {
            callback(new Error(`Please select date`));
        } else {
            callback();
        }
    }

    public static month(rule: any, value: any, callback: any) {
        if(!value) {
            callback(new Error(`Please select month`));
        } else {
            callback();
        }
    }

    public static year(rule: any, value: any, callback: any) {
        if(!value) {
            callback(new Error(`Please select year`));
        } else {
            callback();
        }
    }

    public static nationality(rule: any, value: any, callback: any) {
        if(!value) {
            callback(new Error(`Please select nationality`));
        } else {
            callback();
        }
    }

    public static gender(rule: any, value: any, callback: any) {
        if(!value) {
            callback(new Error(`Please select gender`));
        } else {
            callback();
        }
    }

    public static relationship(rule: any, value: any, callback: any) {
        if(!value) {
            callback(new Error(`Please select relationship`));
        } else {
            callback();
        }
    }
}

export default Validations;
