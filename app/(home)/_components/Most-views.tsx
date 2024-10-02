import { FindManyProducts } from "@/app/_lib/utils";
import Item from "./item";

type Category = {
  id: string;
  name: string;
};

type Mark = {
  id: string;
  name: string;
};

type Product = {
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
  category: Category;
  mark: Mark;
};

const MostViews = async () => {
  const products = await FindManyProducts(); // Pegando os produtos do banco de dados

  const sortedProducts = [...products] // Agora usamos 'products', não 'product'
    .sort((a, b) => (b.views || 0) - (a.views || 0));

  return (
    <>
      <h2 className="font-semibold text-lg">Mais vistos</h2>
      <div className="rounded-md flex gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden">
        {sortedProducts.slice(0, 5).map((product) => (
          <Item key={product.id} product={product} />
        ))}
      </div>
    </>
  );
};

export default MostViews;
