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

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[260px] sm:h-[320px] md:h-[400px] lg:h-[450px] overflow-hidden bg-gray-900">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 bg-gradient-to-r ${slide.gradient} transition-opacity duration-500 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white px-4 sm:px-8 max-w-2xl">
              <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 md:mb-4 drop-shadow-lg">
                {slide.title}
              </h1>
              <p className="text-sm sm:text-base md:text-xl mb-4 md:mb-6 drop-shadow-md">
                {slide.subtitle}
              </p>
              <Link
                to={slide.link}
                className="inline-block bg-white text-gray-900 px-5 sm:px-6 md:px-8 py-2.5 md:py-3 rounded-md font-bold hover:bg-gray-100 transition shadow-lg text-sm sm:text-base"
              >
                {slide.buttonText}
              </Link>
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={prevSlide}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-1.5 sm:p-2 rounded-sm shadow-lg transition z-10"
      >
        <ChevronLeft className="w-5 h-5 sm:w-8 sm:h-8 text-gray-900" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-1.5 sm:p-2 rounded-sm shadow-lg transition z-10"
      >
        <ChevronRight className="w-5 h-5 sm:w-8 sm:h-8 text-gray-900" />
      </button>

      <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition ${
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