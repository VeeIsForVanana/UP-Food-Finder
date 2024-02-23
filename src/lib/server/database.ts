class Vendor {

    constructor (
        private username: string,
        private password: string,
        private phoneNumber: string,
        private securityQuestion: string,
        private securityQAnswer: string,
    ) {}
}

let vendors: Vendor[] = [];

export function registerVendor(
    username: string,
    password: string,
    phoneNumber: string,
    securityQuestion: string,
    securityQAnswer: string,
) {
    // perform additional check on inputs
    let phoneNumberRegex = new RegExp("^0[0-9]{10}$");
    if (!phoneNumberRegex.test(phoneNumber)) return;

    let newVendor = new Vendor (
        username,
        password,
        phoneNumber,
        securityQuestion,
        securityQAnswer,
    )

    vendors.push(newVendor);
}

export function getVendors() {
    return structuredClone(vendors);
}