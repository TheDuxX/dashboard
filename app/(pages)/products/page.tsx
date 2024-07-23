import ProductList from "@/app/_components/list";
import NavHeader from "@/app/_components/nav-header";
import { db } from "@/app/_lib/prisma";

const Products = async () => {
  const products = await db.product.findMany({
    include: {
      Category: true,
      Mark: true,
    },
  });

  // Converta price de Decimal para number
  const convertedProducts = products.map(product => ({
    ...product,
    price: parseFloat(product.price.toFixed(2)) // Converte Decimal para number
  }));

  return (
    <div className="flex flex-col gap-2 ">
      <NavHeader />
      <ProductList product={convertedProducts}/>
    </div>
  );
};

export default Products;
