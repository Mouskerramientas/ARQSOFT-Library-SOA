import { useNavigate } from "@tanstack/react-router";
import { Book } from "../types/books";

interface Props {
  book: Book;
}

const BookCard = ({ book }: Props) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate({ to: `/books/${book.id}` });
  };

  return (
    <div
      className="w-xl h-72 cursor-pointer p-4 gap-2 flex flex-row items-center bg-white rounded-md shadow-md hover:bg-gray-200/50 hover:scale-103 duration-500"
      onClick={handleClick}
    >
      <img
        src={book.imageUrl}
        alt={book.titulo}
        className="w-48 h-64 object-cover rounded-lg"
      />
      <div className="flex flex-col items-start justify-center gap-2 ml-4">
        <h2 className="text-xl font-bold">{book.titulo}</h2>
        <p className="text-gray-500">{book.autor}</p>
        <p className="text-gray-500">{book.genero}</p>
        <p className="text-gray-500">Precio: ${book.precio}</p>
        <p className="text-gray-500">Stock: {book.stock}</p>
      </div>
    </div>
  );
};

export default BookCard;
