// /api/products/[id]/delete.ts
import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/app/_lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === "DELETE") {
    try {
      await db.product.delete({
        where: { id: String(id) },
      });
      res.status(200).json({ message: "Produto excluído com sucesso" });
    } catch (error) {
      console.error("Erro ao deletar produto:", error);
      res.status(500).json({ error: "Erro ao deletar produto" });
    }
  } else {
    res.status(405).json({ error: "Método não permitido" });
  }
}
