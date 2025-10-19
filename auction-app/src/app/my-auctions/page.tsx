'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';
import { useAuction } from '@/lib/hooks/useAuction';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Eye, Edit, MoreHorizontal, Clock } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { AuctionItem } from '@/lib/types';
import { formatPrice, getAuctionStatus } from '@/lib/utils/timeUtils';
import StaticTimeLeft from '@/components/auction/StaticTimeLeft';
import Footer from '@/components/layout/Footer';

export default function MyAuctionsPage() {
  const { auctions } = useAuction();
  const [activeTab, setActiveTab] = useState('selling');

  // Mock data for user's auctions
  const myAuctions: AuctionItem[] = auctions.filter(auction => 
    auction.seller.id === 'current-user'
  );

  const myBids: AuctionItem[] = auctions.filter(auction => 
    auction.bids.some(bid => bid.bidder.id === 'current-user')
  );


  const AuctionCard = ({ auction, showActions = false }: { auction: AuctionItem; showActions?: boolean }) => (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <Image
          src={auction.imageUrl}
          alt={auction.title}
          width={400}
          height={200}
          className="w-full h-48 object-cover"
        />
        <Badge 
          className="absolute top-2 left-2" 
          variant={getAuctionStatus(auction) === 'active' ? 'default' : 'secondary'}
        >
          {getAuctionStatus(auction) === 'active' ? 'กำลังประมูล' : 'สิ้นสุดแล้ว'}
        </Badge>
        {showActions && (
          <div className="absolute top-2 right-2 flex space-x-1">
            <Button size="sm" variant="outline" className="h-8 w-8 p-0">
              <Edit className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="outline" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
      
      <CardHeader className="pb-2">
        <h3 className="font-semibold text-lg line-clamp-2">{auction.title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{auction.description}</p>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">ราคาปัจจุบัน</span>
            <span className="text-lg font-bold text-primary">{formatPrice(auction.currentPrice)}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">จำนวนผู้ประมูล</span>
            <div className="flex items-center space-x-1">
              <Users className="h-4 w-4" />
              <span className="text-sm font-medium">{auction.bids.length}</span>
            </div>
          </div>

          {getAuctionStatus(auction) === 'active' && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">เวลาที่เหลือ</span>
              <StaticTimeLeft endTime={auction.endTime} />
            </div>
          )}

          <div className="pt-2">
            <Button asChild className="w-full">
              <Link href={`/auction/${auction.id}`}>
                <Eye className="h-4 w-4 mr-2" />
                ดูรายละเอียด
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">การประมูลของฉัน</h1>
            <p className="text-muted-foreground">
              จัดการสินค้าที่ขายและการประมูลที่เข้าร่วม
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="selling">สินค้าที่ขาย ({myAuctions.length})</TabsTrigger>
              <TabsTrigger value="bidding">การประมูลที่เข้าร่วม ({myBids.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="selling" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">สินค้าที่ขาย</h2>
                <Button asChild>
                  <Link href="/create">
                    เพิ่มสินค้าใหม่
                  </Link>
                </Button>
              </div>

              {myAuctions.length === 0 ? (
                <Card>
                  <CardContent className="text-center py-12">
                    <div className="text-muted-foreground mb-4">
                      <Users className="h-12 w-12 mx-auto mb-4" />
                      <p className="text-lg">ยังไม่มีสินค้าที่ขาย</p>
                      <p className="text-sm">เริ่มต้นขายสินค้าของคุณได้เลย</p>
                    </div>
                    <Button asChild>
                      <Link href="/create">
                        สร้างการประมูลใหม่
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {myAuctions.map((auction) => (
                    <AuctionCard key={auction.id} auction={auction} showActions={true} />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="bidding" className="space-y-6">
              <h2 className="text-xl font-semibold">การประมูลที่เข้าร่วม</h2>

              {myBids.length === 0 ? (
                <Card>
                  <CardContent className="text-center py-12">
                    <div className="text-muted-foreground mb-4">
                      <Clock className="h-12 w-12 mx-auto mb-4" />
                      <p className="text-lg">ยังไม่มีการประมูลที่เข้าร่วม</p>
                      <p className="text-sm">เริ่มต้นประมูลสินค้าที่คุณสนใจ</p>
                    </div>
                    <Button asChild>
                      <Link href="/">
                        ดูสินค้าประมูล
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {myBids.map((auction) => {
                    const myBid = auction.bids.find(bid => bid.bidder.id === 'current-user');
                    const isHighestBid = myBid && myBid.amount === auction.currentPrice;
                    
                    return (
                      <div key={auction.id} className="relative">
                        <AuctionCard auction={auction} />
                        {myBid && (
                          <div className="absolute top-2 right-2">
                            <Badge variant={isHighestBid ? "default" : "outline"}>
                              {isHighestBid ? 'สูงสุด' : 'ไม่สูงสุด'}
                            </Badge>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
