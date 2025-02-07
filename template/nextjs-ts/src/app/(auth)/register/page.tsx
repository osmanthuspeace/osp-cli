"use client";

import { useActionState } from "react";

const initialState = {
  message: "",
};

async function createUser(prevState: typeof initialState, formData: FormData) {
  try {
    const email = formData.get("email");
    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error("Registration failed");
    }

    return { message: "Registration successful!", data };
  } catch (error) {
    return { message: "An error occurred during registration.", error };
  }
}

function Register() {
  const [state, formAction, pending] = useActionState(createUser, initialState);

  return (
    <form action={formAction}>
      <label htmlFor="email">Email</label>
      <input type="text" id="email" name="email" required />
      <p aria-live="polite">{state?.message}</p>
      <button disabled={pending}>Sign up</button>
    </form>
  );
}
export default Register;
