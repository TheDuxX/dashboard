"use client";
import { FilterIcon } from "lucide-react";
import { useState } from "react";

const Filters = () => {
  const [itemCount, setItemCount] = useState(10);
  // Função para lidar com a mudança de seleção de valor de quantidade de produtos mostrados
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setItemCount(parseInt(event.target.value));
  };

  return (
    <div className="w-full min-h-[50px] flex justify-between items-center">
      <select
        onChange={handleSelectChange}
        value={itemCount}
        className="px-2 py-1 rounded-md border border-solid"
      >
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
      <div className="flex items-center px-2 py-1 rounded-md border border-solid bg-white">
        <FilterIcon size={18} className="fill-primary stroke-none" />
        Filtros
      </div>
    </div>
  );
};

export default Filters;
