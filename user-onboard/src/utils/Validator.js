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

export function validateStep5(step5Data){
    let cardValid = step5Data.cardNumber !== "" && step5Data.cardNumber.length === 16;
    let expiryValid = step5Data.expiry !== "" && step5Data.expiry.match(/(\b([0-9]|1[01])\\\d+\b)/g);
    let cvvValid = step5Data.cvv !== "" && step5Data.cvv.length === 3
    let nameValid = step5Data.name !== "";
    let addressValid = step5Data.address !== "";
    const error = {
        cardValid: cardValid,
        expiryValid: expiryValid,
        cvvValid: cvvValid,
        nameValid: nameValid,
        addressValid: addressValid,
        message: "Invalid Card Details"
    }
    return error;
}