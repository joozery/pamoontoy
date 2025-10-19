# 🔐 คู่มือระบบสมัครสมาชิกและเข้าสู่ระบบ

## ✨ ฟีเจอร์ที่เพิ่มเข้ามา

### 1. **Authentication System**
- ✅ ระบบเข้าสู่ระบบ (Login)
- ✅ ระบบสมัครสมาชิก (Register)
- ✅ ระบบออกจากระบบ (Logout)
- ✅ จัดเก็บข้อมูลใน LocalStorage
- ✅ Mock Users สำหรับทดสอบ

### 2. **UI Components**
- ✅ Login Modal ด้วย SweetAlert2
- ✅ Register Modal ด้วย SweetAlert2
- ✅ User Dropdown Menu ใน Header
- ✅ แสดงสถานะ Login/Logout

### 3. **Validation**
- ✅ ตรวจสอบรูปแบบอีเมล
- ✅ ตรวจสอบความยาวรหัสผ่าน (ขั้นต่ำ 6 ตัวอักษร)
- ✅ ตรวจสอบการยืนยันรหัสผ่าน
- ✅ ตรวจสอบเบอร์โทรศัพท์ (10 หลัก)
- ✅ ตรวจสอบอีเมลซ้ำ

---

## 🧪 วิธีทดสอบระบบ

### **ทดสอบ Login**

#### **บัญชีทดสอบที่ 1:**
```
Email: test@pamoon.com
Password: 123456
```

#### **บัญชีทดสอบที่ 2:**
```
Email: admin@pamoon.com
Password: admin123
```

### **ขั้นตอนการทดสอบ:**

1. **เปิดเว็บไซต์**: `http://localhost:3001`

2. **คลิกปุ่ม "เข้าสู่ระบบ"** ที่ Header

3. **กรอกข้อมูล**:
   - Email: `test@pamoon.com`
   - Password: `123456`

4. **คลิก "เข้าสู่ระบบ"**

5. **ผลลัพธ์**:
   - ✅ แสดง Success Alert
   - ✅ Header เปลี่ยนเป็นแสดงชื่อผู้ใช้และรูปโปรไฟล์
   - ✅ มี Dropdown Menu (โปรไฟล์, การประมูลของฉัน, ตั้งค่า, ออกจากระบบ)

---

## 📝 วิธีสมัครสมาชิกใหม่

1. **คลิกปุ่ม "สมัครสมาชิก"** ที่ Header

2. **กรอกข้อมูล**:
   - ชื่อ-นามสกุล: `ทดสอบ ใหม่`
   - อีเมล: `newuser@pamoon.com`
   - เบอร์โทรศัพท์: `0812345678` (ไม่บังคับ)
   - รหัสผ่าน: `123456`
   - ยืนยันรหัสผ่าน: `123456`

3. **คลิก "สมัครสมาชิก"**

4. **ผลลัพธ์**:
   - ✅ แสดง Success Alert
   - ✅ เข้าสู่ระบบอัตโนมัติ
   - ✅ แสดงข้อมูลผู้ใช้ใน Header

---

## 🔄 วิธีออกจากระบบ

1. **คลิกที่รูปโปรไฟล์** ใน Header

2. **เลือก "ออกจากระบบ"** จาก Dropdown Menu

3. **ยืนยันการออกจากระบบ**

4. **ผลลัพธ์**:
   - ✅ แสดง Success Alert
   - ✅ Header กลับมาเป็นปุ่ม "เข้าสู่ระบบ" และ "สมัครสมาชิก"
   - ✅ ข้อมูลถูกลบจาก LocalStorage

---

## 📂 โครงสร้างไฟล์ที่สร้างขึ้น

```
src/
├── lib/
│   ├── contexts/
│   │   └── AuthContext.tsx          # Context สำหรับจัดการ Authentication
│   └── types/
│       └── index.ts                 # เพิ่ม User interface
├── components/
│   ├── auth/
│   │   ├── LoginModal.tsx           # Modal สำหรับเข้าสู่ระบบ
│   │   └── RegisterModal.tsx        # Modal สำหรับสมัครสมาชิก
│   └── layout/
│       └── Header.tsx               # อัพเดทให้แสดงสถานะ Login/Logout
└── app/
    └── layout.tsx                   # เพิ่ม AuthProvider
```

