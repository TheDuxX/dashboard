import { getUser } from "@/supabase/auth/server";

export async function GET(req: Request) {
  const user = await getUser();

  return new Response(JSON.stringify(user), {
    headers: { "Content-Type": "application/json" },
  });
}
