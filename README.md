# 🚀 MinhQuang28 - Premium Digital Agency & Source Code Marketplace

![MinhQuang28 Hero Banner](https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop)

MinhQuang28 là hệ thống Website Bán Hàng Cao Cấp (High-end Source Code) kết hợp giới thiệu Dịch Vụ Quảng Cáo (Performance Marketing). Dự án được thiết kế theo chuẩn UI/UX hiện đại (Glassmorphism, Gradient Glow, Anti-slop), tập trung tuyệt đối vào tỷ lệ chuyển đổi (Conversion Rate) và trải nghiệm người dùng siêu mượt mà.

## 🌟 Tính Năng Nổi Bật

### Dành cho Khách Hàng (Client-side)
- **Giao diện Sang Trọng & Độc Quyền:** Thiết kế Light Theme kết hợp Gradient tinh tế, hiệu ứng trượt màn hình mượt mà (Scroll Reveal).
- **Trải Nghiệm Mua Sắm (E-commerce):** Thêm vào giỏ hàng, Thanh toán, và Tra cứu trạng thái đơn hàng thời gian thực.
- **Đa Ngôn Ngữ (i18n):** Tích hợp tính năng chuyển đổi ngôn ngữ Việt - Anh linh hoạt.
- **Tốc Độ Tải Trang Siêu Tốc:** Điểm Lighthouse tuyệt đối nhờ kiến trúc React + Vite.

### Dành cho Quản Trị Viên (Admin Portal)
- **Quản Trị Giao Diện & Bài Viết:** Thêm, sửa, xóa các sản phẩm Source Code và bài Blog một cách trực quan.
- **Quản Lý Đơn Hàng:** Thay đổi trạng thái đơn hàng (Chờ xử lý, Đang xử lý, Đã bàn giao) chỉ bằng một cú nhấp chuột.
- **Hệ Thống Thông Báo (Custom Toast):** Thông báo thao tác thành công/thất bại dạng trượt mượt mà, thay thế hoàn toàn `window.alert`.
- **Cài Đặt Cấu Hình Động (Dynamic Settings):** Thay đổi nội dung hiển thị trang chủ, tên thương hiệu, Logo, và các thông tin liên hệ mà không cần chạm vào code.
- **Quản Lý Data:** Hệ thống Seed data thông minh, kết nối trực tiếp với Backend (Firebase Firestore).

## 🛠 Nền Tảng Công Nghệ (Tech Stack)

Dự án được xây dựng hoàn toàn trên hệ sinh thái Frontend hiện đại:

- **Framework:** [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Bundler:** [Vite](https://vitejs.dev/) (Tối ưu tốc độ Build cực nhanh)
- **Styling:** [Tailwind CSS v3](https://tailwindcss.com/) (Tùy biến cao, tích hợp custom animations)
- **Backend & Database:** [Firebase Firestore](https://firebase.google.com/) (Real-time NoSQL)
- **Routing:** [React Router v7](https://reactrouter.com/)
- **Localization:** [react-i18next](https://react.i18next.com/)

## 🚀 Hướng Dẫn Cài Đặt (Quick Start)

### 1. Yêu cầu hệ thống
- **Node.js**: Phiên bản >= 18.x
- **NPM** hoặc **Yarn**

### 2. Cài đặt mã nguồn

```bash
# Clone dự án từ GitHub
git clone https://github.com/quang3215/minhquang28.shop.git

# Di chuyển vào thư mục dự án
cd minhquang28.shop

# Cài đặt toàn bộ thư viện phụ thuộc
npm install
# hoặc nếu dùng yarn
yarn install
```

### 3. Cấu hình Môi trường Firebase
Dự án sử dụng Firebase làm Backend. Tại thư mục `src/config/firebase.ts`, vui lòng đảm bảo bạn đã cung cấp đúng các thông số API Key từ dự án Firebase của bạn.

### 4. Khởi động môi trường Phát triển (Development)

```bash
# Chạy máy chủ phát triển cục bộ
npm run dev
# hoặc
yarn dev
```
Truy cập: `http://localhost:5173`

### 5. Khởi động môi trường Quản trị (Admin)
Truy cập đường dẫn `/login`. Đăng nhập bằng tài khoản Quản trị viên (đã được cấp quyền Admin trên Firebase Auth).

## 📦 Đóng gói & Triển khai (Build & Deploy)

Để đưa website lên môi trường Production (như Vercel, Netlify, hoặc Firebase Hosting):

```bash
# Xây dựng bản phân phối
npm run build
# hoặc
yarn build
```

Sau khi quá trình kết thúc, thư mục `dist/` sẽ được tạo ra chứa mã nguồn tĩnh đã được tối ưu hóa tối đa, sẵn sàng để Upload lên máy chủ.

---

**Bản quyền © 2026 bởi MinhQuang28.** 
*Mọi hình thức sao chép giao diện hoặc sử dụng lại mã nguồn mà không có sự cho phép đều bị nghiêm cấm.*
