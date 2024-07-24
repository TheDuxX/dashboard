"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { useTransition } from "react";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { signOutAction } from "../_actions/users";

const SignOutButton = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleClickSignOutButton = () => {
    startTransition(async () => {
      const { errorMessage } = await signOutAction();

      if (errorMessage) {
        toast.error(errorMessage);
      } else {
        router.push("/");
        toast.success("Sessão finalizada com sucesso!");
      }
    });
  };

  return (
    <Button
      onClick={handleClickSignOutButton}
      className=""
      disabled={isPending}
    >
      {isPending ? <Loader2 className="animate-spin" /> : "Logout"}
    </Button>
  );
};

export default SignOutButton;
