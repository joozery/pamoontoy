'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Search, Bell, User, ShoppingCart, LogOut, Settings, Package } from 'lucide-react';
import { useAuth } from '@/lib/contexts/AuthContext';
import LoginDialog from '@/components/auth/LoginDialog';
import RegisterDialog from '@/components/auth/RegisterDialog';
import Swal from 'sweetalert2';

export default function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [showRegisterDialog, setShowRegisterDialog] = useState(false);

  const handleLogout = async () => {
    const result = await Swal.fire({
      icon: 'question',
      title: 'ออกจากระบบ',
      text: 'คุณต้องการออกจากระบบหรือไม่?',
      showCancelButton: true,
      confirmButtonText: 'ออกจากระบบ',
      cancelButtonText: 'ยกเลิก',
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      reverseButtons: true
    });

    if (result.isConfirmed) {
      logout();
      Swal.fire({
        icon: 'success',
        title: 'ออกจากระบบสำเร็จ',
        text: 'แล้วพบกันใหม่',
        confirmButtonText: 'ตกลง',
        confirmButtonColor: '#10b981',
        timer: 2000,
        timerProgressBar: true
      });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-black text-white shadow-2xl border-b border-gray-800/50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex h-16 sm:h-20 items-center justify-between">
          {/* Logo Section */}
          <Link href="/" className="flex items-center space-x-1.5 sm:space-x-4 group">
            <div className="flex items-center space-x-0.5 sm:space-x-2">
              <div className="h-6 w-6 sm:h-10 sm:w-10 bg-gradient-to-br from-red-500 to-red-600 rounded-md sm:rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-red-500/25 transition-all duration-300">
                <span className="text-white font-bold text-xs sm:text-lg">T</span>
              </div>
              <div className="h-6 w-6 sm:h-10 sm:w-10 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-md sm:rounded-xl flex items-center justify-center relative shadow-lg group-hover:shadow-yellow-400/25 transition-all duration-300">
                <span className="text-gray-900 font-bold text-xs sm:text-lg">O</span>
                <div className="absolute -top-0.5 sm:-top-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-1 sm:border-l-2 border-r-1 sm:border-r-2 border-b-1 sm:border-b-2 border-transparent border-b-gray-900"></div>
              </div>
              <div className="h-6 w-6 sm:h-10 sm:w-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-md sm:rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-blue-500/25 transition-all duration-300">
                <span className="text-white font-bold text-xs sm:text-lg">Y</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-white font-bold text-sm sm:text-2xl tracking-wider group-hover:text-blue-400 transition-colors duration-300">
                PAMOON TOY
              </span>
              <span className="text-xs text-gray-400 -mt-1 font-medium hidden sm:block">ของเล่น & ของสะสม</span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-10">
            <Link 
              href="/" 
              className="text-white hover:text-blue-400 transition-all duration-300 font-semibold text-base relative group py-2"
            >
              หน้าหลัก
              <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full"></span>
            </Link>
            <Link 
              href="/categories" 
              className="text-gray-300 hover:text-white transition-all duration-300 font-medium text-base relative group py-2"
            >
              หมวดหมู่สินค้า
              <span className="absolute -bottom-1 left-0 w-0 h-1 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link 
              href="/contact" 
              className="text-gray-300 hover:text-white transition-all duration-300 font-medium text-base relative group py-2"
            >
              ติดต่อเรา
              <span className="absolute -bottom-1 left-0 w-0 h-1 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link 
              href="/about" 
              className="text-gray-300 hover:text-white transition-all duration-300 font-medium text-base relative group py-2"
            >
              เกี่ยวกับเรา
              <span className="absolute -bottom-1 left-0 w-0 h-1 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full group-hover:w-full transition-all duration-300"></span>
            </Link>
          </nav>

          {/* Search and User Section */}
          <div className="flex items-center space-x-1 sm:space-x-4 lg:space-x-6">
            {/* Search Bar - Hidden on mobile */}
            <div className="relative hidden md:block">
              <div className="relative">
                <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="ค้นหาของเล่น..."
                  className="w-48 sm:w-64 lg:w-80 pl-10 sm:pl-12 pr-12 sm:pr-16 py-2 sm:py-3 rounded-xl sm:rounded-2xl bg-gray-900/50 border border-gray-700/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 backdrop-blur-sm text-sm sm:text-base"
                />
                <Button className="absolute right-1.5 sm:right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 sm:h-8 sm:w-8 p-0 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-lg sm:rounded-xl transition-all duration-300 shadow-lg hover:shadow-blue-500/25">
                  <Search className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                </Button>
              </div>
            </div>
            
            {/* Mobile Search Button */}
            <Button 
              variant="ghost" 
              size="sm" 
              className="md:hidden text-gray-300 hover:text-white hover:bg-gray-800/50 p-2 rounded-lg transition-all duration-300"
            >
              <Search className="h-4 w-4" />
            </Button>

            {/* User Profile */}
            <div className="flex items-center space-x-1 sm:space-x-4">
              {isAuthenticated && user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div className="flex items-center space-x-1 sm:space-x-3 text-gray-300 hover:text-white transition-colors duration-300 cursor-pointer group">
                      <Avatar className="h-7 w-7 sm:h-10 sm:w-10 ring-2 ring-blue-500/50 group-hover:ring-blue-400 transition-all duration-300">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white font-bold text-xs sm:text-base">
                          {user.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="hidden md:block">
                        <span className="font-semibold text-xs sm:text-sm">{user.name}</span>
                        <div className="text-xs text-gray-400">สมาชิก</div>
                      </div>
                      <svg className="h-3 w-3 sm:h-4 sm:w-4 group-hover:rotate-180 transition-transform duration-300 hidden sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/profile" className="cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        โปรไฟล์
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/my-auctions" className="cursor-pointer">
                        <Package className="mr-2 h-4 w-4" />
                        การประมูลของฉัน
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/settings" className="cursor-pointer">
                        <Settings className="mr-2 h-4 w-4" />
                        ตั้งค่า
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600">
                      <LogOut className="mr-2 h-4 w-4" />
                      ออกจากระบบ
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex items-center space-x-1 sm:space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowLoginDialog(true)}
                    className="text-gray-300 hover:text-white hover:bg-gray-800/50 px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl transition-all duration-300 font-medium text-xs"
                  >
                    <span className="hidden sm:inline">เข้าสู่ระบบ</span>
                    <User className="h-4 w-4 sm:hidden" />
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => setShowRegisterDialog(true)}
                    className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl transition-all duration-300 font-medium text-xs shadow-lg hover:shadow-blue-500/25"
                  >
                    สมัครสมาชิก
                  </Button>
                </div>
              )}

              {/* Notification Icons - Hidden on small mobile */}
              <div className="hidden xs:flex items-center space-x-1 sm:space-x-3">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-gray-300 hover:text-white hover:bg-gray-800/50 p-1.5 sm:p-3 rounded-lg sm:rounded-xl transition-all duration-300 relative group"
                >
                  <Bell className="h-3.5 w-3.5 sm:h-5 sm:w-5" />
                  <span className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 h-3.5 w-3.5 sm:h-5 sm:w-5 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white text-[9px] sm:text-xs font-bold">3</span>
                  </span>
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-gray-300 hover:text-white hover:bg-gray-800/50 p-1.5 sm:p-3 rounded-lg sm:rounded-xl transition-all duration-300 relative group"
                >
                  <ShoppingCart className="h-3.5 w-3.5 sm:h-5 sm:w-5" />
                  <span className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 h-3.5 w-3.5 sm:h-5 sm:w-5 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white text-[9px] sm:text-xs font-bold">5</span>
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Auth Dialogs */}
      <LoginDialog 
        open={showLoginDialog} 
        onOpenChange={setShowLoginDialog}
        onSwitchToRegister={() => {
          setShowLoginDialog(false);
          setShowRegisterDialog(true);
        }}
      />
      <RegisterDialog 
        open={showRegisterDialog} 
        onOpenChange={setShowRegisterDialog}
        onSwitchToLogin={() => {
          setShowRegisterDialog(false);
          setShowLoginDialog(true);
        }}
      />
    </header>
  );
}
