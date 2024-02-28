import { getSecurityQuestions } from "$lib/constants";

/** @type {import('./$types').PageLoad} */
export function load() {
	console.log("loading page data");
	console.log(`loaded ${getSecurityQuestions().length} security questions`)
	return {
		securityQuestionsList: getSecurityQuestions(),
	};
}