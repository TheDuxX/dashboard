import NavHeader from "@/app/_components/nav-header";
import { Button } from "@/app/_components/ui/button";
import Link from "next/link";

const Config = () => {
  return (
    <div className="flex flex-col gap-2 p-2">
      <NavHeader />

      <div className="flex flex-row gap-2">
        <Link href="/configuration/profile" className="w-1/2 aspect-square">
          <Button
            className="w-full h-full border-none shadow-sm"
            variant="outline"
          >
            Editar perfil
          </Button>
        </Link>
        <Link href="/new-user" className="w-1/2 aspect-square">
          <Button
            className="w-full h-full border-none shadow-sm"
            variant="outline"
          >
            Criar usuário
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Config;
