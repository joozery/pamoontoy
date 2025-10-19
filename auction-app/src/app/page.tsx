'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';
import AuctionList from '@/components/auction/AuctionList';
import { useAuction } from '@/lib/hooks/useAuction';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter } from 'lucide-react';
import FeaturedAuctions from '@/components/auction/FeaturedAuctions';
import CategorySlider from '@/components/auction/CategorySlider';
import Footer from '@/components/layout/Footer';

export default function Home() {
  const { auctions, loading } = useAuction();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  const filteredAuctions = auctions.filter(auction => {
    const matchesSearch = auction.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         auction.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const sortedAuctions = [...filteredAuctions].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return b.createdAt.getTime() - a.createdAt.getTime();
      case 'oldest':
        return a.createdAt.getTime() - b.createdAt.getTime();
      case 'price-high':
        return b.currentPrice - a.currentPrice;
      case 'price-low':
        return a.currentPrice - b.currentPrice;
      case 'ending-soon':
        return a.endTime.getTime() - b.endTime.getTime();
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 sm:px-6 py-4 sm:py-6">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/5 rounded-lg sm:rounded-2xl p-3 sm:p-6 lg:p-8 mb-4 sm:mb-8">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="relative text-center">
                    <h1 className="text-xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-2 sm:mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                      ยินดีต้อนรับสู่ <span className="text-primary">Pamoon TOY</span>
                    </h1>
                    <p className="text-xs sm:text-base lg:text-lg text-muted-foreground mb-2 sm:mb-4 max-w-3xl mx-auto leading-relaxed px-2">
                      ศูนย์รวมของเล่น ของสะสม และสินค้าหายากจากญี่ปุ่น
                    </p>
                    <p className="text-[10px] sm:text-sm lg:text-base text-muted-foreground mb-3 sm:mb-6 max-w-3xl mx-auto leading-relaxed px-2 hidden sm:block">
                      ไม่ว่าจะเป็นของเล่น ฟิกเกอร์ โมเดล ของวินเทจ โทรศัพท์มือถือ หรือของหายาก ทั้งมือหนึ่งและมือสองก็ลงได้!
                    </p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center max-w-full sm:max-w-md lg:max-w-lg mx-auto px-2">
              <div className="relative flex-1">
                <Search className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <Input
                  placeholder="ค้นหาของเล่น..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 sm:pl-9 h-8 sm:h-10 text-xs sm:text-sm border-2 focus:border-primary"
                />
              </div>
              <Button size="sm" className="h-8 sm:h-10 px-3 sm:px-6 text-xs sm:text-sm font-medium">
                <Search className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                ค้นหา
              </Button>
            </div>
          </div>
        </div>

        {/* Category Slider */}
        <div className="mb-8 sm:mb-10">
          <CategorySlider />
        </div>

        {/* Featured Auctions */}
        <FeaturedAuctions auctions={auctions} loading={loading} />

        {/* All Auctions Section */}
        <div className="mt-8 sm:mt-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-3 sm:gap-0">
            <h2 className="text-lg sm:text-xl font-bold">สินค้าประมูลทั้งหมด</h2>
            <div className="text-xs sm:text-sm text-muted-foreground">
              พบ {filteredAuctions.length} รายการ
            </div>
          </div>

          <div className="space-y-3 sm:space-y-4">
              {/* Filters and Sort */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-3">
                <div className="flex items-center space-x-2">
                  <Filter className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="text-xs sm:text-sm font-medium">เรียงตาม:</span>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-32 h-8 text-xs sm:text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">ใหม่ล่าสุด</SelectItem>
                      <SelectItem value="oldest">เก่าที่สุด</SelectItem>
                      <SelectItem value="price-high">ราคาสูง-ต่ำ</SelectItem>
                      <SelectItem value="price-low">ราคาต่ำ-สูง</SelectItem>
                      <SelectItem value="ending-soon">ใกล้สิ้นสุด</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Auction List */}
              <AuctionList auctions={sortedAuctions} loading={loading} />
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-8 sm:mt-10">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              ความคิดเห็นจากลูกค้า
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto">
              ลูกค้าของเราพูดถึงประสบการณ์การประมูลสินค้าที่ Pamoon TOY
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Review 1 */}
            <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
              <div className="flex items-center mb-2 sm:mb-3">
                <div className="flex space-x-0.5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                    </svg>
                  ))}
                </div>
                <span className="text-xs text-gray-500 ml-1.5">5.0</span>
              </div>
              <p className="text-gray-700 mb-2 sm:mb-3 leading-relaxed text-xs sm:text-sm">
                &ldquo;ประมูลของเล่นญี่ปุ่นได้ในราคาที่ดีมาก! บริการดี ระบบใช้งานง่าย และสินค้าส่งมาถึงเร็วมาก&rdquo;
              </p>
              <div className="flex items-center">
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xs">
                  ส
                </div>
                <div className="ml-2">
                  <p className="font-semibold text-gray-900 text-xs sm:text-sm">สมชาย ใจดี</p>
                  <p className="text-xs text-gray-500">นักสะสมของเล่น</p>
                </div>
              </div>
            </div>

            {/* Review 2 */}
            <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
              <div className="flex items-center mb-2 sm:mb-3">
                <div className="flex space-x-0.5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                    </svg>
                  ))}
                </div>
                <span className="text-xs text-gray-500 ml-1.5">5.0</span>
              </div>
              <p className="text-gray-700 mb-2 sm:mb-3 leading-relaxed text-xs sm:text-sm">
                &ldquo;ขายของสะสมได้ราคาดีมาก! ระบบประมูลโปร่งใส และลูกค้าสนใจสินค้าของเรามาก&rdquo;
              </p>
              <div className="flex items-center">
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-pink-500 to-rose-600 rounded-full flex items-center justify-center text-white font-bold text-xs">
                  น
                </div>
                <div className="ml-2">
                  <p className="font-semibold text-gray-900 text-xs sm:text-sm">นิดา สวยงาม</p>
                  <p className="text-xs text-gray-500">ผู้ขายสินค้า</p>
                </div>
              </div>
            </div>

            {/* Review 3 */}
            <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
              <div className="flex items-center mb-2 sm:mb-3">
                <div className="flex space-x-0.5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                    </svg>
                  ))}
                </div>
                <span className="text-xs text-gray-500 ml-1.5">5.0</span>
              </div>
              <p className="text-gray-700 mb-2 sm:mb-3 leading-relaxed text-xs sm:text-sm">
                &ldquo;เป็นแฟนของเล่นญี่ปุ่นมานาน พบของหายากที่นี่เยอะมาก! แนะนำเลยครับ&rdquo;
              </p>
              <div className="flex items-center">
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-xs">
                  ก
                </div>
                <div className="ml-2">
                  <p className="font-semibold text-gray-900 text-xs sm:text-sm">กิตติ เก่งมาก</p>
                  <p className="text-xs text-gray-500">นักสะสมฟิกเกอร์</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-6 sm:mt-8 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg sm:rounded-xl p-4 sm:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 text-center">
              <div>
                <div className="text-xl sm:text-2xl font-bold text-primary mb-1">4.9/5</div>
                <div className="text-xs text-muted-foreground">คะแนนเฉลี่ยจากลูกค้า</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-primary mb-1">1,200+</div>
                <div className="text-xs text-muted-foreground">ลูกค้าที่พึงพอใจ</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-primary mb-1">98%</div>
                <div className="text-xs text-muted-foreground">อัตราความสำเร็จ</div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}