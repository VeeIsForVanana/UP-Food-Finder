import { getSecurityQuestions } from "$lib/constants";
import { supabase } from "$lib/supabaseClient";

/** @type {import('./$types').PageLoad} */
export async function load() {
	console.log("loading page data");
	console.log(`loaded ${getSecurityQuestions().length} security questions`)

	return {
		securityQuestionsList: getSecurityQuestions(),
	};
}