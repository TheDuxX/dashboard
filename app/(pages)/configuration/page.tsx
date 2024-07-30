import NavHeader from "@/app/_components/nav-header";
import { Button } from "@/app/_components/ui/button";
import Link from "next/link";

const Config = () => {
  return (
    <div className="flex flex-col gap-2 p-2">
      <NavHeader />

      <Link href="/login">
        <Button>Login</Button>
      </Link>
      <Link href="/new-user">
        <Button>Criar usuário</Button>
      </Link>
    </div>
  );
};

export default Config;
