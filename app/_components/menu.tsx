import { HomeIcon, Store, PackagePlus, Bolt } from "lucide-react";
import Link from "next/link";

const Navigation = () => {
  return (
    <div className="w-100% h-[50px] bg-primary fixed bottom-0 right-0 left-0 m-2 rounded-full flex flex-row items-center justify-around text-secondary ">
      <Link href="/">
        <HomeIcon className="stroke-1" />
      </Link>
      <Link href="/products">
        <Store className="stroke-1" />
      </Link>
      <Link href="/new-product">
        <PackagePlus className="stroke-1" />
      </Link>
      <Link href="/configuration">
        <Bolt className="stroke-1" />
      </Link>
    </div>
  );
};

export default Navigation;
