import { EditProductForm } from "@/app/(pages)/test/_components/form";
import NavHeader from "@/app/_components/nav-header";
import { db } from "@/app/_lib/prisma";
import toast from "react-hot-toast";

interface EditProductPageProps {
  params: {
    id?: string;
  };
}

const EditProduct = async ({ params }: EditProductPageProps) => {
  if (!params.id) {
    return null;
  }

  const product = await db.product.findUnique({
    where: {
      id: params.id,
    },
    include: {
      category: true,
      mark: true,
    },
  });

  return (
    <div className="p-2 flex flex-col gap-2">
      {/* <NavHeader /> */}
      <EditProductForm product={product} />
    </div>
  );
};

export default EditProduct;