---

## 🎨 UI Features

### **Login Modal**
- 📧 ช่องกรอกอีเมล
- 🔒 ช่องกรอกรหัสผ่าน
- ℹ️ แสดงข้อมูลบัญชีทดสอบ
- ✅ Validation แบบ Real-time
- 🔄 Loading State

### **Register Modal**
- 👤 ช่องกรอกชื่อ-นามสกุล
- 📧 ช่องกรอกอีเมล
- 📱 ช่องกรอกเบอร์โทรศัพท์ (ไม่บังคับ)
- 🔒 ช่องกรอกรหัสผ่าน
- 🔒 ช่องยืนยันรหัสผ่าน
- ✅ Validation แบบ Real-time
- 🔄 Loading State

### **User Dropdown Menu**
- 👤 โปรไฟล์
- 📦 การประมูลของฉัน
- ⚙️ ตั้งค่า
- 🚪 ออกจากระบบ

---

## 🔒 ข้อมูลความปลอดภัย

### **Mock Users Database**
ระบบใช้ Mock Users สำหรับทดสอบ (ในไฟล์ `AuthContext.tsx`):

```typescript
const MOCK_USERS = [
  {
    id: '1',
    name: 'ทดสอบ ผู้ใช้',
    email: 'test@pamoon.com',
    password: '123456',
    avatar: '...',
    phone: '0812345678',
    createdAt: new Date('2024-01-01')
  },
  {
    id: '2',
    name: 'Admin User',
    email: 'admin@pamoon.com',
    password: 'admin123',
    avatar: '...',
    phone: '0898765432',
    createdAt: new Date('2024-01-01')
  }
];
```

### **LocalStorage**
- ข้อมูลผู้ใช้ถูกเก็บใน `localStorage` (key: `user`)
- ไม่เก็บรหัสผ่านใน `localStorage`
- Auto-login เมื่อ Refresh หน้า

---

## 🚀 การใช้งานใน Component อื่น

```typescript
'use client';

import { useAuth } from '@/lib/contexts/AuthContext';

export default function MyComponent() {
  const { user, isAuthenticated, login, register, logout } = useAuth();

  if (!isAuthenticated) {
    return <div>กรุณาเข้าสู่ระบบ</div>;
  }

  return (
    <div>
      <h1>สวัสดี {user?.name}</h1>
      <button onClick={logout}>ออกจากระบบ</button>
    </div>
  );
}
```

---

## 📋 Validation Rules

### **Login**
- ✅ อีเมลต้องมี `@`
- ✅ รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร

### **Register**
- ✅ ชื่อ-นามสกุล: **บังคับ**
- ✅ อีเมล: **บังคับ** และต้องมี `@`
- ✅ รหัสผ่าน: **บังคับ** และต้องมีอย่างน้อย 6 ตัวอักษร
- ✅ ยืนยันรหัสผ่าน: **บังคับ** และต้องตรงกับรหัสผ่าน
- ✅ เบอร์โทรศัพท์: **ไม่บังคับ** แต่ถ้ากรอกต้องเป็นตัวเลข 10 หลัก

---

## 🎯 Next Steps (ถ้าต้องการพัฒนาต่อ)

1. **เชื่อมต่อ Backend API**
   - แทนที่ Mock Users ด้วย API จริง
   - เพิ่ม JWT Token Authentication
   - เพิ่ม Refresh Token

2. **เพิ่มฟีเจอร์**
   - ลืมรหัสผ่าน (Forgot Password)
   - ยืนยันอีเมล (Email Verification)
   - Social Login (Google, Facebook)
   - Two-Factor Authentication (2FA)

3. **ปรับปรุง Security**
   - Hash รหัสผ่าน
   - Rate Limiting
   - CSRF Protection
   - XSS Protection

---

## 📞 Support

หากพบปัญหาหรือต้องการความช่วยเหลือ:
- 📧 Email: support@pamoon.com
- 💬 Line: @pamoon
- 📱 Tel: 02-xxx-xxxx

---

**สร้างโดย**: Pamoon TOY Development Team  
**วันที่**: 2024  
**เวอร์ชัน**: 1.0.0

