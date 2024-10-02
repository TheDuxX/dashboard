import NavHeader from "@/app/_components/nav-header";
import { db } from "@/app/_lib/prisma";
import toast from "react-hot-toast";
import { EditProductForm } from "./_components/form";
import { FindUniqueProduct } from "@/app/_lib/utils";

interface EditProductPageProps {
  params: {
    id?: string;
  };
}

const EditProduct = async ({ params }: EditProductPageProps) => {
  if (!params.id) {
    return null;
  }

  const product = await FindUniqueProduct(params.id);

  return (
    <div className="p-2 flex flex-col gap-2">
      {/* <NavHeader /> */}
      <EditProductForm product={product} />
    </div>
  );
};

export default EditProduct;
