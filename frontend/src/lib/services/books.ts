import { API_URL } from "../../config";
import { Book } from "../../types/books";

export const fetchBooks = async (): Promise<Book[]> => {
  const res = await fetch(`${API_URL}/libros`);
  if (!res.ok) throw new Error("Failed to fetch books");
  const data = await res.json();
  return data;
};

export const fetchBookbyId = async (id: string): Promise<Book> => {
  const res = await fetch(`${API_URL}/libros/${id}`);
  if (!res.ok) throw new Error("Failed to fetch book");
  const data = await res.json();
  return data;
};
