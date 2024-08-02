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
import NewMark from "./_components/new-mark";
import NewCategory from "./_components/new-category";

const Config = () => {
  return (
    <div className="flex flex-col gap-1 p-2">
      <NavHeader />
      <div className="w-full">
        <Tabs defaultValue="profile" className="w-full space-y-0">
          <TabsList className="grid w-full grid-cols-3 m-0 p-0 space-x-2">
            <TabsTrigger value="profile" className="rounded-b-none">
              Perfil
            </TabsTrigger>
            <TabsTrigger value="new-user" className="rounded-b-none">
              Novo usuário
            </TabsTrigger>
            <TabsTrigger value="test" className="rounded-b-none">
              Novo filtro
            </TabsTrigger>
          </TabsList>
          <TabsContent value="profile">
            <Card className="rounded-t-none">
              <CardContent className="p-0 py-2">
                <Profile />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="new-user">
            <Card className="rounded-t-none">
              <CardContent className="p-0 py-2">
                <NewUser />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="test">
            <Card className="rounded-t-none">
              <CardContent className="p-0 py-2  min-h-20 space-y-4">
                <NewCategory />
                <NewMark />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Config;
