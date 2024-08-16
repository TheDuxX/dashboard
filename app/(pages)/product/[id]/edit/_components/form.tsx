import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { Label } from "@/app/_components/ui/label";
import { db } from "@/app/_lib/prisma";
import { PlusIcon, XIcon } from "lucide-react";
import Image from "next/image";

interface EditProductFormPageProps {
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
  category: category; // Corrigido para 'categories'
  mark: mark;
}

type category = {
  id: string;
  name: string;
};

type mark = {
  id: string;
  name: string;
};

const EditProductForm = async ({ product }: EditProductFormPageProps) => {
 
  return (
    <>
      <form className="flex flex-col gap-2">
        {/* Imagens */}
        <div className="flex items-center justify-start gap-1 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          <input type="file" multiple hidden id="images" placeholder="images" />
          <Button type="button" className="min-w-28 min-h-28" variant="dashed">
            <PlusIcon className="text-border" />
          </Button>
          {product?.imageUrls.map((url, index) => (
            <div className="relative min-w-28 min-h-28">
              <Image
                key={index}
                src={url}
                alt={`Image ${index}`}
                fill
                className="object-cover rounded-md"
              />
              <Button
                type="button"
                variant="destructive"
                size="mini"
                // onClick={() => handleRemoveImage(index)}
                className="absolute top-1 right-1"
              >
                <XIcon />
              </Button>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="name">Nome do Produto</Label>
          <Input
            type="text"
            placeholder={product?.name}
            id="name"
            // value={formData.name}
            // onChange={handleInputChange}
            autoComplete="false"
          />
        </div>
        {/* Descrição */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="description">Descrição</Label>
          <textarea
            id="description"
            placeholder={product?.description}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            // value={formData.description}
            // onChange={handleInputChange}
          />
        </div>
        {/* Preço e referência */}
        <div className="flex gap-2">
          <div className="flex flex-col gap-2 w-full">
            <Label htmlFor="price">Preço</Label>
            <Input
              type="number"
              placeholder={product?.price}
              id="price"
              // value={formData.price}
              // onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <Label htmlFor="reference">Ref</Label>
            <Input
              type="text"
              placeholder={product?.reference}
              id="reference"
              // value={formData.reference}
              // onChange={handleInputChange}
            />
          </div>
        </div>
        {/* Categorias e Marcas */}
        <div className="flex gap-2">
          <div className="flex flex-col gap-2 w-full">
            <Label htmlFor="category">Categoria</Label>
            <select
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              id="category"
              // value={formData.category}
              // onChange={handleInputChange}
            >
              <option value="">{product?.category.name}</option>
              {/* Exemplo de iteração sobre categorias */}
              {/* {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))} */}
            </select>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <Label htmlFor="mark">Marca</Label>
            <select
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              id="mark"
              // value={formData.mark}
              // onChange={handleInputChange}
            >
              <option value="">{product?.mark.name}</option>
              {/* Exemplo de iteração sobre marcas */}
              {/* {marks.map((mark) => (
                <option key={mark.id} value={mark.id}>
                  {mark.name}
                </option>
              ))} */}
            </select>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            className="w-full"
            // onClick={handleSubmit}
          >
            Salvar
          </Button>
          <Button type="button" className="w-full" variant="destructive">
            Cancelar
          </Button>
        </div>
      </form>
    </>
  );
};

export default EditProductForm;
