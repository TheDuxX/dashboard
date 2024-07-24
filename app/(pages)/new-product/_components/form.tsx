"use client";

import { ChangeEvent, useEffect, useRef, useState, useTransition } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/app/_components/ui/button";
import { Label } from "@/app/_components/ui/label";
import { Input } from "@/app/_components/ui/input";
import { convertBlobUrlToFile } from "@/app/_lib/utils";
import { uploadImage } from "@/supabase/storage/client";

interface Category {
  id: string;
  name: string;
}

interface Mark {
  id: string;
  name: string;
}

interface FormData {
  name: string;
  description: string;
  price: number;
  reference: string;
  category: string;
  mark: string;
  images: string[];
  views: number; // Certifique-se de que é 'views'
}

const Form = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [marks, setMarks] = useState<Mark[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    reference: "",
    category: "",
    mark: "",
    images: [] as string[], // Declare como string[]
    views: 0,
  });

  // Função para lidar com a mudança de entrada
  const handleInputChange = (e: { target: { id: any; value: any } }) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // Função para buscar categorias e marcas do banco de dados
  useEffect(() => {
    const fetchCategoriesAndMarks = async () => {
      try {
        const [categoriesResponse, marksResponse] = await Promise.all([
          fetch("/api/categories"),
          fetch("/api/marks"),
        ]);
        const [categoriesData, marksData] = await Promise.all([
          categoriesResponse.json(),
          marksResponse.json(),
        ]);
        setCategories(categoriesData);
        setMarks(marksData);
      } catch (error) {
        console.error("Erro ao buscar categorias e marcas:", error);
      }
    };
    fetchCategoriesAndMarks();
  }, []);

  const submitFormData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Ajuste aqui
      });

      if (response.ok) {
        const product = await response.json();
        router.push(`/product/${product.id}`);
      } else {
        alert("Erro ao criar o produto");
      }
    } catch (error) {
      console.error("Erro ao enviar o formulário:", error);
      alert("Erro ao enviar o formulário. Por favor, tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  // Funções para upload da imagem e criação das URLs
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const newImageUrls = filesArray.map((file) => URL.createObjectURL(file));
      setFiles([...files, ...filesArray]);
      setImageUrls([...imageUrls, ...newImageUrls]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    setImageUrls((prevUrls) => prevUrls.filter((_, i) => i !== index));
  };

  const [isPending, startTransition] = useTransition();

  const handleClickUploadImagesButton = async () => {
    startTransition(async () => {
      let urls = [];
      for (const url of imageUrls) {
        const imageFile = await convertBlobUrlToFile(url);

        const { imageUrl, error } = await uploadImage({
          file: imageFile,
          bucket: "tratorino-pics",
        });

        if (error) {
          console.error(error);
          return;
        }

        urls.push(imageUrl);
      }

      setFormData((prev) => ({ ...prev, images: urls }));
      setImageUrls([]);
      setFiles([]);
      submitFormData();
    });
  };

  return (
    <>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-col gap-3"
      >
        <div className="flex flex-col gap-2">
          <Label htmlFor="name">Nome do Produto</Label>
          <Input
            type="text"
            placeholder="Digite o nome do produto"
            id="name"
            value={formData.name}
            onChange={handleInputChange}
            autoComplete="false"
          />
        </div>
        {/* Descrição */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="description">Descrição</Label>
          <textarea
            id="description"
            placeholder="Descreva o produto"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            value={formData.description}
            onChange={handleInputChange}
          />
        </div>
        {/* Preço e referência */}
        <div className="flex gap-2">
          <div className="flex flex-col gap-2 w-full">
            <Label htmlFor="price">Preço</Label>
            <Input
              type="number"
              placeholder="Digite o preço do produto"
              id="price"
              value={formData.price}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <Label htmlFor="reference">Ref</Label>
            <Input
              type="text"
              placeholder="Digite a referência do produto"
              id="reference"
              value={formData.reference}
              onChange={handleInputChange}
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
              value={formData.category}
              onChange={handleInputChange}
            >
              <option value="">Selecione uma categoria</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <Label htmlFor="mark">Marca</Label>
            <select
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              id="mark"
              value={formData.mark}
              onChange={handleInputChange}
            >
              <option value="">Selecione uma marca</option>
              {marks.map((mark) => (
                <option key={mark.id} value={mark.id}>
                  {mark.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Imagens */}
        <div>
          <input
            type="file"
            multiple
            ref={imageInputRef}
            hidden
            onChange={handleImageChange}
            id="images"
            placeholder="images"
          />
          <Button type="button" onClick={() => imageInputRef.current?.click()}>
            Selecione as imagens
          </Button>
          <div className="flex gap-4 flex-wrap mt-4 max-h-64 overflow-y-auto">
            {imageUrls.map((url, index) => (
              <div key={index} className="relative">
                <Image
                  src={url}
                  width={100}
                  height={100}
                  alt={`img-${index}`}
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-2">
          <Button className="w-full" onClick={handleClickUploadImagesButton}>
            Salvar
          </Button>
          <Button
            type="button"
            className="w-full"
            variant="destructive"
            onClick={() => router.push("./products")}
          >
            Cancelar
          </Button>
        </div>
        {/* {isLoading && (
          <div className="flex justify-center items-center mt-4">
            <div className="relative w-[40px] h-[40px] animate-spin-slow">
              <Image src="/icon.png" alt="pneu" className="object-cover" fill />
            </div>
          </div>
        )} */}
      </form>
    </>
  );
};

export default Form;
