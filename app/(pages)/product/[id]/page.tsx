import { Button } from "@/app/_components/ui/button";
import { db } from "@/app/_lib/prisma";
import { Archive, ChevronLeft, Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/app/_components/ui/carousel";
import Link from "next/link";

interface ProdctDetailsPageProps {
  params: {
    id?: string;
  };
}

// Se o ID não for encontrado a função retorna nula, TODO: implementar retorno para página inicial
const ProductDetailsPage = async ({ params }: ProdctDetailsPageProps) => {
  if (!params.id) {
    return null;
  }

  //Faz a conexão com o Banco de Dados e retorna um padrão único correspondente ao ID
  const product = await db.product.findUnique({
    where: {
      id: params.id,
    },
    include: {
      category: true,
      mark: true,
    },
  });

  // Se o produto não for encontrado a função retorna nula, TODO: implementar retorno para página inicial
  if (!product) {
    return null;
  }

  return (
    <div className="p-2">
      <div className="rounded-lg" id="image">
        <Carousel
          opts={{
            loop: true,
            container: "image",
          }}
        >
          <CarouselContent className="static">
            {product.imageUrls.map((url, index) => (
              <CarouselItem
                key={index}
                className="relative aspect-square rounded-lg"
              >
                <Image
                  src={url}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-scale-down overflow-auto box-content"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          {product.imageUrls.length > 1 && (
            <CarouselPrevious className="absolute top-50% left-2 border-none bg-transparent " />
          )}
          {product.imageUrls.length > 1 && (
            <CarouselNext className="absolute top-50% right-2 border-none bg-transparent" />
          )}
        </Carousel>
      </div>
      <div className="flex justify-between items-center">
        <div>
          <small>{product.category.name}</small> /{" "}
          <small>{product.mark.name}</small>
        </div>
        <small>{product.reference}</small>
      </div>
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold">{product.name}</h1>
        <div className="min-h-[75px] max-h-[100px] bg-gray-200 p-1 rounded-md">
          <p className="text-md">{product.description}</p>
        </div>
        <h2 className="text-2xl font-bold my-2">
          R${" "}
          {product.price ? product.price.toFixed(2).replace(".", ",") : "0,00"}
          <small className="text-sm font-normal pl-1">à vista</small>
        </h2>
        <div className="flex flex-row gap-2 ">
          <Link href={(`/product/${product.id}/edit`)}>
            <Button className="flex gap-1 px-4 font-normal">
              <Pencil size={20} className="stroke-1" />
              Editar
            </Button>
          </Link>
          <Button className="flex gap-1 px-4 font-normal" variant="outline">
            <Archive size={20} className="stroke-1" />
            Arquivar
          </Button>
          <Button className="flex gap-1 px-4 font-normal" variant="destructive">
            <Trash2 size={20} className="stroke-1" />
            Excluir
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
