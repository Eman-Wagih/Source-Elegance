import type { loginData } from "@/components/login-form";
import type { clientData } from "@/components/signup-form";

const API_URL = import.meta.env.VITE_API_URL;

export const createUser = async (data: clientData) => {
  const res = await fetch(`${API_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Something went wrong");
  }

  return await res.json();
};

export const login = async (data: loginData) => {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Something went wrong");
  }
  return await res.json();
};
