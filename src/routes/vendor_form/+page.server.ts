import { fail } from '@sveltejs/kit';
import { registerVendor } from '$lib/server/database';

export const actions = {
    registerVendor: async ({ request }: any) => {
        const formData: FormData = await request.formData()

        registerVendor(
            String(formData.get("username")),
            String(formData.get("password")),
            String(formData.get("phone_number")),
            String(formData.get("security_q")),
            String(formData.get("security_a")),
        )

        return { registrationSuccess: true }
    }
}