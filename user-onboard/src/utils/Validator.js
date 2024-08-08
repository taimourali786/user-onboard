export function validateEmail(email){
    return email.includes("@");
}
export function validatePassword(password){
    return password.length >= 8;
}

export function validateStep1(step1Data) {
    let isEmailValid = validateEmail(step1Data.email);
    let passwordLength = validatePassword(step1Data.password);
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
    let dobValid = step3Data.dob !== "" && step3Data.dob !== Date.now().toLocaleString();
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
    let cardValid = step5Data.cardNumber !== "" && luhnAlgorithm(step5Data.cardNumber);
    let expiryValid = step5Data.expiry !== "" && step5Data.expiry.match(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/);
    let nameValid = step5Data.name !== "";
    const error = {
        cardValid: cardValid,
        expiryValid: expiryValid,
        nameValid: nameValid,
        message: "Invalid Card Details"
    }
    return error;
}

function luhnAlgorithm(number) {
    const reversedNumber = number.toString().split('').reverse().map(Number);
    const checksum = reversedNumber.reduce((sum, digit, index) => {
        if (index % 2 === 1) {
            const doubledDigit = digit * 2;
            return sum + (doubledDigit > 9 ? doubledDigit - 9 : doubledDigit);
        } else {
            return sum + digit;
        }
    }, 0);
    return checksum % 10 === 0;
}