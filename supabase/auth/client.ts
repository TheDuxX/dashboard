import { useState, useEffect } from "react";
import { createSupabaseClient } from "../client";
import { User } from "@/app/_lib/types";

function getAuth() {
  const { auth } = createSupabaseClient();
  return auth;
}

export function useGetUser() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const auth = getAuth();

    const { data: authListener } = auth.onAuthStateChange(async (event, session) => {
      const sessionUser = session?.user;
      const shouldUpdate = sessionUser?.updated_at !== user?.updated_at;
      if (shouldUpdate) {
        if (sessionUser) {
          const user: User = await fetch("/api/auth/get-user").then((res) => res.json());
          setUser(user);
        } else {
          setUser(null);
        }
      }
    });

    // Cleanup subscription on unmount
    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, [user]);

  return user;
}
