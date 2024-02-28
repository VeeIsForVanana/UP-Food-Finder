const SECURITY_QUESTIONS_LIST = [
    "What is your mother's maiden name?",
    "What is your favorite pet's name?",
    "What city were you born in?",
    "What is your favorite color?",
]

export function getSecurityQuestions() {
    return structuredClone(SECURITY_QUESTIONS_LIST);
}