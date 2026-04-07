import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  gradient: string;
  buttonText: string;
  link: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: 'Spring Sale 2026',
    subtitle: 'Save up to 50% on selected items',
    gradient: 'from-blue-500 via-purple-500 to-pink-500',
    buttonText: 'Shop Now',
    link: '/products',
  },
  {
    id: 2,
    title: 'Electronics Mega Sale',
    subtitle: 'Latest gadgets at unbeatable prices',
    gradient: 'from-cyan-500 via-blue-600 to-indigo-700',
    buttonText: 'Explore Electronics',
    link: '/products/Electronics',
  },
  {
    id: 3,
    title: 'Fashion Forward',
    subtitle: 'New arrivals for the season',
    gradient: 'from-pink-500 via-rose-500 to-red-500',
    buttonText: 'View Collection',
    link: '/products/Fashion',
  },
];

export function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[450px] overflow-hidden bg-gray-900">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 bg-gradient-to-r ${slide.gradient} transition-opacity duration-500 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Hero Content */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white px-8">
              <h1 className="text-5xl font-bold mb-4 drop-shadow-lg">{slide.title}</h1>
              <p className="text-xl mb-6 drop-shadow-md">{slide.subtitle}</p>
              <Link
                to={slide.link}
                className="inline-block bg-white text-gray-900 px-8 py-3 rounded-md font-bold hover:bg-gray-100 transition shadow-lg"
              >
                {slide.buttonText}
              </Link>
            </div>
          </div>
        </div>
      ))}

      {/* Left Arrow */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-sm shadow-lg transition z-10"
      >
        <ChevronLeft className="w-8 h-8 text-gray-900" />
      </button>

      {/* Right Arrow */}
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-sm shadow-lg transition z-10"
      >
        <ChevronRight className="w-8 h-8 text-gray-900" />
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition ${
              index === currentSlide
                ? 'bg-white scale-110'
                : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>
    </div>
  );
}