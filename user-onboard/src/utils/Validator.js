export function validateStep1(step1Data) {
    let isEmailValid = step1Data.email.includes("@");
    let passwordLength = step1Data.password.length >= 8;
    let passwordsMatch = step1Data.password === step1Data.confirmPassword
        && step1Data.password !== "" && step1Data.confirmPassword !== "";
    let error = {
        emailValid: isEmailValid,
        passwordLength: passwordLength,
        passwordsMatch: passwordsMatch,
        message: "Invalid Form Data"
    };
    return error;
}

export function validateStep3(step3Data) {
    let dobValid = step3Data.dob !== "";
    let address1Valid = step3Data.address1Valid !== "";
    let address2Valid = step3Data.address2Valid !== "";
    let cityValid = step3Data.cityValid !== "";
    let countryValid = step3Data.countryValid !== "";
    let error = {
        dobValid:dobValid,
        address1Valid: address1Valid,
        address2Valid: address2Valid,
        cityValid: cityValid ,
        countryValid: countryValid,
        message: "Invalid Form Data"
    }
    return error;
}