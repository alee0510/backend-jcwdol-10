import otpGenerator from "otp-generator"

export const generateOtp = () => {
    return otpGenerator.generate(6, {
        upperCase : true,
        specialChars : false,
        alphabets : true
    })
}