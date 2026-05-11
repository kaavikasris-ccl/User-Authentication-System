export const validateUsername = (username) => {
  if (username.length < 3 || username.length > 25) {
    return "Username must be between 3 and 25 characters.";
  }
  return "";
};

export const validateEmail = (email) => {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return "Enter a valid email address.";
  }
  return "";
};

export const validatePassword = (password) => {
  if (
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*!]).{8,}$/.test(password)
  ) {
    return "Password must have 8+ chars, uppercase, lowercase, number & special character.";
  }
  return "";
};

export const validateConfirmPassword = (password, confirmPassword) => {
  if (password !== confirmPassword) {
    return "Passwords do not match.";
  }
  return "";
};