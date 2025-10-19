'use client';

import { AuctionItem } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Users, MapPin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils/timeUtils';
import StaticTimeLeft from './StaticTimeLeft';

interface AuctionCardProps {
  auction: AuctionItem;
}

export default function AuctionCard({ auction }: AuctionCardProps) {

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group border-0 shadow-md hover:shadow-2xl">
      <div className="relative overflow-hidden">
        <Image
          src={auction.imageUrl}
          alt={auction.title}
          width={400}
          height={250}
          className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        <Badge 
          className="absolute top-3 left-3 font-medium" 
          variant={auction.isActive ? "default" : "secondary"}
        >
          {auction.category}
        </Badge>
        <Badge 
          className="absolute top-3 right-3 font-medium" 
          variant={auction.isActive ? "destructive" : "outline"}
        >
          {auction.isActive ? 'กำลังประมูล' : 'สิ้นสุดแล้ว'}
        </Badge>
      </div>
      
      <CardHeader className="pb-3">
        <h3 className="font-bold text-lg line-clamp-2 group-hover:text-primary transition-colors">{auction.title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">{auction.description}</p>
      </CardHeader>

      <CardContent className="pt-0 space-y-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground font-medium">ราคาเริ่มต้น</span>
            <span className="text-sm font-semibold">{formatPrice(auction.startingPrice)}</span>
          </div>
          
          <div className="flex items-center justify-between bg-primary/5 p-3 rounded-lg">
            <span className="text-sm text-muted-foreground font-medium">ราคาปัจจุบัน</span>
            <span className="text-xl font-bold text-primary">{formatPrice(auction.currentPrice)}</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">ผู้ประมูล</span>
              <div className="flex items-center space-x-1">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-semibold">{auction.bids.length}</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">เวลาที่เหลือ</span>
              <StaticTimeLeft endTime={auction.endTime} />
            </div>
          </div>

          <div className="flex items-center space-x-3 pt-2 border-t">
            <Avatar className="h-8 w-8 ring-2 ring-border">
              <AvatarImage src={auction.seller.avatar} alt={auction.seller.name} />
              <AvatarFallback className="text-xs">{auction.seller.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{auction.seller.name}</p>
              <p className="text-xs text-muted-foreground">ผู้ขาย</p>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-0">
        <div className="flex space-x-2 w-full">
          <Button asChild className="flex-1 h-11 font-medium" size="lg">
            <Link href={`/auction/${auction.id}`}>
              {auction.isActive ? 'ประมูลเลย' : 'ดูรายละเอียด'}
            </Link>
          </Button>
          <Button variant="outline" size="sm" className="h-11 w-11 p-0">
            <MapPin className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
