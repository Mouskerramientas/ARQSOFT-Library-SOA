import { createFileRoute, useNavigate } from "@tanstack/react-router";
import Categories from "../components/Categories";
import TopBooks from "../components/TopBooks";
import Button from "../components/Button";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate({ to: "/books" });
  };

  return (
    <div className="p-4 w-full flex flex-col items-center gap-8">
      <h1 className="text-2xl font-bold mb-4">Bienvenido a la Biblioteca</h1>
      <TopBooks />
      <Button onClick={handleClick}>Consulta el catálogo completo</Button>
      <Categories />
    </div>
  );
}
