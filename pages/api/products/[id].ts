import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/app/_lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === "PUT") {
    const { name, description, reference, categoryId, markId, price, imageUrls } = req.body;

    try {
      const updatedProduct = await db.product.update({
        where: { id: String(id) },
        data: {
          name,
          description,
          reference,
          categoryId,
          markId,
          price,
          imageUrls,
        },
      });

      res.status(200).json(updatedProduct);
    } catch (error) {
      console.error("Erro ao atualizar o produto:", error);
      res.status(500).json({ error: "Erro ao atualizar o produto" });
    }
  } else {
    res.status(405).json({ error: "Método não permitido" });
  }
}
