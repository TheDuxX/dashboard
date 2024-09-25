"use client";

import { ChangeEvent, useEffect, useRef, useState, useTransition } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/app/_components/ui/button";
import { Label } from "@/app/_components/ui/label";
import { Input } from "@/app/_components/ui/input";
import { convertBlobUrlToFile } from "@/app/_lib/utils";
import { uploadImage } from "@/supabase/storage/client";
import { PlusIcon, XIcon } from "lucide-react";

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
  views: number;
}

const CreateProductForm = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [marks, setMarks] = useState<Mark[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [imagesUploaded, setImagesUploaded] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    price: 0,
    reference: "",
    category: "",
    mark: "",
    images: [],
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
        body: JSON.stringify(formData),
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
      setImagesUploaded(true);
    });
  };

  useEffect(() => {
    if (imagesUploaded) {
      submitFormData();
      setImagesUploaded(false);
    }
  }, [imagesUploaded, formData.images]);

  return (
    <>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-col gap-2"
      >
        {/* Imagens */}
        <div className="flex items-center justify-start gap-1 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          <input
            type="file"
            multiple
            ref={imageInputRef}
            hidden
            onChange={handleImageChange}
            id="images"
            placeholder="images"
          />
          <Button
            type="button"
            onClick={() => imageInputRef.current?.click()}
            className="min-w-28 min-h-28"
            variant="dashed"
          >
            <PlusIcon className="text-border" />
          </Button>
          {imageUrls.map((url, index) => (
            <div key={index} className="relative min-w-28 aspect-square">
              <Image
                src={url}
                fill
                alt={`img-${index}`}
                className="object-cover rounded-md"
              />
              <Button
                type="button"
                variant="destructive"
                size="mini"
                onClick={() => handleRemoveImage(index)}
                className="absolute top-1 right-1"
              >
                <XIcon />
              </Button>
            </div>
          ))}
        </div>
        {/* Nome */}
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
        {/* Botão de enviar */}
        <div className="flex flex-row gap-2 w-full">
          <Button
            type="button"
            onClick={handleClickUploadImagesButton}
            isLoading={isLoading || isPending}
            disabled={files.length === 0}
            className="w-full"
          >
            Criar Produto
          </Button>
          <Button
            type="button"
            variant="destructive"
            className="w-full"
            onClick={() => router.back()}
          >
            <p>Cancelar</p>
          </Button>
        </div>
      </form>
    </>
  );
};

export default CreateProductForm;
