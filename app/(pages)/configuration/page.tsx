import NavHeader from "@/app/_components/nav-header";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/_components/ui/tabs";
import Profile from "./_components/profile";
import NewUser from "./_components/new-user";
import { Card, CardContent } from "@/app/_components/ui/card";
import { FindManyCategories, FindManyProducts } from "@/app/_lib/utils";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableRow,
} from "@/app/_components/ui/table";
import { Pen, Trash2 } from "lucide-react";
import UserConfig from "./_components/user-config";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/app/_components/ui/dialog";
import { Button } from "@/app/_components/ui/button";
import FiltersConfig from "./_components/filters";

const Config = () => {
  return (
    <div className="flex flex-col gap-2 p-2">
      <NavHeader />
      <div className="grid grid-cols-2 gap-2">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="aspect-square w-full h-auto">Usuários</Button>
          </DialogTrigger>
          <DialogContent className="w-[95%] rounded-lg flex items-center justify-center pt-10 bg-gray-100">
            <UserConfig />
          </DialogContent>
        </Dialog>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="aspect-square w-full h-auto">Filtros</Button>
          </DialogTrigger>
          <DialogContent className="w-[95%] rounded-lg flex items-center justify-center pt-10 bg-gray-100">
            <FiltersConfig />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Config;
