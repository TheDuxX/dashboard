import { db } from "@/app/_lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === "PATCH") {
    try {
      const product = await db.product.update({
        where: { id: String(id) },
        data: {
          views: {
            increment: 1,
          },
        },
      });
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ error: "Erro ao atualizar visualizações do produto" });
    }
  } else {
    res.status(405).json({ error: "Método não permitido" });
  }
}
