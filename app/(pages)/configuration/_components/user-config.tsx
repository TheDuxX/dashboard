import { Card, CardContent } from "@/app/_components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/_components/ui/tabs";
import Profile from "./profile";
import NewUser from "./new-user";

const UserConfig = () => {
  return (
    <div className="w-full">
      <Tabs defaultValue="profile" className="w-full space-y-0 bg-transparent">
        <TabsList className="grid w-full grid-cols-2 m-0 p-0 space-x-1 bg-transparent">
          <TabsTrigger
            value="profile"
            className="rounded-lg rounded-b-none data-[state=inactive]:border-[1px]"
          >
            Perfil
          </TabsTrigger>
          <TabsTrigger
            value="new-user"
            className="rounded-lg rounded-b-none data-[state=inactive]:border-[1px]"
          >
            Novo usuário
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
        
      </Tabs>
    </div>
  );
};

export default UserConfig;
