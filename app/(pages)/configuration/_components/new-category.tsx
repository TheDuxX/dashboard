"use client";
import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { Label } from "@/app/_components/ui/label";
import { useState } from "react";
import toast from "react-hot-toast";

export default function NewCategory() {
  const [formCategory, setFormCategory] = useState({
    name: "",
  });

  const handleInputCategory = (e: {
    target: { id: string; value: string };
  }) => {
    const { id, value } = e.target;
    setFormCategory((prev) => ({ ...prev, [id]: value }));
  };

  const submitFormCategory = async () => {
    try {
      const response = await fetch("/api/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formCategory),
      });

      if (response.ok) {
        const newCategory = await response.json();
        toast.success("Categoria criada com sucesso!");
        setFormCategory({ name: "" }); // Limpa o campo após a criação
      } else {
        alert("Erro ao criar o produto");
      }
    } catch (error) {
      console.error("Erro ao criar categoria:", error);
      alert("Erro ao criar categoria. Tente novamente.");
    }
  };

  return (
    <>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="px-2 flex flex-col gap-2"
      >
        <Label htmlFor="name">Nova categoria</Label>
        <Input
          type="text"
          placeholder="Digite uma nova categoria"
          onChange={handleInputCategory}
          id="name"
          value={formCategory.name}
        />
        <Button className="max-w-20" onClick={submitFormCategory}>
          Criar
        </Button>
      </form>
    </>
  );
}
