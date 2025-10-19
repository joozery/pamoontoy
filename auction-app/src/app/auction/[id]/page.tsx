'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Header from '@/components/layout/Header';
import { useAuction } from '@/lib/hooks/useAuction';
import { AuctionItem } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Users, MapPin, Gavel, Heart, Share2, Eye, Clock, TrendingUp, Package, Shield, Truck, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';
import { formatPrice } from '@/lib/utils/timeUtils';
import RealTimeCountdown from '@/components/auction/RealTimeCountdown';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import Swal from 'sweetalert2';

export default function AuctionDetailPage() {
  const params = useParams();
  const { auctions, placeBid } = useAuction();
  const [auction, setAuction] = useState<AuctionItem | null>(null);
  const [bidAmount, setBidAmount] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  
  // Mock images for gallery
  const images = auction ? [
    auction.imageUrl,
    auction.imageUrl,
    auction.imageUrl,
    auction.imageUrl
  ] : [];

  useEffect(() => {
    const foundAuction = auctions.find(a => a.id === params.id);
    if (foundAuction) {
      setAuction(foundAuction);
      setBidAmount((foundAuction.currentPrice + 1000).toString());
    }
    setLoading(false);
  }, [auctions, params.id]);

  const handlePlaceBid = async () => {
    if (!auction || !bidAmount) {
      Swal.fire({
        icon: 'warning',
        title: 'กรุณากรอกราคาประมูล',
        text: 'โปรดระบุจำนวนเงินที่ต้องการประมูล',
        confirmButtonText: 'ตรวจสอบ',
        confirmButtonColor: '#3b82f6'
      });
      return;
    }
    
    const amount = parseInt(bidAmount);
    
    // Validation
    if (isNaN(amount)) {
      Swal.fire({
        icon: 'error',
        title: 'ข้อมูลไม่ถูกต้อง',
        text: 'กรุณากรอกตัวเลขที่ถูกต้อง',
        confirmButtonText: 'ตกลง',
        confirmButtonColor: '#3b82f6'
      });
      return;
    }
    
    if (amount <= auction.currentPrice) {
      Swal.fire({
        icon: 'warning',
        title: 'ราคาต่ำเกินไป',
        html: `ราคาประมูลต้องสูงกว่าราคาปัจจุบัน<br><strong>${formatPrice(auction.currentPrice)}</strong>`,
        confirmButtonText: 'เข้าใจแล้ว',
        confirmButtonColor: '#3b82f6'
      });
      return;
    }
    
    const minBid = auction.currentPrice + 1000;
    if (amount < minBid) {
      Swal.fire({
        icon: 'info',
        title: 'ราคาขั้นต่ำ',
        html: `ราคาประมูลขั้นต่ำคือ<br><strong>${formatPrice(minBid)}</strong>`,
        confirmButtonText: 'เข้าใจแล้ว',
        confirmButtonColor: '#3b82f6'
      });
      return;
    }

    // Confirm bid
    const result = await Swal.fire({
      icon: 'question',
      title: 'ยืนยันการประมูล',
      html: `คุณต้องการประมูลสินค้านี้ในราคา<br><strong class="text-2xl text-primary">${formatPrice(amount)}</strong><br><span class="text-sm text-gray-500">หรือไม่?</span>`,
      showCancelButton: true,
      confirmButtonText: 'ยืนยันประมูล',
      cancelButtonText: 'ยกเลิก',
      confirmButtonColor: '#3b82f6',
      cancelButtonColor: '#6b7280',
      reverseButtons: true
    });

    if (!result.isConfirmed) return;

    const bidder = {
      id: 'current-user',
      name: 'คุณ',
      email: 'user@example.com',
      createdAt: new Date()
    };

    // Place bid
    placeBid(auction.id, amount, bidder);
    
    // Update local state
    setAuction(prev => prev ? {
      ...prev,
      currentPrice: amount,
      bids: [...prev.bids, {
        id: `bid-${Date.now()}`,
        amount,
        bidder,
        timestamp: new Date(),
        auctionItemId: auction.id
      }]
    } : null);
    
    // Update bid amount for next bid
    setBidAmount((amount + 1000).toString());
    
    // Success message
    Swal.fire({
      icon: 'success',
      title: 'ประมูลสำเร็จ!',
      html: `คุณได้ประมูลสินค้านี้ในราคา<br><strong class="text-2xl text-green-600">${formatPrice(amount)}</strong>`,
      confirmButtonText: 'เยี่ยมเลย!',
      confirmButtonColor: '#10b981',
      timer: 3000,
      timerProgressBar: true
    });
  };


  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6">
          {/* Breadcrumb Skeleton */}
          <div className="mb-4">
            <Skeleton className="h-4 w-64" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Main Content Skeleton */}
            <div className="lg:col-span-2 space-y-4 sm:space-y-6">
              {/* Image Gallery Skeleton */}
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <Skeleton className="h-64 sm:h-96 w-full" />
                  <div className="p-3 sm:p-4 bg-gray-50">
                    <div className="grid grid-cols-4 gap-2">
                      {[...Array(4)].map((_, i) => (
                        <Skeleton key={i} className="h-16 sm:h-20 w-full" />
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Stats Bar Skeleton */}
              <div className="grid grid-cols-3 gap-3">
                {[...Array(3)].map((_, i) => (
                  <Card key={i}>
                    <CardContent className="p-3 sm:p-4">
                      <Skeleton className="h-6 w-full mb-2" />
                      <Skeleton className="h-3 w-16 mx-auto" />
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Description Skeleton */}
              <Card>
                <CardHeader>
                  <Skeleton className="h-8 w-3/4" />
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {[...Array(4)].map((_, i) => (
                      <div key={i}>
                        <Skeleton className="h-3 w-20 mb-1" />
                        <Skeleton className="h-4 w-32" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Bid History Skeleton */}
              <Card>
                <CardHeader>
                  <Skeleton className="h-6 w-48" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Skeleton className="h-8 w-8 rounded-full" />
                          <div>
                            <Skeleton className="h-4 w-24 mb-1" />
                            <Skeleton className="h-3 w-32" />
                          </div>
                        </div>
                        <Skeleton className="h-6 w-20" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar Skeleton */}
            <div className="space-y-4 sm:space-y-6">
              {/* Bidding Card Skeleton */}
              <Card>
                <CardHeader>
                  <Skeleton className="h-6 w-32" />
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <Skeleton className="h-4 w-24 mx-auto mb-2" />
                    <Skeleton className="h-10 w-40 mx-auto" />
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <Skeleton className="h-4 w-32 mb-2" />
                    <Skeleton className="h-6 w-full" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-11 w-full" />
                    <div className="flex gap-2">
                      {[...Array(3)].map((_, i) => (
                        <Skeleton key={i} className="h-8 flex-1" />
                      ))}
                    </div>
                    <Skeleton className="h-11 w-full" />
                  </div>
                </CardContent>
              </Card>

              {/* Seller Info Skeleton */}
              <Card>
                <CardHeader>
                  <Skeleton className="h-6 w-32" />
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Skeleton className="h-14 w-14 rounded-full" />
                    <div className="flex-1">
                      <Skeleton className="h-5 w-32 mb-2" />
                      <Skeleton className="h-3 w-40 mb-2" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {[...Array(2)].map((_, i) => (
                      <div key={i} className="p-2 bg-gray-50 rounded">
                        <Skeleton className="h-5 w-12 mx-auto mb-1" />
                        <Skeleton className="h-3 w-16 mx-auto" />
                      </div>
                    ))}
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-9 w-full" />
                    <Skeleton className="h-9 w-full" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Related Items Skeleton */}
          <div className="mt-8 sm:mt-12">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-20" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {[...Array(4)].map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <Skeleton className="h-32 sm:h-40 w-full" />
                  <CardContent className="p-3">
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-3/4 mb-3" />
                    <div className="flex items-center justify-between">
                      <div>
                        <Skeleton className="h-3 w-16 mb-1" />
                        <Skeleton className="h-5 w-20" />
                      </div>
                      <Skeleton className="h-5 w-16" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!auction) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold mb-4">ไม่พบสินค้าประมูล</h1>
            <p className="text-muted-foreground">สินค้าที่คุณกำลังมองหาอาจถูกลบหรือไม่ปรากฏ</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 sm:px-6 py-4 sm:py-6">
        {/* Breadcrumb */}
        <div className="mb-4 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">หน้าหลัก</Link>
          <span className="mx-2">/</span>
          <Link href="/" className="hover:text-foreground">สินค้าประมูล</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{auction.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {/* Image Gallery */}
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                {/* Main Image */}
                <div className="relative h-64 sm:h-96 bg-gray-100">
                  <Image
                    src={images[selectedImage]}
                    alt={auction.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                    <Badge className="bg-white/90 text-foreground hover:bg-white">{auction.category}</Badge>
                    <Badge variant={auction.isActive ? "default" : "secondary"}>
                      {auction.isActive ? 'กำลังประมูล' : 'สิ้นสุดแล้ว'}
                    </Badge>
                  </div>
                  <div className="absolute top-3 right-3 flex gap-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => setIsLiked(!isLiked)}
                      className="bg-white/90 hover:bg-white"
                    >
                      <Heart className={`h-4 w-4 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="bg-white/90 hover:bg-white"
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  {/* Navigation Arrows */}
                  {images.length > 1 && (
                    <>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => setSelectedImage(prev => prev > 0 ? prev - 1 : images.length - 1)}
                        className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => setSelectedImage(prev => prev < images.length - 1 ? prev + 1 : 0)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>
                
                {/* Thumbnail Gallery */}
                <div className="p-3 sm:p-4 bg-gray-50">
                  <div className="grid grid-cols-4 gap-2">
                    {images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedImage(idx)}
                        className={`relative h-16 sm:h-20 rounded-lg overflow-hidden border-2 transition-all ${
                          selectedImage === idx ? 'border-primary' : 'border-transparent hover:border-gray-300'
                        }`}
                      >
                        <Image
                          src={img}
                          alt={`${auction.title} ${idx + 1}`}
                          fill
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stats Bar */}
            <div className="grid grid-cols-3 gap-3">
              <Card>
                <CardContent className="p-3 sm:p-4 text-center">
                  <div className="flex items-center justify-center mb-1">
                    <Eye className="h-4 w-4 text-muted-foreground mr-1" />
                    <span className="text-lg sm:text-xl font-bold">1,234</span>
                  </div>
                  <p className="text-xs text-muted-foreground">ผู้เข้าชม</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-3 sm:p-4 text-center">
                  <div className="flex items-center justify-center mb-1">
                    <Users className="h-4 w-4 text-muted-foreground mr-1" />
                    <span className="text-lg sm:text-xl font-bold">{auction.bids.length}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">ผู้ประมูล</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-3 sm:p-4 text-center">
                  <div className="flex items-center justify-center mb-1">
                    <Heart className="h-4 w-4 text-muted-foreground mr-1" />
                    <span className="text-lg sm:text-xl font-bold">89</span>
                  </div>
                  <p className="text-xs text-muted-foreground">ถูกใจ</p>
                </CardContent>
              </Card>
            </div>

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl sm:text-2xl">{auction.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2 flex items-center">
                    <Package className="h-4 w-4 mr-2" />
                    รายละเอียดสินค้า
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {auction.description}
                  </p>
                </div>
                
                <Separator />
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground mb-1">หมวดหมู่</p>
                    <p className="font-medium">{auction.category}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">สภาพสินค้า</p>
                    <p className="font-medium">มือหนึ่ง / ใหม่</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">ราคาเริ่มต้น</p>
                    <p className="font-medium">{formatPrice(auction.startingPrice)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">วันที่เริ่มประมูล</p>
                    <p className="font-medium">{auction.createdAt.toLocaleDateString('th-TH')}</p>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <h3 className="font-semibold flex items-center">
                    <Shield className="h-4 w-4 mr-2" />
                    การันตีและการจัดส่ง
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    <div className="flex items-start space-x-2">
                      <Shield className="h-4 w-4 text-green-500 mt-0.5" />
                      <div>
                        <p className="font-medium">การันตีของแท้</p>
                        <p className="text-xs text-muted-foreground">ตรวจสอบโดยผู้เชี่ยวชาญ</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Truck className="h-4 w-4 text-blue-500 mt-0.5" />
                      <div>
                        <p className="font-medium">จัดส่งฟรี</p>
                        <p className="text-xs text-muted-foreground">ทั่วประเทศไทย</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Bids History */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-lg sm:text-xl">
                  <div className="flex items-center space-x-2">
                    <Gavel className="h-5 w-5" />
                    <span>ประวัติการประมูล</span>
                  </div>
                  <Badge variant="secondary">{auction.bids.length} ครั้ง</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {auction.bids.length === 0 ? (
                    <div className="text-center py-8">
                      <Gavel className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                      <p className="text-muted-foreground">ยังไม่มีผู้ประมูล</p>
                      <p className="text-sm text-muted-foreground mt-1">เป็นคนแรกที่ประมูลสินค้านี้!</p>
                    </div>
                  ) : (
                    <>
                      {auction.bids
                        .sort((a, b) => b.amount - a.amount)
                        .slice(0, 5)
                        .map((bid, index) => (
                          <div key={bid.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                            <div className="flex items-center space-x-3">
                              <div className={`flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full text-xs sm:text-sm font-bold ${
                                index === 0 ? 'bg-yellow-500 text-white' : 
                                index === 1 ? 'bg-gray-400 text-white' : 
                                index === 2 ? 'bg-orange-600 text-white' : 
                                'bg-gray-200 text-gray-700'
                              }`}>
                                {index + 1}
                              </div>
                              <div>
                                <p className="font-medium text-sm sm:text-base">{bid.bidder.name}</p>
                                <p className="text-xs text-muted-foreground">
                                  {bid.timestamp.toLocaleString('th-TH', { 
                                    dateStyle: 'short', 
                                    timeStyle: 'short' 
                                  })}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-base sm:text-lg text-primary">{formatPrice(bid.amount)}</p>
                              {index === 0 && (
                                <p className="text-xs text-green-600 font-medium">ราคาสูงสุด</p>
                              )}
                            </div>
                          </div>
                        ))}
                      {auction.bids.length > 5 && (
                        <Button variant="outline" className="w-full" size="sm">
                          ดูทั้งหมด ({auction.bids.length} ครั้ง)
                        </Button>
                      )}
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4 sm:space-y-6">
            {/* Bidding Card */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg sm:text-xl">ประมูลสินค้า</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Current Price */}
                <div className="text-center p-4 bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">ราคาปัจจุบัน</p>
                  <p className="text-2xl sm:text-3xl font-bold text-primary">
                    {formatPrice(auction.currentPrice)}
                  </p>
                  {auction.bids.length > 0 && (
                    <div className="flex items-center justify-center mt-2 text-xs text-green-600">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      <span>+{formatPrice(auction.currentPrice - auction.startingPrice)} จากราคาเริ่มต้น</span>
                    </div>
                  )}
                </div>

                {/* Countdown */}
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      เวลาที่เหลือ
                    </span>
                  </div>
                  <div className="text-center">
                    <RealTimeCountdown endTime={auction.endTime} />
                  </div>
                </div>

                <Separator />

                {/* Bid Input */}
                <div className="space-y-3">
                  <label className="text-sm font-medium">ราคาประมูลของคุณ</label>
                  <div className="space-y-2">
                    <Input
                      type="number"
                      value={bidAmount}
                      onChange={(e) => setBidAmount(e.target.value)}
                      placeholder="0"
                      min={auction.currentPrice + 1}
                      className="h-11 text-base"
                    />
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setBidAmount((auction.currentPrice + 1000).toString())}
                        className="flex-1"
                      >
                        +1,000
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setBidAmount((auction.currentPrice + 5000).toString())}
                        className="flex-1"
                      >
                        +5,000
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setBidAmount((auction.currentPrice + 10000).toString())}
                        className="flex-1"
                      >
                        +10,000
                      </Button>
                    </div>
                    <Button 
                      onClick={handlePlaceBid} 
                      disabled={!auction.isActive}
                      className="w-full h-11 text-base font-semibold"
                      size="lg"
                    >
                      <Gavel className="h-4 w-4 mr-2" />
                      {auction.isActive ? 'ประมูลเลย' : 'สิ้นสุดการประมูล'}
                    </Button>
                    <p className="text-xs text-muted-foreground text-center">
                      ราคาขั้นต่ำ: {formatPrice(auction.currentPrice + 1000)}
                    </p>
                  </div>
                </div>

                <Separator />

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="text-center p-2 bg-gray-50 rounded">
                    <div className="flex items-center justify-center mb-1">
                      <Users className="h-4 w-4 text-muted-foreground mr-1" />
                      <span className="font-bold">{auction.bids.length}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">ผู้ประมูล</p>
                  </div>
                  <div className="text-center p-2 bg-gray-50 rounded">
                    <div className="flex items-center justify-center mb-1">
                      <Eye className="h-4 w-4 text-muted-foreground mr-1" />
                      <span className="font-bold">1,234</span>
                    </div>
                    <p className="text-xs text-muted-foreground">ผู้เข้าชม</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Seller Info */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg sm:text-xl">ข้อมูลผู้ขาย</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Avatar className="h-12 w-12 sm:h-14 sm:w-14 ring-2 ring-primary/20">
                    <AvatarImage src={auction.seller.avatar} alt={auction.seller.name} />
                    <AvatarFallback className="bg-primary/10 text-primary font-bold">
                      {auction.seller.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-semibold text-base">{auction.seller.name}</p>
                    <div className="flex items-center mt-1 text-xs text-muted-foreground">
                      <Shield className="h-3 w-3 text-green-500 mr-1" />
                      <span>ผู้ขายที่ได้รับการยืนยัน</span>
                    </div>
                    <div className="flex items-center gap-3 mt-2 text-xs">
                      <div className="flex items-center">
                        <span className="text-yellow-500 mr-1">★</span>
                        <span className="font-medium">4.8</span>
                      </div>
                      <span className="text-muted-foreground">|</span>
                      <span className="text-muted-foreground">156 รีวิว</span>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-center p-2 bg-gray-50 rounded">
                    <p className="font-bold">48</p>
                    <p className="text-xs text-muted-foreground">สินค้า</p>
                  </div>
                  <div className="text-center p-2 bg-gray-50 rounded">
                    <p className="font-bold">98%</p>
                    <p className="text-xs text-muted-foreground">ความพึงพอใจ</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Button variant="outline" className="w-full" size="sm">
                    <MapPin className="h-4 w-4 mr-2" />
                    ดูโปรไฟล์
                  </Button>
                  <Button variant="default" className="w-full" size="sm">
                    ส่งข้อความ
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Related Items */}
        <div className="mt-8 sm:mt-12">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl font-bold">สินค้าที่เกี่ยวข้อง</h2>
            <Link href="/" className="text-sm text-primary hover:underline">
              ดูทั้งหมด
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {auctions
              .filter(a => a.id !== auction.id && a.category === auction.category)
              .slice(0, 4)
              .map((item) => (
                <Link key={item.id} href={`/auction/${item.id}`}>
                  <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
                    <div className="relative h-32 sm:h-40">
                      <Image
                        src={item.imageUrl}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <CardContent className="p-3">
                      <h3 className="font-semibold text-sm line-clamp-2 mb-2 group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-muted-foreground">ราคาปัจจุบัน</p>
                          <p className="font-bold text-primary text-sm sm:text-base">
                            {formatPrice(item.currentPrice)}
                          </p>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {item.bids.length} ประมูล
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
