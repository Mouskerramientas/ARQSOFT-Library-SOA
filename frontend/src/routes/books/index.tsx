import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { fetchBooks } from "../../lib/services/books";
import { Book } from "../../types/books";
import BookCard from "../../components/BookCard";

export const Route = createFileRoute("/books/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [books, setBooks] = useState<Book[]>([]);
  const [error, setError] = useState("");

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
    <div className="flex flex-col items-center gap-4 p-4">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
      {error && <div>{error}</div>}
    </div>
  );
}
