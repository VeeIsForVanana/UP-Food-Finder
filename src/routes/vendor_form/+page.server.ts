import { fail, redirect } from '@sveltejs/kit';
import { registerVendor, isPhoneNumberExists, isUsernameExists, getUserVendor } from '$lib/server/database/vendors';

export async function load({ locals: {supabase} }) {
    const userVendor = (await getUserVendor(supabase))[0] ?? null;

    console.log(userVendor)

    return {'userVendor': userVendor}
}

export const actions = {
    registerVendor: async ({ request, locals: { safeGetSession, supabase } }) => {
        // get form data, variables based on page.svelte, input tag, name attribute
        const formData: FormData = await request.formData();
        const user = String(formData.get("user"))
        const username = String(formData.get("username"));
        const phoneNumber = String(formData.get("phone_number"));

        const returnData = { status: 200, statusText: "Vendor successfully registered!" };

        const { session } = await safeGetSession()

        if (!session) {
            throw redirect(303, '/')
        }
        
        // check if the user is logged in
        if (user === 'null') {
            returnData.status = 401;
            returnData.statusText = "";
        }
        
        // check if any of the necessary fields is missing and return an error if so
        [username, phoneNumber].forEach((elem) => {
            if (elem === 'null' || !elem) {
                returnData.status = 422;
                returnData.statusText = "A field is missing."
            }
        });
        
        // Check if username already exists in the database
        const usernameExists = await isUsernameExists(username, supabase);
        if (usernameExists) {
            returnData.status = 422;
            returnData.statusText = "This username is already registered"
        }

        // Check if phone number already exists in the database
        const phoneNumberExists = await isPhoneNumberExists(phoneNumber, supabase);
        if (phoneNumberExists) {
            returnData.status = 422;
            returnData.statusText = "This phone number is already registered"
        }
        
        // perform additional check on inputs
        const phoneNumberRegex = new RegExp("^0[0-9]{10}$");
        if (!phoneNumberRegex.test(phoneNumber)) {
            returnData.status = 422;
            returnData.statusText = "This phone number is not in a valid format"
        }
        
        if(returnData.status != 200) {
            return fail(returnData.status, returnData);
        }
        
        // successful registration
        registerVendor(
            username,
            user,
            phoneNumber,
            supabase
        )

        return returnData;
    }
}
