export class User {

    user_id: number;
    user_code: string;
    recaptcha_response: string;
    email: string;
    name: string;
    first_name: string;
    middle_name: string;
    last_name: string;
    organization_name: string;
    preferred_salutation: string;
    preferred_suffix: string;
    title: string;
    position: any[];
    work_telephone: string;
    work_cell: string;
    work_fax: string;
    organization_id: number;
    organization: any;
    organization_department: any;
    application_areas: any[];
    registered_states: any[];
    directory: boolean;
    policy_agreement: boolean;
    notify_user: boolean;
    added_ts: number;
    updated_ts: number;
    roles: any[];
    role_states: any;
    password: string;

}
