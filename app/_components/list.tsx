import { db } from "../_lib/prisma";
import Item from "./item";

const ProductList = async () => {
  const products = await db.product.findMany({
    include: {
      Category: true,
      Mark: true,
    },
  });

  // Convert Decimal to number
  const formattedProducts = products.map(product => ({
    ...product,
    price: product.price.toNumber(),  // Convert Decimal to number
  }));

  return (
    <div className="w-full min-h-[75px] bg-white rounded-md p-2 flex justify-between items-center shadow">
      {formattedProducts.map(product => (
        <Item key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
