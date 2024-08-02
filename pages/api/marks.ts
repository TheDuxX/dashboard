import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const marks = await prisma.mark.findMany();
      res.status(200).json(marks);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar marcas" });
    }
  } else if (req.method === "POST") {
    try {
      const { name } = req.body;

      if (!name) {
        return res.status(404).json({ error: "Nome da marca é obrigatório" });
      }

      const newMark = await prisma.mark.create({
        data: { name },
      });

      res.status(201).json(newMark);
    } catch (error) {
      res.status(500).json({ error: "Erro ao criar marca" });
    }
  } else {
    res.status(405).json({ error: "Método não permitido" });
  }
}
