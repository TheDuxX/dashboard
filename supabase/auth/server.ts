import { db } from "@/app/_lib/prisma";
import { createClient } from "../server"; // Supondo que prisma client seja exportado de lib/prisma.ts
import { User as SupabaseUser } from "@supabase/supabase-js";
import toast from "react-hot-toast";

// Tipagem para o perfil do usuário
type Profile = {
  username: string;
  avatar: string;
};

// Tipagem para o usuário combinado
export type User = SupabaseUser & Profile;

// Função para obter o cliente de autenticação
export function getAuth() {
  const { auth } = createClient();
  return auth;
}

// Função para obter o usuário autenticado e seu perfil
export const getUser = async () => {
  const auth = getAuth();
  const authUser = (await auth.getUser()).data.user;
  if (!authUser) return null;

  try {
    const profileData = await db.profiles.findUnique({
      where: { id: authUser.id },
      select: {
        username: true,
        avatar: true,
      },
    });

    if (!profileData) {
      console.error("Profile not found for user id:", authUser.id);
      toast.error("usuário não encontrado");
      console.log("Não encontrado");
      return null;
    }

    // Verifica se username e avatar não são null
    if (profileData.username === null || profileData.avatar === null) {
      console.error("Profile fields are null for user id:", authUser.id);
      toast.error("Profile fields are null for user id:");
      return null;
    }

    const profile: Profile = {
      username: profileData.username,
      avatar: profileData.avatar,
    };

    const user: User = {
      ...authUser,
      ...profile,
    };

    return user;
    
  } catch (error) {
    console.error("Error fetching profile:", error);
    return null;
  }
};
