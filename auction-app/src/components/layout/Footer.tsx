import Link from 'next/link';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Company Info */}
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                <div className="h-5 w-5 sm:h-6 sm:w-6 bg-red-500 rounded-md flex items-center justify-center shadow-md">
                  <span className="text-white font-bold text-xs">T</span>
                </div>
                <div className="h-5 w-5 sm:h-6 sm:w-6 bg-yellow-400 rounded-md flex items-center justify-center relative shadow-md">
                  <span className="text-gray-900 font-bold text-xs">O</span>
                </div>
                <div className="h-5 w-5 sm:h-6 sm:w-6 bg-blue-500 rounded-md flex items-center justify-center shadow-md">
                  <span className="text-white font-bold text-xs">Y</span>
                </div>
              </div>
              <span className="text-white font-bold text-base sm:text-lg tracking-wider">PAMOON TOY</span>
            </div>
            <p className="text-gray-300 text-xs leading-relaxed max-w-sm">
              เว็บไซต์ประมูลสินค้าออนไลน์ที่เชื่อถือได้ พบกับสินค้าคุณภาพสูงจากผู้ขายที่น่าเชื่อถือ
            </p>
            <div className="flex space-x-2 sm:space-x-3">
              <Link href="#" className="text-gray-400 hover:text-white transition-colors duration-200 p-1 sm:p-1.5 rounded-md hover:bg-gray-700">
                <Facebook className="h-3 w-3 sm:h-4 sm:w-4" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors duration-200 p-1 sm:p-1.5 rounded-md hover:bg-gray-700">
                <Twitter className="h-3 w-3 sm:h-4 sm:w-4" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors duration-200 p-1 sm:p-1.5 rounded-md hover:bg-gray-700">
                <Instagram className="h-3 w-3 sm:h-4 sm:w-4" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors duration-200 p-1 sm:p-1.5 rounded-md hover:bg-gray-700">
                <Youtube className="h-3 w-3 sm:h-4 sm:w-4" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-base sm:text-lg font-bold text-white">ลิงก์ด่วน</h3>
            <ul className="space-y-1.5 sm:space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors duration-200 text-xs sm:text-sm font-medium block py-0.5">
                  หน้าหลัก
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-gray-300 hover:text-white transition-colors duration-200 text-xs sm:text-sm font-medium block py-0.5">
                  หมวดหมู่สินค้า
                </Link>
              </li>
              <li>
                <Link href="/create" className="text-gray-300 hover:text-white transition-colors duration-200 text-xs sm:text-sm font-medium block py-0.5">
                  ขายสินค้า
                </Link>
              </li>
              <li>
                <Link href="/my-auctions" className="text-gray-300 hover:text-white transition-colors duration-200 text-xs sm:text-sm font-medium block py-0.5">
                  การประมูลของฉัน
                </Link>
              </li>
              <li>
                <Link href="/profile" className="text-gray-300 hover:text-white transition-colors duration-200 text-xs sm:text-sm font-medium block py-0.5">
                  โปรไฟล์
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-base sm:text-lg font-bold text-white">การสนับสนุน</h3>
            <ul className="space-y-1.5 sm:space-y-2">
              <li>
                <Link href="/help" className="text-gray-300 hover:text-white transition-colors duration-200 text-xs sm:text-sm font-medium block py-0.5">
                  วิธีใช้
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-300 hover:text-white transition-colors duration-200 text-xs sm:text-sm font-medium block py-0.5">
                  คำถามที่พบบ่อย
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-300 hover:text-white transition-colors duration-200 text-xs sm:text-sm font-medium block py-0.5">
                  ข้อกำหนดการใช้งาน
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-300 hover:text-white transition-colors duration-200 text-xs sm:text-sm font-medium block py-0.5">
                  นโยบายความเป็นส่วนตัว
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors duration-200 text-xs sm:text-sm font-medium block py-0.5">
                  ติดต่อเรา
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-base sm:text-lg font-bold text-white">ติดต่อเรา</h3>
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-start space-x-2 sm:space-x-3">
                <div className="p-1 sm:p-1.5 bg-gray-700 rounded-md">
                  <MapPin className="h-3 w-3 text-blue-400" />
                </div>
                <span className="text-gray-300 text-xs leading-relaxed">
                  123 ถนนสุขุมวิท กรุงเทพมหานคร 10110
                </span>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="p-1 sm:p-1.5 bg-gray-700 rounded-md">
                  <Phone className="h-3 w-3 text-green-400" />
                </div>
                <span className="text-gray-300 text-xs font-medium">02-123-4567</span>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="p-1 sm:p-1.5 bg-gray-700 rounded-md">
                  <Mail className="h-3 w-3 text-red-400" />
                </div>
                <span className="text-gray-300 text-xs font-medium">info@pamoon.com</span>
              </div>
            </div>
            <div className="pt-3 sm:pt-4">
              <h4 className="text-sm sm:text-base font-bold text-white mb-2 sm:mb-3">รับข่าวสาร</h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="อีเมลของคุณ"
                  className="flex-1 px-2 sm:px-3 py-1.5 sm:py-2 bg-gray-800 border border-gray-700 rounded-l-lg text-xs text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
                <button className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-r-lg text-xs font-semibold transition-all duration-200">
                  สมัคร
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-6 sm:mt-8 pt-4 sm:pt-6">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
            <div className="text-center sm:text-left">
              <p className="text-gray-400 text-xs font-medium">
                © 2024 PAMOON TOY. สงวนลิขสิทธิ์ทั้งหมด
              </p>
              <p className="text-gray-500 text-xs mt-1">
                เว็บไซต์ประมูลสินค้าออนไลน์ที่เชื่อถือได้
              </p>
            </div>
            <div className="flex flex-wrap justify-center sm:justify-end gap-3 sm:gap-4">
              <Link href="/terms" className="text-gray-400 hover:text-white text-xs font-medium transition-colors duration-200">
                ข้อกำหนดการใช้งาน
              </Link>
              <Link href="/privacy" className="text-gray-400 hover:text-white text-xs font-medium transition-colors duration-200">
                นโยบายความเป็นส่วนตัว
              </Link>
              <Link href="/cookies" className="text-gray-400 hover:text-white text-xs font-medium transition-colors duration-200">
                นโยบายคุกกี้
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
