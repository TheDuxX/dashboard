"use client";
import { useState } from "react";
import { db } from "../_lib/prisma";
import Item from "./item";
import { Button } from "./ui/button";
import { Columns, FilterIcon, Rows } from "lucide-react";

interface ProductListProps {
  product: {
    id: string;
    name: string;
    description: string;
    reference: string;
    status: boolean;
    date: Date;
    price: number;
    categoryId: string;
    markId: string;
    imageUrls: string[];
    views: number | null;
    category: {
      id: string;
      name: string;
    };
    mark: {
      id: string;
      name: string;
    };
  }[];
}

const ProductList = ({ product }: ProductListProps) => {
  const [itemOrientation, setItemOrientation] = useState(false); // Salva o valor da orientação
  const [itemCount, setItemCount] = useState(10); // Estado para armazenar o valor selecionado de quantidade de produtos mostrados
  const [sortOrder, setSortOrder] = useState("ascending"); // Salva a ordenação da lista de produtos

  // Altera o valor da orientação
  const toggleOrientation = () => {
    setItemOrientation(!itemOrientation);
  };

  // Função para lidar com a mudança de seleção de valor de quantidade de produtos mostrados
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setItemCount(parseInt(event.target.value));
  };

  //Função para alterar a opção de ordenação da lista de produtos
  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(event.target.value);
  };

  const sortedProducts = [...product].sort((a, b) => {
    if (sortOrder === "ascending") {
      return a.price - b.price;
    } else if (sortOrder === "descending") {
      return b.price - a.price;
    } else if (sortOrder === "alphabetical") {
      return a.name.localeCompare(b.name);
    }
    return 0;
  });

  return (
    <div className="flex flex-col gap-2 ">
      <div className="flex justify-between gap-1 text-sm">
        <select
          onChange={handleSortChange}
          value={sortOrder}
          className="rounded-md border border-solid px-1"
        >
          <option value="ascending">Preço: Crescente</option>
          <option value="descending">Preço: Decrescente</option>
          <option value="alphabetical">Ordem alfabética</option>
        </select>
        <select
          onChange={handleSelectChange}
          value={itemCount}
          className="px-2 rounded-md border border-solid"
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
        <div className="flex items-center px-2 rounded-md border border-solid bg-white">
          <FilterIcon size={18} className="fill-primary stroke-none" />
          Filtros
        </div>
        <Button
          onClick={toggleOrientation}
          className="m-0 px-2"
          variant="outline"
        >
          {itemOrientation ? <Columns /> : <Rows />}
        </Button>
      </div>
      <div className={`grid ${itemOrientation ? "grid-cols-1" : "grid-cols-2"} gap-4`}>
        {sortedProducts.slice(0, itemCount).map((product) => (
          <Item key={product.id} product={product} itemOrientation={itemOrientation} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
