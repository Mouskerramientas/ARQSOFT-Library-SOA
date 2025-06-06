import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Book } from "../types/books";
import { useNavigate } from "@tanstack/react-router";

interface Props {
  books: Book[];
}

export default function OtherCarousel({ books }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const navigate = useNavigate();

  // Limitar a 5 libros
  books = books.slice(0, 5);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === books.length - 1 ? 0 : prevIndex + 1
    );
  }, [books.length]);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? books.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <div className="relative w-md md:w-xl max-w-2xl mx-auto">
      {/* Contenedor principal */}
      <div className="relative h-132 overflow-hidden rounded-lg">
        {/* Imágenes */}
        {books.map((book, index) => (
          <div
            key={index}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 flex flex-col justify-center items-center ${
              index === currentIndex
                ? "opacity-100"
                : "opacity-0 pointer-events-none"
            }`}
          >
            <img
              src={book.imageUrl}
              alt={book.titulo}
              onClick={() => {
                navigate({ to: `/books/${book.id}` });
              }}
              className="mt-4 object-cover w-72 h-128 rounded-md shadow-lg hover:scale-102 cursor-pointer duration-300"
            />
            <h1 className="font-bold text-center mt-2">{book.titulo}</h1>
            <h1 className="text-center mb-8">{book.autor}</h1>
          </div>
        ))}
      </div>

      {/* Botones de navegación */}
      <button
        onClick={prevSlide}
        className="cursor-pointer absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full text-white hover:bg-opacity-75"
        aria-label="Anterior"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={nextSlide}
        className="cursor-pointer absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full text-white hover:bg-opacity-75"
        aria-label="Siguiente"
      >
        <ChevronRight size={24} />
      </button>

      {/* Indicadores */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex space-x-2">
        {books.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`cursor-pointer w-3 h-3 rounded-full shadow-sm ${
              index === currentIndex
                ? "bg-neutral-900"
                : "bg-neutral-300 bg-opacity-50"
            }`}
            aria-label={`Ir a la diapositiva ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
