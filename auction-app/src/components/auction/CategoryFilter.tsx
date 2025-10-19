'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const categories = [
  { id: 'all', name: 'ทั้งหมด', count: 0 },
  { id: 'electronics', name: 'อิเล็กทรอนิกส์', count: 12 },
  { id: 'jewelry', name: 'เครื่องประดับ', count: 8 },
  { id: 'art', name: 'ศิลปะ', count: 15 },
  { id: 'antiques', name: 'ของเก่า', count: 6 },
  { id: 'fashion', name: 'แฟชั่น', count: 20 },
  { id: 'home', name: 'ของใช้ในบ้าน', count: 18 },
  { id: 'sports', name: 'กีฬา', count: 10 },
  { id: 'books', name: 'หนังสือ', count: 5 },
];

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">หมวดหมู่สินค้า</h3>
      <div className="space-y-2">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "ghost"}
            className="w-full justify-between"
            onClick={() => onCategoryChange(category.id)}
          >
            <span>{category.name}</span>
            <Badge variant="secondary" className="ml-2">
              {category.count}
            </Badge>
          </Button>
        ))}
      </div>
    </div>
  );
}
