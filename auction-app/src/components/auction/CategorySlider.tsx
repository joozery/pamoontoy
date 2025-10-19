'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  FaGamepad, 
  FaTv, 
  FaPencilAlt, 
  FaRing, 
  FaHome, 
  FaHamburger, 
  FaTshirt, 
  FaFutbol, 
  FaBook, 
  FaMusic,
  FaRobot,
  FaTheaterMasks,
  FaCubes,
  FaClock,
  FaMobileAlt,
  FaGem,
  FaBookOpen,
  FaUserTie
} from 'react-icons/fa';

interface Category {
  id: string;
  name: string;
  description: string;
  color: string;
}

const categories: Category[] = [
  {
    id: 'toys',
    name: 'ของเล่น',
    description: 'ของเล่นญี่ปุ่น',
    color: 'from-pink-500 to-rose-500'
  },
  {
    id: 'figures',
    name: 'ฟิกเกอร์',
    description: 'ฟิกเกอร์แอนิเมะ',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'models',
    name: 'โมเดล',
    description: 'โมเดลพลาสติก',
    color: 'from-green-500 to-emerald-500'
  },
  {
    id: 'vintage',
    name: 'ของวินเทจ',
    description: 'ของสะสมเก่า',
    color: 'from-amber-500 to-orange-500'
  },
  {
    id: 'electronics',
    name: 'อิเล็กทรอนิกส์',
    description: 'โทรศัพท์มือถือ',
    color: 'from-purple-500 to-violet-500'
  },
  {
    id: 'collectibles',
    name: 'ของสะสม',
    description: 'ของหายาก',
    color: 'from-indigo-500 to-blue-500'
  },
  {
    id: 'manga',
    name: 'มังงะ',
    description: 'การ์ตูนญี่ปุ่น',
    color: 'from-red-500 to-pink-500'
  },
  {
    id: 'cosplay',
    name: 'คอสเพลย์',
    description: 'เสื้อผ้าคอสเพลย์',
    color: 'from-teal-500 to-green-500'
  },
  {
    id: 'games',
    name: 'เกมส์',
    description: 'เกมคอนโซล',
    color: 'from-yellow-500 to-orange-500'
  },
  {
    id: 'anime',
    name: 'อนิเมะ',
    description: 'การ์ตูนญี่ปุ่น',
    color: 'from-cyan-500 to-blue-500'
  },
  {
    id: 'stationery',
    name: 'เครื่องเขียน',
    description: 'เครื่องเขียนญี่ปุ่น',
    color: 'from-emerald-500 to-teal-500'
  },
  {
    id: 'accessories',
    name: 'เครื่องประดับ',
    description: 'เครื่องประดับน่ารัก',
    color: 'from-rose-500 to-pink-500'
  },
  {
    id: 'home',
    name: 'ของใช้ในบ้าน',
    description: 'ของตกแต่งบ้าน',
    color: 'from-slate-500 to-gray-500'
  },
  {
    id: 'food',
    name: 'อาหารญี่ปุ่น',
    description: 'ขนมและอาหาร',
    color: 'from-orange-500 to-red-500'
  },
  {
    id: 'fashion',
    name: 'แฟชั่น',
    description: 'เสื้อผ้าและรองเท้า',
    color: 'from-violet-500 to-purple-500'
  },
  {
    id: 'sports',
    name: 'กีฬา',
    description: 'อุปกรณ์กีฬา',
    color: 'from-lime-500 to-green-500'
  },
  {
    id: 'books',
    name: 'หนังสือ',
    description: 'หนังสือและนิตยสาร',
    color: 'from-amber-500 to-yellow-500'
  },
  {
    id: 'music',
    name: 'เพลง',
    description: 'ซีดีและแผ่นเสียง',
    color: 'from-indigo-500 to-purple-500'
  }
];

