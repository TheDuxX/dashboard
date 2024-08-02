"use client";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
} from "@/app/_components/ui/select";
import { Dialog, DialogContent } from "@/app/_components/ui/dialog";
import { useState } from "react";
import NewMark from "../configuration/_components/new-mark";
import Form from "./_components/form";

const TestPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleBrandChange = (value: string) => {
    if (value === "new") {
      setIsDialogOpen(true);
    }
  };

  return (
    <>
      <div className="p-2">
        <label htmlFor="brand-select">Selecione uma marca:</label>
        <Select onValueChange={handleBrandChange}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione uma marca" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="test">Teste</SelectItem>
            <SelectItem value="new">Nova marca</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Form />

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="w-[90%] p-2 py-4 rounded-md">
          <NewMark />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TestPage;
