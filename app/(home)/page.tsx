import Header from "./_components/header";
import MostViews from "./_components/Most-views";

export default function Home() {
  return (
    <>
      <div className="flex flex-col gap-2">
        <Header />
        <MostViews />
      </div>
    </>
  );
}
