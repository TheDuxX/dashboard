import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    // Buscar categorias
    try {
      const categories = await prisma.category.findMany();
      res.status(200).json(categories);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar categorias" });
    }
  } else if (req.method === "POST") {
    // Criar nova categoria
    try {
      const { name } = req.body;

      if (!name) {
        return res
          .status(400)
          .json({ error: "Nome da categoria é obrigatório" });
      }

      const newCategory = await prisma.category.create({
        data: { name },
      });

      res.status(201).json(newCategory);
    } catch (error) {
      res.status(500).json({ error: "Erro ao criar categoria" });
    }
  } else if (req.method === "PUT") {
    // Editar categoria
    try {
      const { id, name } = req.body;

      if (!id || !name) {
        return res
          .status(400)
          .json({ error: "ID e nome da categoria são obrigatórios" });
      }

      const updatedCategory = await prisma.category.update({
        where: { id },
        data: { name },
      });

      res.status(200).json(updatedCategory);
    } catch (error) {
      res.status(500).json({ error: "Erro ao editar categoria" });
    }
  } else if (req.method === "DELETE") {
    // Excluir categoria
    try {
      const { id } = req.body;

      if (!id) {
        return res.status(400).json({ error: "ID da categoria é obrigatório" });
      }

      await prisma.category.delete({
        where: { id },
      });

      res.status(204).end(); // Retorna status 204 (No Content) quando excluído com sucesso
    } catch (error) {
      res.status(500).json({ error: "Erro ao excluir categoria" });
    }
  } else {
    res.status(405).json({ error: "Método não permitido" });
  }
}
