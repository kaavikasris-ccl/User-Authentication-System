const BASE_URL = "http://localhost:3000";

/**
 * LOGIN USER
 */
export const loginUser = async (email, password) => {
  const response = await fetch(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Login failed");
  }

  return data;
};

/**
 * FORGOT PASSWORD
 */
export const forgotPassword = async (email) => {
  const response = await fetch(`${BASE_URL}/api/auth/forgot-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to send OTP");
  }

  return data;
};

/**
 * VERIFY OTP + SET NEW PASSWORD
 */
export const verifyOtp = async (email, otp, newPassword) => {
  const response = await fetch(`${BASE_URL}/api/auth/verify-otp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      otp: Number(otp),   // ← convert to number
      newPassword,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to verify OTP");
  }

  return data;
};

/**
 * REGISTER USER
 */
export const registerUser = async (email, password) => {
  const response = await fetch(`${BASE_URL}/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Registration failed");
  }

  return data;
};