"use client";

import { Button } from "@/app/_components/ui/button";
import { Loader2, Trash2 } from "lucide-react";
import { useState } from "react";

interface ProductActionsProps {
  productId: string;
}

const DeleteProduct: React.FC<ProductActionsProps> = ({ productId }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/products/${productId}/delete`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Erro ao deletar o produto.");
      }

      // Atualiza o estado localmente após o sucesso
      alert(`Produto deletado com sucesso!`);
      window.location.href = "/products";
    } catch (error) {
      console.error("Erro ao deletar o produto:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Button
        className="flex gap-1 px-4 font-normal"
        variant="destructive"
        onClick={handleDelete} // Corrigido: agora chamamos a função
        disabled={isLoading} // Desabilitar o botão enquanto o loading está ativo
      >
        {isLoading ? (
          <Loader2 className="animate-spin" size={20} />
        ) : (
          <Trash2 size={20} />
        )}
        Deletar
      </Button>
    </div>
  );
};

export default DeleteProduct;
