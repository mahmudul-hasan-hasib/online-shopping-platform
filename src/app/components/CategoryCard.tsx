import { Link } from 'react-router-dom';

interface CategoryCardProps {
  title: string;
  imageUrl: string;
  label: string;
  category: string;
}

export function CategoryCard({ title, imageUrl, label, category }: CategoryCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-[400px] group cursor-pointer">
      <div className="p-5 flex flex-col h-full">
        <h3 className="text-xl font-bold mb-4 text-gray-900 group-hover:text-blue-600 transition">
          {title}
        </h3>
        <div className="relative mb-4 flex-1">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover rounded-md group-hover:scale-105 transition-transform duration-300"
          />
          <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
            {label}
          </span>
        </div>
        <Link
          to={`/products/${category}`}
          className="text-blue-600 hover:text-blue-800 hover:underline text-sm font-medium mt-auto block"
        >
          Shop now →
        </Link>
      </div>
    </div>
  );
}