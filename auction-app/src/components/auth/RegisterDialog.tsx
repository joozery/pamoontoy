'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Eye, EyeOff, Mail, Lock, User as UserIcon, Phone, Loader2, CheckCircle2 } from 'lucide-react';
import { useAuth } from '@/lib/contexts/AuthContext';
import Swal from 'sweetalert2';

interface RegisterDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSwitchToLogin: () => void;
}

export default function RegisterDialog({ open, onOpenChange, onSwitchToLogin }: RegisterDialogProps) {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'กรุณากรอกชื่อ-นามสกุล';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'ชื่อต้องมีอย่างน้อย 2 ตัวอักษร';
    }

    if (!formData.email) {
      newErrors.email = 'กรุณากรอกอีเมล';
    } else if (!formData.email.includes('@')) {
      newErrors.email = 'รูปแบบอีเมลไม่ถูกต้อง';
    }

    if (formData.phone && !/^[0-9]{10}$/.test(formData.phone.replace(/-/g, ''))) {
      newErrors.phone = 'เบอร์โทรศัพท์ไม่ถูกต้อง (ต้องเป็นตัวเลข 10 หลัก)';
    }

    if (!formData.password) {
      newErrors.password = 'กรุณากรอกรหัสผ่าน';
    } else if (formData.password.length < 6) {
      newErrors.password = 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'กรุณายืนยันรหัสผ่าน';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'รหัสผ่านไม่ตรงกัน';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      const success = await register(
        formData.name,
        formData.email,
        formData.password,
        formData.phone || undefined
      );

      if (success) {
        onOpenChange(false);
        setFormData({ name: '', email: '', phone: '', password: '', confirmPassword: '' });
        setErrors({});
        
        Swal.fire({
          icon: 'success',
          title: 'สมัครสมาชิกสำเร็จ!',
          html: `<p>ยินดีต้อนรับ <strong>${formData.name}</strong></p><p class="text-sm text-gray-500 mt-2">คุณสามารถเริ่มใช้งานได้ทันที</p>`,
          confirmButtonText: 'เริ่มใช้งาน',
          confirmButtonColor: '#10b981',
          timer: 3000,
          timerProgressBar: true
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'สมัครสมาชิกไม่สำเร็จ',
          text: 'อีเมลนี้มีผู้ใช้งานแล้ว',
          confirmButtonText: 'ลองอีกครั้ง',
          confirmButtonColor: '#ef4444'
        });
      }
    } catch {
      Swal.fire({
        icon: 'error',
        title: 'เกิดข้อผิดพลาด',
        text: 'กรุณาลองใหม่อีกครั้ง',
        confirmButtonText: 'ตกลง',
        confirmButtonColor: '#ef4444'
      });
    } finally {
      setLoading(false);
    }
  };

  const getPasswordStrength = (password: string) => {
    if (!password) return { strength: 0, label: '', color: '' };
    if (password.length < 6) return { strength: 33, label: 'อ่อนแอ', color: 'bg-red-500' };
    if (password.length < 10) return { strength: 66, label: 'ปานกลาง', color: 'bg-yellow-500' };
    return { strength: 100, label: 'แข็งแรง', color: 'bg-green-500' };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[520px] p-0 gap-0 overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Header with Gradient */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 text-white sticky top-0 z-10">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">สมัครสมาชิก</DialogTitle>
            <DialogDescription className="text-green-100">
              เริ่มต้นการเดินทางกับ Pamoon TOY
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Name Field */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">
              ชื่อ-นามสกุล <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="name"
                type="text"
                placeholder="ชื่อ นามสกุล"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className={`pl-10 h-11 ${errors.name ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                disabled={loading}
              />
            </div>
            {errors.name && (
              <p className="text-xs text-red-500 flex items-center gap-1">
                <span className="inline-block w-1 h-1 bg-red-500 rounded-full"></span>
                {errors.name}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="register-email" className="text-sm font-medium">
              อีเมล <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="register-email"
                type="email"
                placeholder="example@pamoon.com"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className={`pl-10 h-11 ${errors.email ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                disabled={loading}
              />
            </div>
            {errors.email && (
              <p className="text-xs text-red-500 flex items-center gap-1">
                <span className="inline-block w-1 h-1 bg-red-500 rounded-full"></span>
                {errors.email}
              </p>
            )}
          </div>

          {/* Phone Field */}
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm font-medium">
              เบอร์โทรศัพท์ <span className="text-gray-400 text-xs">(ไม่บังคับ)</span>
            </Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="phone"
                type="tel"
                placeholder="0812345678"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className={`pl-10 h-11 ${errors.phone ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                disabled={loading}
              />
            </div>
            {errors.phone && (
              <p className="text-xs text-red-500 flex items-center gap-1">
                <span className="inline-block w-1 h-1 bg-red-500 rounded-full"></span>
                {errors.phone}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <Label htmlFor="register-password" className="text-sm font-medium">
              รหัสผ่าน <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="register-password"
                type={showPassword ? 'text' : 'password'}
                placeholder="อย่างน้อย 6 ตัวอักษร"
                value={formData.password}
                onChange={(e) => handleChange('password', e.target.value)}
                className={`pl-10 pr-10 h-11 ${errors.password ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                disabled={loading}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {formData.password && (
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${passwordStrength.color}`}
                      style={{ width: `${passwordStrength.strength}%` }}
                    />
                  </div>
                  <span className="text-xs font-medium text-gray-600">{passwordStrength.label}</span>
                </div>
              </div>
            )}
            {errors.password && (
              <p className="text-xs text-red-500 flex items-center gap-1">
                <span className="inline-block w-1 h-1 bg-red-500 rounded-full"></span>
                {errors.password}
              </p>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="space-y-2">
            <Label htmlFor="confirm-password" className="text-sm font-medium">
              ยืนยันรหัสผ่าน <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="confirm-password"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="ยืนยันรหัสผ่าน"
                value={formData.confirmPassword}
                onChange={(e) => handleChange('confirmPassword', e.target.value)}
                className={`pl-10 pr-10 h-11 ${errors.confirmPassword ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                disabled={loading}
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {formData.confirmPassword && formData.password === formData.confirmPassword && (
              <p className="text-xs text-green-600 flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3" />
                รหัสผ่านตรงกัน
              </p>
            )}
            {errors.confirmPassword && (
              <p className="text-xs text-red-500 flex items-center gap-1">
                <span className="inline-block w-1 h-1 bg-red-500 rounded-full"></span>
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full h-11 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 mt-6"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                กำลังสมัครสมาชิก...
              </>
            ) : (
              'สมัครสมาชิก'
            )}
          </Button>

          {/* Divider */}
          <div className="relative">
            <Separator />
            <span className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-xs text-gray-500">
              หรือ
            </span>
          </div>

          {/* Login Link */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              มีบัญชีอยู่แล้ว?{' '}
              <button
                type="button"
                onClick={() => {
                  onOpenChange(false);
                  onSwitchToLogin();
                }}
                className="text-green-600 hover:text-green-700 font-semibold hover:underline"
              >
                เข้าสู่ระบบ
              </button>
            </p>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

