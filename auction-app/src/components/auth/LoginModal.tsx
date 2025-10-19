'use client';

import Swal from 'sweetalert2';
import { useAuth } from '@/lib/contexts/AuthContext';

export async function showLoginModal() {
  const { value: formValues } = await Swal.fire({
    title: '<strong>เข้าสู่ระบบ</strong>',
    html: `
      <div class="space-y-4 text-left">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">อีเมล</label>
          <input id="swal-input-email" class="swal2-input w-full m-0" placeholder="example@pamoon.com" type="email">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">รหัสผ่าน</label>
          <input id="swal-input-password" class="swal2-input w-full m-0" placeholder="••••••••" type="password">
        </div>
        <div class="text-xs text-gray-500 bg-blue-50 p-3 rounded">
          <strong>ทดสอบ Login:</strong><br>
          Email: <code class="bg-white px-1">test@pamoon.com</code><br>
          Password: <code class="bg-white px-1">123456</code>
        </div>
      </div>
    `,
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: 'เข้าสู่ระบบ',
    cancelButtonText: 'ยกเลิก',
    confirmButtonColor: '#3b82f6',
    cancelButtonColor: '#6b7280',
    width: '500px',
    preConfirm: () => {
      const email = (document.getElementById('swal-input-email') as HTMLInputElement).value;
      const password = (document.getElementById('swal-input-password') as HTMLInputElement).value;
      
      if (!email || !password) {
        Swal.showValidationMessage('กรุณากรอกข้อมูลให้ครบถ้วน');
        return false;
      }
      
      if (!email.includes('@')) {
        Swal.showValidationMessage('รูปแบบอีเมลไม่ถูกต้อง');
        return false;
      }
      
      if (password.length < 6) {
        Swal.showValidationMessage('รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร');
        return false;
      }
      
      return { email, password };
    }
  });

  return formValues;
}

export async function handleLogin(login: (email: string, password: string) => Promise<boolean>) {
  const formValues = await showLoginModal();
  
  if (formValues) {
    // Show loading
    Swal.fire({
      title: 'กำลังเข้าสู่ระบบ...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    const success = await login(formValues.email, formValues.password);

    if (success) {
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
      }).then((result) => {
        if (result.isConfirmed) {
          handleLogin(login);
        }
      });
    }
  }
}

