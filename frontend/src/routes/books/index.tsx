import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { fetchBooks } from "../../lib/services/books";
import { Book } from "../../types/books";

export const Route = createFileRoute("/books/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [books, setBooks] = useState<Book[]>([]);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const getBooks = async () => {
    try {
      const data = await fetchBooks();
      setBooks(data);
    } catch (error) {
      setError("Error fetching books");
      console.error(error);
    }
  };

  useEffect(() => {
    getBooks();
  }, []);

  return (
    <div>
      {books.map((book) => (
        <div
          key={book.id}
          onClick={() => {
            navigate({ to: `/books/${book.id}` });
          }}
        >
          {book.titulo}
        </div>
      ))}
      {error && <div>{error}</div>}
    </div>
  );
}
