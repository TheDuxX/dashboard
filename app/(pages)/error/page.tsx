import NavHeader from "@/app/_components/nav-header";

export default function ErrorPage() {
  return (
    <div className="p-2">
      <NavHeader />
      <p className="text-center mt-[50%] text-primary">Desculpe, aconteceu algo de errado!</p>
    </div>
  );
}
