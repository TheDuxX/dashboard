import { Input } from "@/app/_components/ui/input";
import { Label } from "@/app/_components/ui/label";
import { login, signup } from "../actions";
import { Button } from "@/app/_components/ui/button";
import NavHeader from "@/app/_components/nav-header";

export default function LoginPage() {
  return (
    <>
      <NavHeader />
      <div className="py-4 flex items-center justify-center">
          <form className="flex flex-col gap-2 w-[70%] h-full">
            <Label htmlFor="email">Email:</Label>
            <Input id="email" name="email" type="email" required />
            <Label htmlFor="password">Password:</Label>
            <Input id="password" name="password" type="password" required />
            <div className="flex flex-col gap-1">
              <Button formAction={login}>Entrar</Button>
            </div>
          </form>
      </div>
    </>
  );
}
