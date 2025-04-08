import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; // Import slick-carousel base styles
import "slick-carousel/slick/slick-theme.css"; // Import slick-carousel theme styles

const books = [
  {
    id: 1,
    title: "Book 1",
    image:
      "https://marketplace.canva.com/EAFGf9027eM/1/0/1003w/canva-portada-libro-infantil-bosque-ilustrado-azul-P3McSjgOm1I.jpg",
  },
  {
    id: 2,
    title: "Book 2",
    image:
      "https://marketplace.canva.com/EAFGf9027eM/1/0/1003w/canva-portada-libro-infantil-bosque-ilustrado-azul-P3McSjgOm1I.jpg",
  },
  {
    id: 3,
    title: "Book 3",
    image:
      "https://marketplace.canva.com/EAFGf9027eM/1/0/1003w/canva-portada-libro-infantil-bosque-ilustrado-azul-P3McSjgOm1I.jpg",
  },
  {
    id: 4,
    title: "Book 4",
    image:
      "https://marketplace.canva.com/EAFGf9027eM/1/0/1003w/canva-portada-libro-infantil-bosque-ilustrado-azul-P3McSjgOm1I.jpg",
  },
  {
    id: 5,
    title: "Book 5",
    image:
      "https://marketplace.canva.com/EAFGf9027eM/1/0/1003w/canva-portada-libro-infantil-bosque-ilustrado-azul-P3McSjgOm1I.jpg",
  },
];

export default function Carousel() {
  return (
    <div className="carousel mb-6 w-full">
      <Slider
        dots={true}
        infinite={true}
        speed={500}
        slidesToShow={3}
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
                src={book.image}
                alt={book.title}
                className="w-auto max-h-128 aspect-[3/4] object-cover rounded"
              />
            </div>
            <p className="text-center mt-2">{book.title}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
}
