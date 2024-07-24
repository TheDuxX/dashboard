"use server";

import { getErrorMessage } from "@/app/_lib/utils";
import { createSupabaseClient } from "@/auth/server";

export async function createAccountAction(formData: FormData) {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { auth } = createSupabaseClient();

    const { error } = await auth.signUp({ email, password });

    if (error) throw error;

    return {errorMessage: null}

  } catch {
    return { errorMessage: getErrorMessage(Error) };
  }
}

export async function loginAction(formData: FormData) {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { auth } = createSupabaseClient();

    const { error } = await auth.signInWithPassword({ email, password });

    if (error) throw error;

    return {errorMessage: null}

  } catch {
    return { errorMessage: getErrorMessage(Error) };
  }
}
