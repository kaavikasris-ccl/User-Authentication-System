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
    throw new Error(data.message || "Failed to send reset link");
  }

  return data;
};

/**
 * VERIFY OTP + SET NEW PASSWORD ← ADD THIS
 */
export const verifyOtp = async (email, otp, new_password) => {
  const response = await fetch(`${BASE_URL}/api/auth/verify-otp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,        // ← flat fields, not nested
      otp:Number(otp),
      new_password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to verify OTP");
  }

  return data;
};

/**
 * RESET PASSWORD (old password flow)
 */
export const resetPassword = async (email, oldPassword, new_password) => {
  const response = await fetch(`${BASE_URL}/api/auth/reset-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      oldPassword,
      new_password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to reset password");
  }

  return data;
};