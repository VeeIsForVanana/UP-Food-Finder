class Vendor {

    constructor (
        private username: string,
        private password: string,
        private phoneNumber: string,
        private securityQuestion: string,
        private securityQAnswer: string,
    ) {}

    getPhoneNumber() {
        return this.phoneNumber;
    }
}

let vendors: Vendor[] = [
    // Sample Vendor for Testing
    new Vendor(
    "testUser",         // username
    "testPassword",     // password
    "01234567890",       // phoneNumber
    "What is your mother's maiden name?",     // securityQuestion
    "testAnswer"        // securityQAnswer
    )
];

export function registerVendor(
    username: string,
    password: string,
    phoneNumber: string,
    securityQuestion: string,
    securityQAnswer: string,
) {
    let newVendor = new Vendor (
        username,
        password,
        phoneNumber,
        securityQuestion,
        securityQAnswer,
    )

    vendors.push(newVendor);
}

export function isPhoneNumberExists(phoneNumber: string) {
    return vendors.some((vendor) => vendor.getPhoneNumber() === phoneNumber);
}

export function getVendors() {
    return structuredClone(vendors);
}