'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Eye, EyeOff, Mail, Lock, Loader2 } from 'lucide-react';
import { useAuth } from '@/lib/contexts/AuthContext';
import Swal from 'sweetalert2';

interface LoginDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSwitchToRegister: () => void;
}

export default function LoginDialog({ open, onOpenChange, onSwitchToRegister }: LoginDialogProps) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email) {
      newErrors.email = 'กรุณากรอกอีเมล';
    } else if (!email.includes('@')) {
      newErrors.email = 'รูปแบบอีเมลไม่ถูกต้อง';
    }

    if (!password) {
      newErrors.password = 'กรุณากรอกรหัสผ่าน';
    } else if (password.length < 6) {
      newErrors.password = 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      const success = await login(email, password);

      if (success) {
        onOpenChange(false);
        setEmail('');
        setPassword('');
        setErrors({});
        
        Swal.fire({
          icon: 'success',
          title: 'เข้าสู่ระบบสำเร็จ!',
          text: 'ยินดีต้อนรับกลับมา',
          confirmButtonText: 'เริ่มใช้งาน',
          confirmButtonColor: '#10b981',
          timer: 2000,
          timerProgressBar: true
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'เข้าสู่ระบบไม่สำเร็จ',
          text: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง',
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px] p-0 gap-0 overflow-hidden">
        {/* Header with Gradient */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">เข้าสู่ระบบ</DialogTitle>
            <DialogDescription className="text-blue-100">
              ยินดีต้อนรับกลับมายัง Pamoon TOY
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Demo Account Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-2">
            <p className="text-sm font-semibold text-blue-900">🎯 ทดสอบ Login:</p>
            <div className="space-y-1 text-xs text-blue-700">
              <p><strong>Email:</strong> test@pamoon.com</p>
              <p><strong>Password:</strong> 123456</p>
            </div>
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              อีเมล <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="email"
                type="email"
                placeholder="example@pamoon.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors({ ...errors, email: undefined });
                }}
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

          {/* Password Field */}
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium">
              รหัสผ่าน <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors({ ...errors, password: undefined });
                }}
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
            {errors.password && (
              <p className="text-xs text-red-500 flex items-center gap-1">
                <span className="inline-block w-1 h-1 bg-red-500 rounded-full"></span>
                {errors.password}
              </p>
            )}
          </div>

          {/* Forgot Password */}
          <div className="flex justify-end">
            <Button
              type="button"
              variant="link"
              className="text-sm text-blue-600 hover:text-blue-700 p-0 h-auto"
            >
              ลืมรหัสผ่าน?
            </Button>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full h-11 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                กำลังเข้าสู่ระบบ...
              </>
            ) : (
              'เข้าสู่ระบบ'
            )}
          </Button>

          {/* Divider */}
          <div className="relative">
            <Separator />
            <span className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-xs text-gray-500">
              หรือ
            </span>
          </div>

          {/* Register Link */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              ยังไม่มีบัญชี?{' '}
              <button
                type="button"
                onClick={() => {
                  onOpenChange(false);
                  onSwitchToRegister();
                }}
                className="text-blue-600 hover:text-blue-700 font-semibold hover:underline"
              >
                สมัครสมาชิก
              </button>
            </p>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

