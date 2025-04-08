import { createFileRoute } from "@tanstack/react-router";
import Carousel from "../components/Carousel";
import Categories from "../components/Categories";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="p-4 w-full flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Bienvenido a la Biblioteca</h1>
      <h2 className="text-xl font-semibold mb-2">Libros más leídos</h2>
      <Carousel />
      <Categories />
    </div>
  );
}
