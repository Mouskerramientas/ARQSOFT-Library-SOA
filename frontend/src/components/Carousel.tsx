import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; // Import slick-carousel base styles
import "slick-carousel/slick/slick-theme.css"; // Import slick-carousel theme styles
import { Book } from "../types/books";

interface Props {
  books: Book[];
}

export default function Carousel({ books }: Props) {
  // Show only the first 5 books
  books = books.slice(0, 5);
  return (
    <div className="carousel mb-6 w-full">
      <Slider
        dots={true}
        infinite={true}
        speed={500}
        slidesToShow={5}
        slidesToScroll={1}
        responsive={[
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ]}
      >
        {books.map((book) => (
          <div
            key={book.id}
            className="px-2 flex flex-col items-center justify-center"
          >
            <div className="flex items-center justify-center h-full">
              <img
                src={book.imageUrl}
                alt={book.titulo}
                className="w-auto max-h-128 aspect-[3/4] object-cover rounded"
              />
            </div>
            <p className="text-center mt-2">{book.titulo}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
}
