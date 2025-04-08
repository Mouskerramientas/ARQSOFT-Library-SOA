const categories = ["Ficción", "No Ficción", "Ciencia", "Historia", "Fantasía"];

export default function Categories() {
  return (
    <div className="categories">
      <h2 className="text-xl font-semibold mb-2">Categorías Disponibles</h2>
      <ul className="grid grid-cols-2 gap-4">
        {categories.map((category, index) => (
          <li key={index} className="p-4 border rounded shadow-sm text-center">
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
}
