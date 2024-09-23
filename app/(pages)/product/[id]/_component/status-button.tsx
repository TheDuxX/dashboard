"use client";

import { Button } from "@/app/_components/ui/button";
import { Archive, Loader2 } from "lucide-react";
import { useState } from "react";

interface ProductActionsProps {
  productId: string;
  status: boolean;
}

const StatusChange: React.FC<ProductActionsProps> = ({ productId, status }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(status);

  const handleToggleStatus = async (newStatus: boolean) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/products/${productId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error("Erro ao atualizar o status do produto.");
      }

      // Atualiza o estado localmente após o sucesso
      setCurrentStatus(newStatus);
      alert(`Produto ${newStatus ? "ativado" : "desativado"} com sucesso!`);
    } catch (error) {
      console.error("Erro ao alterar status do produto:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {currentStatus ? (
        <Button
          className="flex gap-1 px-4 font-normal"
          variant="outline"
          onClick={() => handleToggleStatus(false)}
          disabled={isLoading} // Desabilitar o botão enquanto o loading está ativo
        >
          {isLoading ? (
            <Loader2 className="animate-spin" size={20} />
          ) : (
            <Archive size={20} />
          )}
          Desativar
        </Button>
      ) : (
        <Button
          className="flex gap-1 px-4 font-normal"
          variant="outline"
          onClick={() => handleToggleStatus(true)}
          disabled={isLoading} // Desabilitar o botão enquanto o loading está ativo
        >
          {isLoading ? (
            <Loader2 className="animate-spin" size={20} />
          ) : (
            <Archive size={20} />
          )}
          Ativar
        </Button>
      )}
    </div>
  );
};

export default StatusChange;
