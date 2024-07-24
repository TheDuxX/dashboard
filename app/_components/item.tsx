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
    price: number;
    categoryId: string;
    markId: string;
    imageUrls: string[];
    views: number | null;
    category: {
      id: string;
      name: string;
    };
    mark: {
      id: string;
      name: string;
    };
  };
  itemOrientation: boolean;
}

const Item = ({ product, itemOrientation }: ProductItemProps) => {
  const router = useRouter();

  const handleProductClick = async () => {
    try {
      // Atualiza as visualizações do produto
      const response = await fetch(`/api/products/${product.id}/views`, {
        method: "PATCH",
      });

      if (response.ok) {
        // Redireciona para a página do produto
        router.push(`/product/${product.id}`);
      } else {
        console.error("Erro ao atualizar visualizações do produto");
      }
    } catch (error) {
      console.error("Erro ao atualizar visualizações do produto:", error);
    }
  };

  const formattedPrice = `R$ ${product.price.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

  return (
    <Card
      className={`p-0 ${itemOrientation ? "w-full" : "w-50%"}`}
      onClick={handleProductClick}
    >
      <CardContent
        className={`p-1 flex ${
          itemOrientation ? "flex-row " : "flex-col justify-between"
        } `}
      >
        <div
          className={`relative ${
            itemOrientation ? "w-[120px] " : "min-w-[120px]"
          } aspect-square bg-slate-400 rounded-md`}
        >
          <Image
            src={product.imageUrls[0]}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>
        <div
          className={`px-1 flex flex-col  ${
            itemOrientation ? "gap-5 justify-between" : "gap-2"
          }`}
        >
          <div className="flex flex-col gap-0">
            <h2
              className={`font-medium line-clamp-1 ${
                itemOrientation ? "text-xl" : "text-lg"
              }`}
            >
              {product.name}
            </h2>
            <small>
              {product.mark ? product.mark.name : "Marca não disponível"}
            </small>
          </div>
          <h3
            className={`scroll-m-20 ${
              itemOrientation ? "text-xl" : "text-lg"
            } font-semibold tracking-tight`}
          >
            {formattedPrice}
          </h3>
        </div>
      </CardContent>
    </Card>
  );
};

export default Item;
