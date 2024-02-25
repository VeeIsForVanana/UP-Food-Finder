import { fail } from '@sveltejs/kit';
import { registerVendor } from '$lib/server/database';

export const actions = {
    registerVendor: async ({ request }: any) => {
        // get form data, variables based on page.svelte, input tag, name attribute
        const formData: FormData = await request.formData()
        const username = String(formData.get("username"))
        const password = String(formData.get("password"));
        const phoneNumber = String(formData.get("phone_number"));
        const securityQuestion = String(formData.get("security_q"));
        const securityQuestionAnswer = String(formData.get("security_a"));

        let failure = false;
        let data = null;

        // check if any of the necessary fields is missing and return an error if so
        [username, password, phoneNumber, securityQuestion, securityQuestionAnswer].forEach((elem) => {
            if (!elem) {
                failure = true;
                data = { missing: true };
            }

            // check if the password is too short or too long
            if (password.length < 8 || password.length > 32) {
                failure = true;
                data = { passwordError: true };
            }
        });

        // form has missing field(s)
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

        return { registrationSuccess: true };
    }
}