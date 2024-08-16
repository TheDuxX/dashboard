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
import { useEffect, useRef, useState } from "react";
import { PlusIcon, XIcon } from "lucide-react";
import { db } from "@/app/_lib/prisma";
import Image from "next/image";

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
  price: z
    .number({ message: "Campo obrigatório" })
    .positive({ message: "Campo obrigatório." }),
});

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

interface Category {
  id: string;
  name: string;
}

interface Mark {
  id: string;
  name: string;
}

export function EditProductForm({ product }: EditProductFormPageProps) {
  {
    /* Buscar categorias e marcas */
  }
  const [categories, setCategories] = useState<Category[]>([]);
  const [marks, setMarks] = useState<Mark[]>([]);
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

  {
    /* Função para chamar o input file utilizando botão personalizado */
  }
  const imageInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      reference: "",
      images: [],
      price: undefined,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  const formattedPrice = `R$ ${(
    product.price as unknown as number
  ).toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

  return (
    <>
      <div className="flex flex-col justify-center items-center space-y-2">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col space-y-2 w-full"
          >
            {/* Imagens */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center justify-start gap-1 overflow-x-auto [&::-webkit-scrollbar]:hidden">
                      <input
                        type="file"
                        hidden
                        multiple
                        {...field}
                        ref={imageInputRef}
                      />
                      <Button
                        type="button"
                        onClick={() => imageInputRef.current?.click()}
                        className="min-w-28 min-h-28"
                        variant="dashed"
                      >
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
                    <Input type="text" placeholder={product.name} {...field} />
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
                    <Textarea
                      autoCorrect="on"
                      placeholder={product.description}
                      {...field}
                    />
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
                      <Input
                        type="number"
                        placeholder={product.price}
                        {...field}
                      />
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
                      <Input
                        type="text"
                        placeholder={product?.reference}
                        {...field}
                      />
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
                    <FormControl>
                      <Select {...form.register("category")}>
                        <SelectTrigger className="text-gray-500">
                          <SelectValue placeholder="Selecione uma categoria" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem value={category.id} key={category.id}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
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
                    <FormControl>
                      <Select {...form.register("category")}>
                        <SelectTrigger className="text-gray-500">
                          <SelectValue placeholder="Selecione uma categoria" />
                        </SelectTrigger>
                        <SelectContent>
                          {marks.map((mark) => (
                            <SelectItem value={mark.id} key={mark.id}>
                              {mark.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex gap-2 w-3/4 ">
              <Button type="submit" className="w-full">
                Criar produto
              </Button>
              <Button type="reset" className="w-full" variant="destructive">
                Limpar
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
}
