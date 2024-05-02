import { getSecurityQuestions } from "$lib/constants";

/** @type {import('./$types').PageLoad} */
export async function load({ data }) {
	// console.log("loading page data");
	// console.log(`loaded ${getSecurityQuestions().length} security questions`)

	return {
		securityQuestionsList: getSecurityQuestions(),
		userVendor: data.userVendor,
	};
}