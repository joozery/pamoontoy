'use client';

import Swal from 'sweetalert2';

export async function showRegisterModal() {
  const { value: formValues } = await Swal.fire({
    title: '<strong>สมัครสมาชิก</strong>',
    html: `
      <div class="space-y-4 text-left">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">ชื่อ-นามสกุล <span class="text-red-500">*</span></label>
          <input id="swal-input-name" class="swal2-input w-full m-0" placeholder="ชื่อ นามสกุล" type="text">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">อีเมล <span class="text-red-500">*</span></label>
          <input id="swal-input-email" class="swal2-input w-full m-0" placeholder="example@pamoon.com" type="email">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">เบอร์โทรศัพท์</label>
          <input id="swal-input-phone" class="swal2-input w-full m-0" placeholder="0812345678" type="tel">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">รหัสผ่าน <span class="text-red-500">*</span></label>
          <input id="swal-input-password" class="swal2-input w-full m-0" placeholder="อย่างน้อย 6 ตัวอักษร" type="password">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">ยืนยันรหัสผ่าน <span class="text-red-500">*</span></label>
          <input id="swal-input-confirm-password" class="swal2-input w-full m-0" placeholder="ยืนยันรหัสผ่าน" type="password">
        </div>
      </div>
    `,
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: 'สมัครสมาชิก',
    cancelButtonText: 'ยกเลิก',
    confirmButtonColor: '#3b82f6',
    cancelButtonColor: '#6b7280',
    width: '500px',
    preConfirm: () => {
      const name = (document.getElementById('swal-input-name') as HTMLInputElement).value;
      const email = (document.getElementById('swal-input-email') as HTMLInputElement).value;
      const phone = (document.getElementById('swal-input-phone') as HTMLInputElement).value;
      const password = (document.getElementById('swal-input-password') as HTMLInputElement).value;
      const confirmPassword = (document.getElementById('swal-input-confirm-password') as HTMLInputElement).value;
      
      if (!name || !email || !password || !confirmPassword) {
        Swal.showValidationMessage('กรุณากรอกข้อมูลที่มีเครื่องหมาย * ให้ครบถ้วน');
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
      
      if (password !== confirmPassword) {
        Swal.showValidationMessage('รหัสผ่านไม่ตรงกัน');
        return false;
      }
      
      if (phone && !/^[0-9]{10}$/.test(phone.replace(/-/g, ''))) {
        Swal.showValidationMessage('เบอร์โทรศัพท์ไม่ถูกต้อง (ต้องเป็นตัวเลข 10 หลัก)');
        return false;
      }
      
      return { name, email, phone: phone || undefined, password };
    }
  });

  return formValues;
}

export async function handleRegister(register: (name: string, email: string, password: string, phone?: string) => Promise<boolean>) {
  const formValues = await showRegisterModal();
  
  if (formValues) {
    // Show loading
    Swal.fire({
      title: 'กำลังสมัครสมาชิก...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    const success = await register(
      formValues.name,
      formValues.email,
      formValues.password,
      formValues.phone
    );

    if (success) {
      Swal.fire({
        icon: 'success',
        title: 'สมัครสมาชิกสำเร็จ!',
        html: `<p>ยินดีต้อนรับ <strong>${formValues.name}</strong></p><p class="text-sm text-gray-500 mt-2">คุณสามารถเริ่มใช้งานได้ทันที</p>`,
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
      }).then((result) => {
        if (result.isConfirmed) {
          handleRegister(register);
        }
      });
    }
  }
}

