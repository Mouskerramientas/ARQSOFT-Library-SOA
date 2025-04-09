import { useEffect, useState } from "react";
import { Book } from "../types/books";
import { fetchBooks } from "../lib/services/books";
import OtherCarousel from "./OtherCarousel";

const TopBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);

  const getBooks = async () => {
    try {
      const data = await fetchBooks();
      console.log("Libros obtenidos", data);
      setBooks(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBooks();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Libros más leídos</h2>
      {/* {books.length >= 5 && <Carousel books={books} />} */}
      {books.length && <OtherCarousel books={books} />}
    </div>
  );
};

export default TopBooks;