const renderIcon = (id: string) => {
  const iconClass = "w-full h-full";
  switch (id) {
    case 'toys':
      return <FaRobot className={iconClass} />;
    case 'figures':
      return <FaTheaterMasks className={iconClass} />;
    case 'models':
      return <FaCubes className={iconClass} />;
    case 'vintage':
      return <FaClock className={iconClass} />;
    case 'electronics':
      return <FaMobileAlt className={iconClass} />;
    case 'collectibles':
      return <FaGem className={iconClass} />;
    case 'manga':
      return <FaBookOpen className={iconClass} />;
    case 'cosplay':
      return <FaUserTie className={iconClass} />;
    case 'games':
      return <FaGamepad className={iconClass} />;
    case 'anime':
      return <FaTv className={iconClass} />;
    case 'stationery':
      return <FaPencilAlt className={iconClass} />;
    case 'accessories':
      return <FaRing className={iconClass} />;
    case 'home':
      return <FaHome className={iconClass} />;
    case 'food':
      return <FaHamburger className={iconClass} />;
    case 'fashion':
      return <FaTshirt className={iconClass} />;
    case 'sports':
      return <FaFutbol className={iconClass} />;
    case 'books':
      return <FaBook className={iconClass} />;
    case 'music':
      return <FaMusic className={iconClass} />;
    default:
      return <FaRobot className={iconClass} />;
  }
};

export default function CategorySlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Responsive items per view
  const getItemsPerView = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 640) return 3; // Mobile: 3 items
      if (window.innerWidth < 1024) return 5; // Tablet: 5 items
      return 8; // Desktop: 8 items
    }
    return 8;
  };

  const [itemsPerView, setItemsPerView] = useState(getItemsPerView());

  // Update items per view on resize
  if (typeof window !== 'undefined') {
    window.addEventListener('resize', () => {
      setItemsPerView(getItemsPerView());
    });
  }

  const nextSlide = () => {
    setCurrentIndex((prev) => 
      prev + itemsPerView >= categories.length ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? Math.max(0, categories.length - itemsPerView) : prev - 1
    );
  };

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-3 sm:gap-0">
        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground">หมวดหมู่สินค้า</h2>
        <div className="flex space-x-2 self-end sm:self-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className="h-8 w-8 sm:h-9 sm:w-9 p-0 rounded-full hover:bg-primary hover:text-white transition-all duration-300"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={nextSlide}
            disabled={currentIndex + itemsPerView >= categories.length}
            className="h-8 w-8 sm:h-9 sm:w-9 p-0 rounded-full hover:bg-primary hover:text-white transition-all duration-300"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="relative overflow-hidden">
        <div 
          className="flex gap-2 sm:gap-3 lg:gap-4 transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView + (100 / itemsPerView) * 0.05)}%)` }}
        >
          {categories.map((category) => (
            <div
              key={category.id}
              className="flex-shrink-0"
              style={{ 
                width: `calc(${100 / itemsPerView}% - ${(itemsPerView - 1) * (0.5 / itemsPerView)}rem)` 
              }}
            >
              <div className="group cursor-pointer h-full">
                <div className={`bg-gradient-to-br ${category.color} rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-5 text-white text-center hover:shadow-xl transition-all duration-300 transform group-hover:scale-105 group-hover:-translate-y-1 h-full flex flex-col justify-center`}>
                  <div className="flex justify-center mb-2 sm:mb-3">
                    <div className="text-2xl sm:text-3xl lg:text-4xl">
                      {renderIcon(category.id)}
                    </div>
                  </div>
                  <h3 className="font-bold text-xs sm:text-sm lg:text-base mb-1 leading-tight">{category.name}</h3>
                  <p className="text-[10px] sm:text-xs opacity-90 hidden sm:block leading-tight">{category.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center mt-4 sm:mt-6 space-x-1.5 sm:space-x-2">
        {Array.from({ length: Math.ceil(categories.length / itemsPerView) }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index * itemsPerView)}
            className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all duration-300 ${
              Math.floor(currentIndex / itemsPerView) === index
                ? 'bg-primary w-6 sm:w-8'
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
