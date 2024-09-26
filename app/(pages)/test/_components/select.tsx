"use client";
import { Button } from "@/app/_components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from "@/app/_components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import { Label } from "@/app/_components/ui/label";
import { useEffect, useState } from "react";
import NewCategory from "./new-category";

interface Category {
  id: string;
  name: string;
}

const SelectCategory = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Função para buscar categorias do banco de dados
  const fetchCategoriesAndMarks = async () => {
    try {
      const categoriesResponse = await fetch("/api/categories");
      const categoriesData = await categoriesResponse.json();
      setCategories(categoriesData);
    } catch (error) {
      console.error("Erro ao buscar categorias e marcas:", error);
    }
  };

  useEffect(() => {
    fetchCategoriesAndMarks();
  }, []);

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      <div>
        <Label>Categoria</Label>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Selecione uma opção" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-4 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
                <Button className="w-full">Nova categroia</Button>
              </DialogTrigger>
              <DialogContent className="w-[90%] rounded-md">
                <NewCategory
                  refreshCategories={fetchCategoriesAndMarks}
                  closeDialog={handleDialogClose}
                />
              </DialogContent>
            </Dialog>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label>Categoria</Label>
        <Select value={formData.mark} onChange={handleInputChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Selecione uma opção" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-4 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
                <Button className="w-full">Nova categroia</Button>
              </DialogTrigger>
              <DialogContent className="w-[90%] rounded-md">
                <NewCategory
                  refreshCategories={fetchCategoriesAndMarks}
                  closeDialog={handleDialogClose}
                />
              </DialogContent>
            </Dialog>
          </SelectContent>
        </Select>
      </div>
    </>
  );
};

export default SelectCategory;
