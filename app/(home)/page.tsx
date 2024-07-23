import ProductList from "../_components/list";
import Header from "./_components/header";

export default function Home() {
  return (
    <>
      <div className="flex flex-col gap-2">
        <Header />
        <h2>Mais vistos</h2>
        <ProductList />
        
      </div>
    </>
  );
}
