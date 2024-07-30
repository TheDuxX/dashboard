"use client";

import toast from "react-hot-toast";
import { signOut } from "../(pages)/(auth)/actions";
import { Button } from "./ui/button";

export const Logout = () => {
  const handleLogout = async () => {
    try {
      await signOut();
      window.location.href = "/login"
    } catch (error) {
      toast.error("Falha ao deslogar");
    }
  };

  return (
    <Button className="w-full" onClick={handleLogout}>
      Logout
    </Button>
  );
};
