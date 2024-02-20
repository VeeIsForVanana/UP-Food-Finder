import { fail } from '@sveltejs/kit';
import { registerVendor } from '$lib/server/database';

export const actions = {
    registerVendor: async ({ request }: any) => {
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
        });

        if(failure && data != null) {
            return fail(400, data);
        }

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