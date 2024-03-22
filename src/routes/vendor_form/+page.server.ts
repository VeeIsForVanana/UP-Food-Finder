import { fail } from '@sveltejs/kit';
import { getVendors, registerVendor, isPhoneNumberExists, isUsernameExists } from '$lib/server/database/vendors';

export const actions = {
    registerVendor: async ({ request }) => {
        // get form data, variables based on page.svelte, input tag, name attribute
        const formData: FormData = await request.formData();
        const username = String(formData.get("username"));
        const password = String(formData.get("password"));
        const phoneNumber = String(formData.get("phone_number"));
        const securityQuestion = String(formData.get("security_q"));
        const securityQuestionAnswer = String(formData.get("security_a"));

        let failure = false;
        const data = { };

        // check if any of the necessary fields is missing and return an error if so
        [username, password, phoneNumber, securityQuestion, securityQuestionAnswer].forEach((elem) => {
            if (elem === 'null' || !elem) {
                failure = true;
                data.missing = true;
            }
        });
        
        // Check if username already exists in the database
        const usernameExists = await isUsernameExists(username);
        if (usernameExists) {
            failure = true;
            data.usernameExists = true;
        }

        // Check if phone number already exists in the database
        const phoneNumberExists = await isPhoneNumberExists(phoneNumber);
        if (phoneNumberExists) {
            failure = true;
            data.phoneNumberExists = true;
        }

        // perform additional check on inputs
        const phoneNumberRegex = new RegExp("^0[0-9]{10}$");
        if (!phoneNumberRegex.test(phoneNumber)) {
            failure = true;
            data.phoneError = true;
        }
        
        // check if the password is too short or too long
        if (password.length < 8 || password.length > 32) {
            failure = true;
            data.passwordError = true;
        }
        
        if(failure && data != null) {
            return fail(400, data);
        }

        // successful registration
        registerVendor(
            username,
            password,
            phoneNumber,
            securityQuestion,
            securityQuestionAnswer,
        );

        console.log(getVendors());

        return { registrationSuccess: true };
    }
}