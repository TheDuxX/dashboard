import { db } from "@/app/_lib/prisma";
import Item from "./item";

type category = {
  id: string;
  name: string;
};

type mark = {
  id: string;
  name: string;
};

type product = {
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
  mark: mark; // Corrigido para 'marks'
};

const MostViews = async () => {
  const product = await db.product.findMany({
    include: {
      category: true,
      mark: true,
    },
  });

  const sortedProducts = [...product]
    .sort((a, b) => (b.views || 0) - (a.views || 0));

  return (
    <>
      <h2 className="font-bold">Mais vistos</h2>
      <div className="rounded-md flex gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden">
        {sortedProducts.slice(0, 5).map((product) => (
            <Item key={product.id} product={product} />
        ))}
      </div>
    </>
  );
};

export default MostViews;
