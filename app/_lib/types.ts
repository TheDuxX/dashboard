import { User as SupabaseUser } from "@supabase/supabase-js";

type profile = {
  username: string;
  avatar: string;
};

export type User = SupabaseUser & profile;