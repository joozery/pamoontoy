'use client';

import { AuctionItem } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star, Heart } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { formatPrice } from '@/lib/utils/timeUtils';
import RealTimeCountdown from './RealTimeCountdown';

interface FeaturedAuctionsProps {
  auctions: AuctionItem[];
  loading: boolean;
}

export default function FeaturedAuctions({ auctions, loading }: FeaturedAuctionsProps) {
  const featuredAuctions = auctions.slice(0, 4);

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary/10 rounded-xl">
              <Star className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              สินค้าแนะนำ
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-muted h-64 rounded-2xl mb-4"></div>
              <div className="space-y-3">
                <div className="bg-muted h-4 rounded w-3/4"></div>
                <div className="bg-muted h-4 rounded w-1/2"></div>
                <div className="bg-muted h-6 rounded w-1/3"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 bg-primary/10 rounded-lg">
            <Star className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
          </div>
          <h2 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            สินค้าแนะนำ
          </h2>
        </div>
        <Button variant="outline" size="sm" asChild className="group self-end sm:self-auto">
          <Link href="/">
            <span className="hidden sm:inline">ดูทั้งหมด</span>
            <span className="sm:hidden">ทั้งหมด</span>
            <ArrowRight className="h-3 w-3 ml-1 sm:ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {featuredAuctions.map((auction) => (
          <Link key={auction.id} href={`/auction/${auction.id}`} className="group">
            <div className="relative overflow-hidden rounded-lg sm:rounded-xl bg-white shadow-md hover:shadow-lg transition-all duration-300 transform group-hover:-translate-y-1 cursor-pointer">
              {/* Product Image */}
              <div className="relative h-40 sm:h-48 overflow-hidden">
                <Image
                  src={auction.imageUrl}
                  alt={auction.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Like Button */}
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  className="absolute top-2 right-2 p-1.5 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-red-500 hover:text-white transition-all duration-300 z-10"
                >
                  <Heart className="h-3 w-3" />
                </button>
                
                {/* Countdown Timer Overlay */}
                <div className="absolute bottom-2 left-2 right-2">
                  <div className="bg-white/95 backdrop-blur-sm rounded-lg px-2 py-1.5 shadow-md">
                    <div className="flex items-center justify-center">
                      <RealTimeCountdown endTime={auction.endTime} />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Product Info */}
              <div className="p-3 sm:p-4 space-y-2 sm:space-y-3">
                {/* Title */}
                <h3 className="text-sm sm:text-base font-semibold text-gray-900 line-clamp-2 group-hover:text-primary transition-colors">
                  {auction.title}
                </h3>
                
                {/* Description */}
                <p className="text-xs text-gray-600 line-clamp-2">
                  {auction.description}
                </p>
                
                {/* Price */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">ราคาปัจจุบัน</p>
                    <p className="text-base sm:text-lg font-bold text-primary">
                      {formatPrice(auction.currentPrice)}
                    </p>
                  </div>
                  
                  {/* Bid Button */}
                  <Button 
                    size="sm" 
                    className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 w-full sm:w-auto text-xs"
                    onClick={(e) => {
                      e.preventDefault();
                      window.location.href = `/auction/${auction.id}`;
                    }}
                  >
                    ประมูล
                  </Button>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
