import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { getUser } from "@/supabase/auth/server";
import Image from "next/image";

const Profile = async () => {
  const user = await getUser();

  return (
    <>
      <div className="w-full p-2">
        <form className="flex flex-col items-center justify-center w-full">
          <div className="py-4 flex flex-col items-center justify-center w-[70%]">
            <div className="w-24 relative aspect-square rounded-full bg-white">
              <Image
                src={user!.avatar}
                alt="avatar"
                fill
                className="object-fill rounded-full"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div className="w-full gap-2 flex flex-col pt-4">
              <Input
                id="username"
                name="username"
                type="text"
                required
                placeholder={user?.username}
                disabled
              />
              <Input
                id="email"
                name="email"
                type="email"
                required
                placeholder={user?.email}
                disabled
              />
              <div className="w-full flex gap-1">
                <Button type="button" className="w-full">
                  Editar
                </Button>
                <Button
                  type="button"
                  variant="destructive"
                  className="bg-red-500 text-white w-full"
                >
                  Excluir
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Profile;
