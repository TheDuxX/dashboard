import { Avatar } from "@/app/_components/ui/avatar";
import Image from "next/image";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { getUser } from "@/supabase/auth/server";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Logout } from "@/app/_components/logout-button";

const wordlLink = " de ";

const Header = async () => {
  const user = await getUser();

  return (
    <>
      <div className="w-full min-h-[75px] bg-white rounded-md p-2 flex justify-between items-center shadow">
        <div className="flex flex-col gap-1">
          <h2 className="font-medium text-lg">Olá, {user?.username}</h2>
          <div className="flex gap-1 text-sm">
            <p className="capitalize">
              {format(new Date(), "EEEE', 'd", {
                locale: ptBR,
              })}
            </p>
            <p className="lowercase">{wordlLink}</p>
            <p className="capitalize">
              {format(new Date(), "MMMM", {
                locale: ptBR,
              })}
            </p>
          </div>
        </div>
        <div className="relative">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="relative border border-solid min-h-[50px] min-w-[50px]">
                <Image
                  src={user!.avatar}
                  alt="avatar"
                  fill
                  className="object-fill"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuPortal>
              <DropdownMenuContent
                className="min-w-[140px] border border-solid m-2 bg-white rounded-md p-2"
                sideOffset={7}
              >
                <DropdownMenuItem>
                  <Logout />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenuPortal>
          </DropdownMenu>
        </div>
      </div>
    </>
  );
};

export default Header;
