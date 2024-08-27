"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/app/_components/ui/input";
import { Textarea } from "@/app/_components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import { Button } from "@/app/_components/ui/button";
import { ChangeEvent, useEffect, useRef, useState, useTransition } from "react";
import { PlusIcon, XIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { convertDecimalToNumber } from "@/app/_lib/utils";
import { uploadImage } from "@/supabase/storage/client";

const formSchema = z.object({
  name: z.string(),
  description: z.string(),
  reference: z.string(),
  category: z.string(),
  mark: z.string(),
  images: z
    .string()
    .array()
    .nonempty({ message: "Deve conter pelo menos uma imagem." }),
  price: z.number({ message: "Campo obrigatório" }),
});

interface EditProductFormPageProps {
  product: {
    id: string;
    name: string;
    description: string;
    reference: string;
    status: boolean;
    date: Date;
    price: Decimal | number;
    categoryId: string;
    markId: string;
    imageUrls: string[];
    views: number | null;
    category: Category;
    mark: Mark;
  };
}

type Category = {
  id: string;
  name: string;
};

type Mark = {
  id: string;
  name: string;
};

export function EditProductForm({ product }: EditProductFormPageProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [marks, setMarks] = useState<Mark[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>(product.imageUrls);
  const [files, setFiles] = useState<File[]>([]);
  const imageInputRef = useRef<HTMLInputElement>(null);

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

  const productPrice = convertDecimalToNumber(product.price);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: product.name,
      description: product.description,
      reference: product.reference,
      category: product.categoryId,
      mark: product.markId,
      images: product.imageUrls,
      price: productPrice,
    },
  });

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

  const submitFormData = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      const uploadedImageUrls = await Promise.all(
        files.map(async (file) => {
          const { imageUrl, error } = await uploadImage({
            file,
            bucket: "tratorino-pics",
          });

          if (error) {
            throw new Error("Erro ao fazer upload da imagem.");
          }

          return imageUrl;
        })
      );

      const updatedValues = {
        ...values,
        images: [...imageUrls, ...uploadedImageUrls],
      };

      const response = await fetch(`/api/products/${product.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedValues),
      });

      if (response.ok) {
        const updatedProduct = await response.json();
        router.push(`/product/${updatedProduct.id}`);
      } else {
        alert("Erro ao atualizar o produto");
      }
    } catch (error) {
      console.error("Erro ao enviar o formulário:", error);
      alert("Erro ao enviar o formulário. Por favor, tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center space-y-2">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(submitFormData)}
            className="flex flex-col space-y-2 w-full"
          >
            {/* Imagens */}
            <FormField
              control={form.control}
              name="images"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center justify-start gap-1 overflow-x-auto [&::-webkit-scrollbar]:hidden">
                      <input
                        type="file"
                        id="images"
                        hidden
                        multiple
                        ref={imageInputRef}
                        onChange={handleImageChange}
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
                        <div key={index} className="relative min-w-28 min-h-28">
                          <Image
                            src={url}
                            alt={`img-${index}`}
                            fill
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
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Nome */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do produto</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Descrição */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Preço e Referência */}
            <div className="flex gap-2">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preço</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="reference"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Referência</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Categoria e Marca */}
            <div className="flex gap-2">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Categoria</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a categoria" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="mark"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Marca</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a marca" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {marks.map((mark) => (
                          <SelectItem key={mark.id} value={mark.id}>
                            {mark.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" className="self-start min-w-28">
              {isLoading ? "Salvando..." : "Salvar"}
            </Button>
            <Button type="submit" className="self-start min-w-28">
              Cancelar
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}
