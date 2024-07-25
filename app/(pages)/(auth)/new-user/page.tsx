import { Input } from "@/app/_components/ui/input";
import { Label } from "@/app/_components/ui/label";
import { Button } from "@/app/_components/ui/button";
import NavHeader from "@/app/_components/nav-header";
import { signup } from "../actions";

export default function NewUser() {
  return (
    <>
      <NavHeader />
      <div className="py-4 flex items-center justify-center">
        <form className="flex flex-col gap-2 w-[70%] h-full">
          <Label htmlFor="email">Email:</Label>
          <Input id="email" name="email" type="email" required />
          <Label htmlFor="password">Password:</Label>
          <Input id="password" name="password" type="password" required />
          <Label htmlFor="username">Username:</Label>
          <Input id="username" name="username" type="text" required />
          <Label htmlFor="avatar">Avatar URL:</Label>
          <Input id="avatar" name="avatar" type="url" />
          <div className="flex flex-col gap-1">
            <Button formAction={signup}>Criar</Button>
          </div>
        </form>
      </div>
    </>
  );
}
