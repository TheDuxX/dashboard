'use client';
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from "@/app/_components/ui/dialog";
import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";

export const NewCategoryDialog = ({ onAdd }: { onAdd: (name: string) => void }) => {
  const [name, setName] = useState("");

  const handleAdd = () => {
    onAdd(name);
    setName("");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mt-4">Nova Categoria</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Adicionar Nova Categoria</DialogTitle>
        <DialogDescription>
          Insira o nome da nova categoria abaixo.
        </DialogDescription>
        <Input type="text" placeholder="Nome da Categoria" value={name} onChange={(e) => setName(e.target.value)} />
        <DialogFooter>
          <Button onClick={handleAdd}>Adicionar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export const NewMarkDialog = ({ onAdd }: { onAdd: (name: string) => void }) => {
  const [name, setName] = useState("");

  const handleAdd = () => {
    onAdd(name);
    setName("");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mt-4">Nova Marca</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Adicionar Nova Marca</DialogTitle>
        <DialogDescription>
          Insira o nome da nova marca abaixo.
        </DialogDescription>
        <Input type="text" placeholder="Nome da Marca" value={name} onChange={(e) => setName(e.target.value)} />
        <DialogFooter>
          <Button onClick={handleAdd}>Adicionar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
