/** @type {import('./$types').PageLoad} */
export async function load({ data }) {
	// console.log("loading page data");
	// console.log(`loaded ${getSecurityQuestions().length} security questions`)

	return {
		userVendor: data.userVendor,
	};
}