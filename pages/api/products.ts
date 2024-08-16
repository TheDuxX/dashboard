import { NextApiRequest, NextApiResponse } from "next";
import { Prisma } from "@prisma/client";
import { db } from "@/app/_lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const products = await db.product.findMany();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar produtos" });
    }
  } else if (req.method === "POST") {
    const {
      name,
      description,
      price,
      reference,
      category,
      mark,
      images,
      views,
    } = req.body;

    try {
      const newProduct = await db.product.create({
        data: {
          name,
          description,
          price,
          reference,
          categoryId: category,
          markId: mark,
          imageUrls: images,
          date: new Date(),
          status: true,
          views,
        } as Prisma.ProductUncheckedCreateInput,
      });
      res.status(201).json(newProduct);
    } catch (error) {
      console.error("Erro ao criar produto:", error);
      res.status(500).json({ error: "Erro ao criar produto" });
    }
  } else {
    res.status(405).json({ error: "Método não permitido" });
  }
}
