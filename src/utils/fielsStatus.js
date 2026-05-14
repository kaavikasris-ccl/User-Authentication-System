import {
  validateEmail,
  validatePassword,
  validateOtp,
  validateConfirmPassword,
} from "@/utils/validation";

/**
 * Convert validation into UI status
 * returns: "valid" | "invalid" | ""
 */

export const getEmailStatus = (email) => {
  if (!email) return "";
  return validateEmail(email) ? "invalid" : "valid";
};

export const getPasswordStatus = (password) => {
  if (!password) return "";
  return validatePassword(password) ? "invalid" : "valid";
};

export const getOtpStatus = (otp) => {
  if (!otp) return "";
  return validateOtp(otp) ? "invalid" : "valid";
};

export const getConfirmPasswordStatus = (password, confirmPassword) => {
  if (!confirmPassword) return "";
  return validateConfirmPassword(password, confirmPassword)
    ? "invalid"
    : "valid";
};