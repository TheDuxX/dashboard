"use client";
import { ChevronLeft, User } from "lucide-react";
import { Avatar } from "./ui/avatar";
import Image from "next/image";
import { usePathname, useParams } from "next/navigation"; // Importar useParams
import Link from "next/link";
import { useGetUser } from "@/supabase/auth/client";

const NavHeader = () => {
  const pathname = usePathname();
  const params = useParams(); // Hook para acessar parâmetros da URL
  const user = useGetUser();

  const links = [
    { name: "Início", href: "/" },
    { name: "Produtos", href: "/products" },
    { name: "Novo Produto", href: "/new-product" },
    { name: "Configurações", href: "/configuration" },
    { name: "Novo Usuário", href: "/new-user" },
    { name: "Login", href: "/login" },
    { name: "Erro", href: "/error" },
    { name: "Perfil", href: "/configuration/profile" },
    // Verifique se params não é nulo antes de usar params.id
    ...(params ? [{ name: "Edição de Produto", href: `/product/${params.id}/edit` }] : []),
  ];

  return (
    <div>
      <div className="min-h-[75px] w-full rounded-md shadow-sm bg-white flex justify-between p-2 items-center">
        <Link href="/">
          <ChevronLeft className="stroke-1" />
        </Link>
        {links.map((link) => {
          if (link.href === pathname) {
            return (
              <p key={link.href} className="font-medium">
                {link.name}
              </p>
            );
          }
          return null;
        })}
        <Avatar className="relative min-h-[50px] min-w-[50px]">
          {user ? (
            <Image
              src={user.avatar}
              alt="avatar"
              fill
              className="object-fill"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="flex items-end justify-center w-full h-full bg-gray-200">
              <User size={40} className="p-0 m-0 stroke-1 text-gray-400" />
            </div>
          )}
        </Avatar>
      </div>
    </div>
  );
};

export default NavHeader;
