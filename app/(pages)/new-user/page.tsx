"use client";

import NavHeader from "@/app/_components/nav-header";
import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import toast, { Toaster } from "react-hot-toast";
import { createAccountAction } from "../../_actions/users";
import { Loader2 } from "lucide-react";

const CreateAccountPage = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleClickCreateAccountButton = (formData: FormData) => {
    startTransition(async () => {
      const { errorMessage } = await createAccountAction(formData);

      if (errorMessage) {
        toast.error(errorMessage);
      } else {
        router.push("/");
        toast.success("Account created!");
      }
    });
  };

  return (
    <div className="h-full w-full flex flex-col gap-2">
      <NavHeader />
      <div className="w-full flex flex-col items-center justify-between ">
        <div className="max-w-96 border border-solid p-5 rounded-lg gap-4 flex flex-col bg-white shadow-sm">
          <h1 className="text-2xl text-center">Criar usuário</h1>
          <form className="flex flex-col gap-2" action={handleClickCreateAccountButton}>
            <Input type="email" name="email" placeholder="Email" className="" />
            <Input
              type="password"
              name="password"
              placeholder="Senha"
              className=""
            />
            <Button disabled={isPending}>{isPending ? <Loader2 className="animate-spin"/> : "Criar usuário"}</Button>
          </form>
          <p className="text-sm ">
            Deseja recuperar um usuário?{" "}
            <a className="underline italic text-blue-600 cursor-pointer">
              Recuperar Senha
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreateAccountPage;
