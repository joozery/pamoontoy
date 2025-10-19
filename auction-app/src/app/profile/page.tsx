'use client';

import Header from '@/components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { User, Edit, Save, X } from 'lucide-react';
import Footer from '@/components/layout/Footer';
import { useState } from 'react';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+66 81 234 5678',
    location: 'กรุงเทพมหานคร, ประเทศไทย',
    bio: 'ผู้ขายสินค้าประมูลมืออาชีพ มีประสบการณ์มากกว่า 5 ปี',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100'
  });

  const [editData, setEditData] = useState(profileData);

  const handleEdit = () => {
    setEditData(profileData);
    setIsEditing(true);
  };

  const handleSave = () => {
    setProfileData(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData(profileData);
    setIsEditing(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setEditData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">โปรไฟล์ของฉัน</h1>
            <p className="text-muted-foreground">
              จัดการข้อมูลส่วนตัวและตั้งค่าบัญชีของคุณ
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Info */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={profileData.avatar} alt={profileData.name} />
                      <AvatarFallback>
                        <User className="h-12 w-12" />
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <CardTitle className="text-xl">{profileData.name}</CardTitle>
                  <Badge variant="secondary" className="w-fit mx-auto">
                    สมาชิกตั้งแต่ 2023
                  </Badge>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-primary">4.8</p>
                      <p className="text-sm text-muted-foreground">คะแนนความน่าเชื่อถือ</p>
                    </div>
                    
                    <Separator />
                    
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <p className="text-lg font-semibold">24</p>
                        <p className="text-sm text-muted-foreground">สินค้าขาย</p>
                      </div>
                      <div>
                        <p className="text-lg font-semibold">156</p>
                        <p className="text-sm text-muted-foreground">การประมูล</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Profile Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>ข้อมูลส่วนตัว</CardTitle>
                    {!isEditing ? (
                      <Button onClick={handleEdit} variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-2" />
                        แก้ไข
                      </Button>
                    ) : (
                      <div className="flex space-x-2">
                        <Button onClick={handleSave} size="sm">
                          <Save className="h-4 w-4 mr-2" />
                          บันทึก
                        </Button>
                        <Button onClick={handleCancel} variant="outline" size="sm">
                          <X className="h-4 w-4 mr-2" />
                          ยกเลิก
                        </Button>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">ชื่อ-นามสกุล</Label>
                      {isEditing ? (
                        <Input
                          id="name"
                          value={editData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                        />
                      ) : (
                        <p className="text-sm py-2">{profileData.name}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">อีเมล</Label>
                      {isEditing ? (
                        <Input
                          id="email"
                          type="email"
                          value={editData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                        />
                      ) : (
                        <p className="text-sm py-2">{profileData.email}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">เบอร์โทรศัพท์</Label>
                      {isEditing ? (
                        <Input
                          id="phone"
                          value={editData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                        />
                      ) : (
                        <p className="text-sm py-2">{profileData.phone}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location">ที่อยู่</Label>
                      {isEditing ? (
                        <Input
                          id="location"
                          value={editData.location}
                          onChange={(e) => handleInputChange('location', e.target.value)}
                        />
                      ) : (
                        <p className="text-sm py-2">{profileData.location}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">เกี่ยวกับฉัน</Label>
                    {isEditing ? (
                      <textarea
                        id="bio"
                        value={editData.bio}
                        onChange={(e) => handleInputChange('bio', e.target.value)}
                        className="w-full min-h-20 p-3 border border-input rounded-md resize-none"
                        placeholder="บอกเกี่ยวกับตัวคุณ..."
                      />
                    ) : (
                      <p className="text-sm py-2">{profileData.bio}</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>กิจกรรมล่าสุด</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm">ประมูล iPhone 15 Pro Max สำเร็จ</p>
                        <p className="text-xs text-muted-foreground">2 ชั่วโมงที่แล้ว</p>
                      </div>
                      <Badge variant="outline">฿55,000</Badge>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm">สร้างการประมูล Rolex Watch</p>
                        <p className="text-xs text-muted-foreground">1 วันที่แล้ว</p>
                      </div>
                      <Badge variant="secondary">ขาย</Badge>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm">ประมูล MacBook Pro ไม่สำเร็จ</p>
                        <p className="text-xs text-muted-foreground">3 วันที่แล้ว</p>
                      </div>
                      <Badge variant="outline">฿45,000</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
