import { Decimal } from "@prisma/client/runtime/library";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { db } from "./prisma";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function convertBlobUrlToFile(blobUrl: string) {
  const response = await fetch(blobUrl);
  const blob = await response.blob();
  const fileName = Math.random().toString(36).slice(2, 9);
  const mimeType = blob.type || "application/octet-stream";
  const file = new File([blob], `${fileName}.${mimeType.split("/")[1]}`, {
    type: mimeType,
  });
  return file;
}

export const getErrorMessage = (
  error: unknown,
  defaultMessage: string = "Something went wrong"
) => {
  console.error(error);
  let errorMessage = defaultMessage;
  if (error instanceof Error && error.message.length < 100) {
    errorMessage = error.message;
  }
  return errorMessage;
};

export const convertDecimalToNumber = (decimal: Decimal): number => {
  return parseFloat(decimal.toString()); // Converter Decimal para string e depois para número
};

export const FindManyProducts = async (): Promise<any[]> => {
  const products = await db.product.findMany({
    include: {
      category: true,
      mark: true,
    },
  });
  return products; // Certifique-se de que está retornando os produtos
};

export const FindManyCategories = async () => {
  const categories = await db.category.findMany({});
  return categories;
};

export const FindManyMark = async () => {
  const marks = await db.mark.findMany({});
  return marks;
};

// Função para encontrar um produto específico com base no ID
export const FindUniqueProduct = async (id: string): Promise<any | null> => {
  const product = await db.product.findUnique({
    where: {
      id: id, // substitui params.id pelo parâmetro que a função recebe
    },
    include: {
      category: true,
      mark: true,
    },
  });

  return product; // Retorna o produto encontrado ou null se não existir
};
