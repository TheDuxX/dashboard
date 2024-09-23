// /api/products/[id]/status.ts
import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/app/_lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === "PATCH") {
    const { status } = req.body;

    try {
      const updatedProduct = await db.product.update({
        where: { id: String(id) },
        data: { status: Boolean(status) },
      });

      res.status(200).json(updatedProduct);
    } catch (error) {
      console.error("Erro ao atualizar o status do produto:", error);
      res.status(500).json({ error: "Erro ao atualizar o status do produto" });
    }
  } else {
    res.status(405).json({ error: "Método não permitido" });
  }
}
