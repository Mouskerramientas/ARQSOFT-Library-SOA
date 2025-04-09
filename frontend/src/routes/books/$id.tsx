import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Book } from "../../types/books";
import { fetchBookbyId } from "../../lib/services/books";
import Button from "../../components/Button";
import toast from "react-hot-toast";

export const Route = createFileRoute("/books/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();

  const [book, setBook] = useState<Book | undefined>();

  const [error, setError] = useState("");

  const getBook = async () => {
    try {
      const data = await fetchBookbyId(id);
      setBook(data);
    } catch (error) {
      setError("Error al cargar el libro");
      console.log("Error al cargar el libro", error);
    }
  };

  const handleByBook = () => {
    const toast_message = toast.loading("Comprando libro...");

    setTimeout(() => {
      toast.error("Error al comprar el libro", {
        id: toast_message,
      });
    }, 2000);
  };

  useEffect(() => {
    getBook();
  }, []);

  return (
    <div className="w-3xl h-full p-4">
      {book && (
        <div className="bg-white w-full h-full rounded-xl shadow-lg p-4 flex flex-row items-center">
          <img
            src={book.imageUrl}
            alt={book.titulo}
            className="w-1/2 h-full rounded-lg"
          />
          <div className="w-1/2 h-full flex flex-col items-center justify-center gap-4 p-4">
            <h1 className="text-2xl font-bold">{book.titulo}</h1>
            <p className="text-lg font-medium">{book.autor}</p>
            <p className="text-base font-light">$ {book.precio}</p>
            <Button onClick={handleByBook}>Comprar</Button>
          </div>
        </div>
      )}
      {error && <div>Libro no encontrado</div>}
    </div>
  );
}
