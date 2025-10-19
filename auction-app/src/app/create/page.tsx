'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import { useAuction } from '@/lib/hooks/useAuction';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Upload, X, Plus } from 'lucide-react';
import Footer from '@/components/layout/Footer';

const categories = [
  'Electronics',
  'Jewelry',
  'Art',
  'Antiques',
  'Fashion',
  'Home',
  'Sports',
  'Books',
  'Other'
];

export default function CreateAuctionPage() {
  const router = useRouter();
  const { createAuction } = useAuction();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startingPrice: '',
    category: '',
    endTime: '',
    imageUrl: ''
  });
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddImage = () => {
    if (formData.imageUrl.trim()) {
      setImages(prev => [...prev, formData.imageUrl]);
      setFormData(prev => ({ ...prev, imageUrl: '' }));
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const auctionData = {
        title: formData.title,
        description: formData.description,
        startingPrice: parseInt(formData.startingPrice),
        currentPrice: parseInt(formData.startingPrice),
        imageUrl: images[0] || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=500',
        category: formData.category,
        seller: {
          id: 'current-user',
          name: 'คุณ',
          email: 'user@example.com',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
          createdAt: new Date()
        },
        endTime: new Date(formData.endTime),
        bids: [],
        isActive: true
      };

      createAuction(auctionData);
      router.push('/');
    } catch (error) {
      console.error('Error creating auction:', error);
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = formData.title && formData.description && formData.startingPrice && 
                     formData.category && formData.endTime && images.length > 0;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">สร้างสินค้าประมูลใหม่</h1>
            <p className="text-muted-foreground">
              กรอกข้อมูลสินค้าของคุณเพื่อเริ่มการประมูล
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Basic Information */}
                <Card>
                  <CardHeader>
                    <CardTitle>ข้อมูลพื้นฐาน</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">ชื่อสินค้า *</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        placeholder="กรอกชื่อสินค้า"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">รายละเอียดสินค้า *</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        placeholder="อธิบายรายละเอียดสินค้า"
                        rows={4}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="startingPrice">ราคาเริ่มต้น (บาท) *</Label>
                        <Input
                          id="startingPrice"
                          type="number"
                          value={formData.startingPrice}
                          onChange={(e) => handleInputChange('startingPrice', e.target.value)}
                          placeholder="0"
                          min="0"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="category">หมวดหมู่ *</Label>
                        <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="เลือกหมวดหมู่" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="endTime">วันสิ้นสุดการประมูล *</Label>
                      <Input
                        id="endTime"
                        type="datetime-local"
                        value={formData.endTime}
                        onChange={(e) => handleInputChange('endTime', e.target.value)}
                        min={new Date().toISOString().slice(0, 16)}
                        required
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Images */}
                <Card>
                  <CardHeader>
                    <CardTitle>รูปภาพสินค้า</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex space-x-2">
                      <Input
                        value={formData.imageUrl}
                        onChange={(e) => handleInputChange('imageUrl', e.target.value)}
                        placeholder="URL รูปภาพ"
                      />
                      <Button type="button" onClick={handleAddImage} variant="outline">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>

                    {images.length > 0 && (
                      <div className="grid grid-cols-2 gap-4">
                        {images.map((image, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={image}
                              alt={`Product ${index + 1}`}
                              className="w-full h-32 object-cover rounded-lg"
                            />
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={() => handleRemoveImage(index)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}

                    <p className="text-sm text-muted-foreground">
                      เพิ่มรูปภาพสินค้าเพื่อให้ผู้ประมูลเห็นรายละเอียดชัดเจน
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Preview */}
                <Card>
                  <CardHeader>
                    <CardTitle>ตัวอย่างสินค้า</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {images.length > 0 ? (
                      <div className="space-y-4">
                        <img
                          src={images[0]}
                          alt="Preview"
                          className="w-full h-48 object-cover rounded-lg"
                        />
                        <div>
                          <h3 className="font-semibold text-lg">
                            {formData.title || 'ชื่อสินค้า'}
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {formData.description || 'รายละเอียดสินค้า'}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <Badge variant="secondary">
                              {formData.category || 'หมวดหมู่'}
                            </Badge>
                            <span className="font-bold text-lg">
                              {formData.startingPrice ? 
                                new Intl.NumberFormat('th-TH', {
                                  style: 'currency',
                                  currency: 'THB',
                                  minimumFractionDigits: 0,
                                }).format(parseInt(formData.startingPrice)) : 
                                '฿0'
                              }
                            </span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-48 border-2 border-dashed border-muted-foreground/25 rounded-lg">
                        <div className="text-center">
                          <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                          <p className="text-sm text-muted-foreground">เพิ่มรูปภาพเพื่อดูตัวอย่าง</p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Terms */}
                <Card>
                  <CardHeader>
                    <CardTitle>ข้อกำหนดและเงื่อนไข</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <p>• สินค้าต้องเป็นของแท้และอยู่ในสภาพดี</p>
                      <p>• ราคาเริ่มต้นต้องไม่ต่ำกว่า 100 บาท</p>
                      <p>• ระยะเวลาประมูลอย่างน้อย 1 วัน</p>
                      <p>• ผู้ขายต้องส่งสินค้าภายใน 3 วันทำการ</p>
                      <p>• ระบบจะหักค่าธรรมเนียม 5% จากราคาขาย</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
              >
                ยกเลิก
              </Button>
              <Button
                type="submit"
                disabled={!isFormValid || loading}
                className="min-w-32"
              >
                {loading ? 'กำลังสร้าง...' : 'สร้างการประมูล'}
              </Button>
            </div>
          </form>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
