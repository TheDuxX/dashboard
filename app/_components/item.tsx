"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";

interface ProductItemProps {
  product: {
    id: string;
    name: string;
    description: string;
    reference: string;
    status: boolean;
    date: Date;
    price: number; // Agora é number
    categoryId: string;
    markId: string;
    imageUrls: string[];
    views: number | null;
    Category: {
      id: string;
      name: string;
    };
    Mark: {
      id: string;
      name: string;
    };
  };
}

const Item = ({ product }: ProductItemProps) => {
  const router = useRouter();

  const handleProductClick = () => {
    // router.push(`/product/${product.id}`);
  };

  const formattedPrice = `R$ ${product.price.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

  return (
    <Card className="p-0 w-[150px]" onClick={handleProductClick}>
      <CardContent className="p-1 flex flex-col justify-between">
        <div className="relative min-w-[120px] aspect-square bg-slate-400 rounded-md">
          <Image
            src={product.imageUrls[0]}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="px-1 flex flex-col gap-2">
          <div className="flex flex-col gap-0">
              <h2 className="font-medium line-clamp-1 text-lg">{product.name}</h2>
              <small>{product.Mark.name}</small>
          </div>
          <h3 className="scroll-m-20 text-lg font-semibold tracking-tight">
            {formattedPrice}
          </h3>
        </div>
      </CardContent>
    </Card>
  );
};

export default Item;
