import ProductList from "@/app/_components/list";
import NavHeader from "@/app/_components/nav-header";
import { db } from "@/app/_lib/prisma";

type category = {
  id: string;
  name: string;
};

type mark = {
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
  category: category; // Corrigido para 'categories'
  mark: mark; // Corrigido para 'marks'
};

const Products = async () => {
  const products = await db.product.findMany({
    include: {
      category: true,
      mark: true,
    },
  });

  // Converta price de Decimal para number
  const convertedProducts = products.map(product => ({
    ...product,
    price: parseFloat(product.price.toFixed(2)) // Converte Decimal para number
  }));

  return (
    <div className="flex flex-col gap-2 p-2">
      <NavHeader />
      <ProductList product={convertedProducts}/>
    </div>
  );
};

export default Products;
