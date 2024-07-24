"use client";
import { ChevronLeft } from "lucide-react";
import { Avatar } from "./ui/avatar";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";

const links = [
  { name: "Início", href: "/" },
  { name: "Produtos", href: "/products" },
  { name: "Novo Produto", href: "/new-product" },
  { name: "Configurações", href: "/configuration" },
  { name: "Novo Usuário", href: "/new-user" },
  { name: "Login", href: "/login" },
];

const NavHeader = () => {
  const pathname = usePathname();

  return (
    <div>
      <div className="min-h-[75px] w-full rounded-md shadow-sm bg-white flex justify-between p-2 items-center">
        <Link href="/">
          <ChevronLeft className="stroke-1" />
        </Link>
        {links.map((link) => {
          if (link.href === pathname) {
            return <p className="font-medium">{link.name}</p>;
          }
          return null; // Não renderize nada se o href não corresponder ao caminho atual
        })}
        <Avatar className="relative border border-solid min-h-[50px] min-w-[50px]">
          <Image src="./vercel.svg" alt="avatar" fill className="object-fill" />
        </Avatar>
      </div>
    </div>
  );
};

export default NavHeader;
