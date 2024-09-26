"use client";
import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { Label } from "@/app/_components/ui/label";
import { useState } from "react";
import toast from "react-hot-toast";

interface NewMarkProps {
  refreshMarks: () => void;
  closeDialog: () => void;
}

export default function NewMark({ refreshMarks, closeDialog }: NewMarkProps) {
  const [formMark, setFormMark] = useState({
    name: "",
  });

  const handleInputMark = (e: { target: { id: string; value: string } }) => {
    const { id, value } = e.target;
    setFormMark((prev) => ({ ...prev, [id]: value }));
  };

  const submitFormMark = async () => {
    try {
      const response = await fetch("/api/marks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formMark),
      });

      if (response.ok) {
        toast.success("Marca criada com sucesso!");
        setFormMark({ name: "" }); // Limpa o campo após a criação
        refreshMarks(); // Recarrega as marcas
        closeDialog(); // Fecha o Dialog após a criação
      } else {
        alert("Erro ao criar a marca");
      }
    } catch (error) {
      console.error("Erro ao criar marca:", error);
      alert("Erro ao criar marca. Tente novamente.");
    }
  };

  return (
    <>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="px-2 flex flex-col gap-2"
      >
        <Label htmlFor="name">Nova marca</Label>
        <Input
          type="text"
          placeholder="Digite uma nova marca"
          onChange={handleInputMark}
          id="name"
          value={formMark.name}
        />
        <Button className="max-w-20" onClick={submitFormMark}>
          Criar
        </Button>
      </form>
    </>
  );
}
