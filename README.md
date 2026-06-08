# 🦉 Trúc Tự — Học Thủ Ngữ · Kết nối yêu thương

> Nền tảng học và giao tiếp bằng Ngôn ngữ Ký hiệu Việt Nam (NNKH VN)

---

## 📋 Giới thiệu

**Trúc Tự** là web app giúp người dùng học thủ ngữ (ngôn ngữ ký hiệu) thông qua:
- Video bài học với avatar 3D thực hiện ký hiệu
- Luyện tập qua camera với nhận diện tay real-time (MediaPipe)
- Lộ trình học cá nhân hóa theo chủ đề

---

## 📁 Cấu trúc dự án

```
truc-tu/
├── index.html              # Landing page chính
├── style.css               # Toàn bộ CSS
├── main.js                 # Animation, navbar, tương tác
│
└── assets/
    └── images/
        ├── owl-mascot.png  # Mascot cú 3D (clay art style)
        ├── avatar-1.png    # Ảnh card "Nhìn & Hiểu"
        ├── avatar-2.png    # Ảnh card "Ký & Phản hồi"
        ├── avatar-3.png    # Ảnh card "Biểu cảm & Cảm xúc"
        ├── plant-left.png  # Cây trang trí góc trái
        ├── plant-right.png # Cây trang trí góc phải
        └── favicon.png     # Icon tab trình duyệt
```

---

## 🎨 Design System

### Màu sắc

| Tên | Hex | Dùng ở đâu |
|---|---|---|
| Teal chính | `#2BBFAD` | Button, icon, accent |
| Teal đậm | `#1A9B8A` | Hover, text accent |
| Teal nhạt | `#E0F7F4` | Background badge, card |
| Amber | `#F5A03A` | Card "Ký & Phản hồi" |
| Pink | `#F06292` | Card "Biểu cảm & Cảm xúc" |
| Background | `#F0FAFA` | Nền toàn trang |
| Text đậm | `#1A2E2B` | Heading chính |
| Text phụ | `#6B8E89` | Mô tả, subtext |

### Font

```css
/* Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@700;800&family=Nunito:wght@400;600;700;800&display=swap');

--font-heading: 'Baloo 2', sans-serif;   /* Heading, logo */
--font-body:    'Nunito', sans-serif;    /* Body, button, mô tả */
```

---

## 🧩 Các section trong trang

### 1. Navbar
- Logo "T" + tên + tagline
- Menu: Cộng đồng / Lộ trình / Học tập / Tài nguyên
- CTA button "Bắt đầu học →"
- Sticky + blur khi scroll

### 2. Hero
Layout 3 phần:
- **Trái:** Badge + heading 3 dòng + tagline màu + mô tả + 2 nút + social proof
- **Giữa:** Con cú mascot (`position: absolute`, animation float)
- **Phải:** 3 feature cards (Nhìn & Hiểu / Ký & Phản hồi / Biểu cảm & Cảm xúc)

### 3. Stats Bar
4 cột: Cộng đồng thân thiện · Bài học sinh động · Lộ trình cá nhân hóa · An toàn & Tôn trọng

---

## 🚀 Chạy dự án

Không cần cài đặt gì. Mở thẳng file:

```bash
# Cách 1: Mở trực tiếp
open index.html

# Cách 2: Dùng Live Server (VS Code extension)
# Click chuột phải vào index.html → Open with Live Server
```

> **Lưu ý:** Nên dùng Live Server thay vì mở file trực tiếp để tránh lỗi CORS khi load ảnh/font.

---

## 🗺️ Lộ trình phát triển

- [x] Landing page (UI tĩnh)
- [ ] Trang danh sách chủ đề học
- [ ] Trang bài học từ vựng (flashcard)
- [ ] Tích hợp MediaPipe nhận diện tay qua camera
- [ ] Pipeline avatar 3D (MediaPipe → Three.js → VRoid)
- [ ] Backend + tài khoản người dùng
- [ ] Hệ thống streak và gamification

---

## 🛠️ Tech stack dự kiến

| Phần | Công nghệ |
|---|---|
| Frontend | HTML / CSS / JavaScript thuần |
| Nhận diện tay | MediaPipe Hands + Pose |
| Avatar 3D | Three.js + VRM (VRoid Studio) |
| Backend (sau) | Node.js + Express |
| Database (sau) | PostgreSQL |

---

## 📸 Ảnh cần chuẩn bị

File ảnh không thể generate bằng code, cần tìm hoặc tạo thủ công:

| File | Mô tả | Gợi ý tìm |
|---|---|---|
| `owl-mascot.png` | Cú 3D clay art, màu teal, nền trong suốt | Midjourney / Adobe Firefly / Freepik |
| `avatar-1.png` | Cô gái làm ký hiệu tay, ảnh tròn | Unsplash / chụp thật |
| `avatar-2.png` | Bé trai làm ký hiệu tay | Unsplash / chụp thật |
| `avatar-3.png` | Cô gái biểu cảm cảm xúc | Unsplash / chụp thật |
| `plant-left/right.png` | Cây lá xanh trang trí | Freepik (search "plant png transparent") |

---

## 👤 Tác giả

Dự án cá nhân — đang phát triển.
