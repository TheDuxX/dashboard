import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const categories = await prisma.category.findMany();
      res.status(200).json(categories);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar categorias' });
    }
  } else if (req.method === 'POST') {
    try {
      const { name } = req.body;

      if (!name) {
        return res.status(400).json({ error: 'Nome da categoria é obrigatório' });
      }

      const newCategory = await prisma.category.create({
        data: { name },
      });

      res.status(201).json(newCategory);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar categoria' });
    }
  } else {
    res.status(405).json({ error: 'Método não permitido' });
  }
}
