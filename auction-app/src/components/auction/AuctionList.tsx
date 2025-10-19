'use client';

import { AuctionItem } from '@/lib/types';
import AuctionCard from './AuctionCard';
import { Skeleton } from '@/components/ui/skeleton';

interface AuctionListProps {
  auctions: AuctionItem[];
  loading: boolean;
}

export default function AuctionList({ auctions, loading }: AuctionListProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-8 w-full" />
          </div>
        ))}
      </div>
    );
  }

  if (auctions.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-muted-foreground text-lg mb-4">
          ไม่พบสินค้าประมูล
        </div>
        <p className="text-muted-foreground">
          ลองค้นหาด้วยคำค้นหาอื่น หรือเพิ่มสินค้าประมูลใหม่
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {auctions.map((auction) => (
        <AuctionCard key={auction.id} auction={auction} />
      ))}
    </div>
  );
}
