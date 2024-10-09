"use client";
import { Button } from "@/app/_components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableRow,
} from "@/app/_components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/_components/ui/tabs";
import { FindManyCategories, FindManyMark } from "@/app/_lib/utils";
import { Pen, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";

type Category = { id: string; name: string };
type Mark = { id: string; name: string };

const FiltersConfig = () => {
  const [categories, setCategories] = useState<Category[]>([]); // Definir o tipo
  const [marks, setMarks] = useState<Mark[]>([]); // Definir o tipo
  const [editingCategory, setEditingCategory] = useState<string | null>(null); // Pode ser string ou null
  const [editingMark, setEditingMark] = useState<string | null>(null);
  const [newName, setNewName] = useState<string>("");

  // Função para buscar categorias do banco de dados
  const fetchCategories = async () => {
    try {
      const categoriesResponse = await fetch("/api/categories");
      const categoriesData = await categoriesResponse.json();
      setCategories(categoriesData);
    } catch (error) {
      console.error("Erro ao buscar categorias:", error);
    }
  };

  // Função para buscar marcas do banco de dados
  const fetchMarks = async () => {
    try {
      const marksResponse = await fetch("/api/marks");
      const marksData = await marksResponse.json();
      setMarks(marksData);
    } catch (error) {
      console.error("Erro ao buscar marcas:", error);
    }
  };
  // Função para buscar categorias e marcas do banco de dados
  const fetchCategoriesAndMarks = async () => {
    try {
      // Usando Promise.all para buscar categorias e marcas simultaneamente
      const [categoriesData, marksData] = await Promise.all([
        fetchCategories(),
        fetchMarks(),
      ]);
    } catch (error) {
      console.error("Erro ao buscar categorias e marcas:", error);
    }
  };

  useEffect(() => {
    fetchCategoriesAndMarks();
  }, []);

  const handleEdit = async (id: any, name: any, type: any) => {
    try {
      const response = await fetch(`/api/${type}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });
      if (response.ok) {
        // Atualizar a lista de categorias ou marcas após a edição
        const updatedData =
          type === "category"
            ? await FindManyCategories()
            : await FindManyMark();
        if (type === "category") {
          setCategories(updatedData);
        } else {
          setMarks(updatedData);
        }
      } else {
        console.error("Erro ao editar", type);
      }
    } catch (error) {
      console.error("Erro ao editar:", error);
    }
  };

  const handleDelete = async (id: any, type: any) => {
    try {
      const response = await fetch(`/api/${type}/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        // Atualizar a lista de categorias ou marcas após a exclusão
        const updatedData =
          type === "category"
            ? await FindManyCategories()
            : await FindManyMark();
        if (type === "category") {
          setCategories(updatedData);
        } else {
          setMarks(updatedData);
        }
      } else {
        console.error("Erro ao deletar", type);
      }
    } catch (error) {
      console.error("Erro ao deletar:", error);
    }
  };

  return (
    <div className="w-full">
      <Tabs defaultValue="category" className="w-full space-y-0">
        <TabsList className="grid w-full grid-cols-2 m-0 p-0 space-x-1">
          <TabsTrigger
            value="category"
            className="rounded-lg rounded-b-none data-[state=inactive]:border-[1px]"
          >
            Categorias
          </TabsTrigger>
          <TabsTrigger
            value="mark"
            className="rounded-lg rounded-b-none data-[state=inactive]:border-[1px]"
          >
            Marcas
          </TabsTrigger>
        </TabsList>

        {/* Conteúdo das Categorias */}
        <TabsContent
          value="category"
          className="bg-white shadow rounded-b-lg p-2"
        >
          <div className="max-h-[400px] overflow-y-auto">
            <Table>
              <TableCaption>Lista das categorias</TableCaption>
              <TableBody>
                {categories.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell className="flex flex-row justify-between items-center">
                      {editingCategory === category.id ? (
                        <input
                          value={newName}
                          onChange={(e) => setNewName(e.target.value)}
                          placeholder="Novo nome"
                          className="border p-1"
                        />
                      ) : (
                        <p>{category.name}</p>
                      )}
                      <div className="flex flex-row gap-4">
                        <Button
                          variant="ghost"
                          size="mini"
                          className="p-0"
                          onClick={() => {
                            if (editingCategory === category.id) {
                              handleEdit(category.id, newName, "category");
                              setEditingCategory(null); // Fechar modo de edição
                            } else {
                              setEditingCategory(category.id); // Abrir modo de edição
                              setNewName(category.name); // Preencher com o nome atual
                            }
                          }}
                        >
                          <Pen size={16} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="mini"
                          className="p-0"
                          onClick={() => handleDelete(category.id, "category")}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        {/* Conteúdo das Marcas */}
        <TabsContent value="mark" className="bg-white shadow rounded-b-lg p-2">
          <div className="max-h-[400px] overflow-y-auto">
            <Table>
              <TableCaption>Lista das marcas</TableCaption>
              <TableBody>
                {marks.map((mark) => (
                  <TableRow key={mark.id}>
                    <TableCell className="flex flex-row justify-between items-center">
                      {editingMark === mark.id ? (
                        <input
                          value={newName}
                          onChange={(e) => setNewName(e.target.value)}
                          placeholder="Novo nome"
                          className="border p-1"
                        />
                      ) : (
                        <p>{mark.name}</p>
                      )}
                      <div className="flex flex-row gap-4">
                        <Button
                          variant="ghost"
                          size="mini"
                          className="p-0"
                          onClick={() => {
                            if (editingMark === mark.id) {
                              handleEdit(mark.id, newName, "mark");
                              setEditingMark(null); // Fechar modo de edição
                            } else {
                              setEditingMark(mark.id); // Abrir modo de edição
                              setNewName(mark.name); // Preencher com o nome atual
                            }
                          }}
                        >
                          <Pen size={16} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="mini"
                          className="p-0"
                          onClick={() => handleDelete(mark.id, "mark")}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FiltersConfig;
