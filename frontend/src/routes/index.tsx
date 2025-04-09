import { createFileRoute } from "@tanstack/react-router";
import Categories from "../components/Categories";
import TopBooks from "../components/TopBooks";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="p-4 w-full flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Bienvenido a la Biblioteca</h1>
      <TopBooks />
      <Categories />
    </div>
  );
}
