
export const loginUser = async (email: string, password: string) => {
  const response = await fetch("http://localhost:5000/login", {
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

export const forgotPassword = async (email: string) => {
  const response = await fetch("http://localhost:5000/forgot-password", {
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

export const resetPassword = async (
  email: string,
  oldPassword: string,
  newPassword: string
) => {
  const response = await fetch("http://localhost:5000/reset-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      oldPassword,
      newPassword,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to reset password");
  }

  return data;
};