import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Book } from "../../types/books";
import { fetchBookbyId } from "../../lib/services/books";

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

  useEffect(() => {
    getBook();
  }, []);

  return (
    <div>
      {book && <div>{book.titulo}</div>}
      {error && <div>Libro no encontrado</div>}
    </div>
  );
}
