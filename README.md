# 🚗 Birojasa - Sistem Manajemen Biro Jasa

Website sistem manajemen biro jasa modern dengan fitur lengkap untuk mengelola layanan, review pelanggan, dan partner.

## ✨ Fitur

- 🏠 **Landing Page** - Tampilan menarik dengan banner dan informasi layanan
- 📝 **Form Layanan** - Sistem pengajuan layanan online untuk pelanggan
- ⭐ **Review & Testimoni** - Menampilkan ulasan pelanggan
- 🤝 **Partner Showcase** - Galeri mitra kerja
- 🔐 **Admin Dashboard** - Panel administrasi untuk mengelola konten
- 📱 **Responsive Design** - Tampilan optimal di semua perangkat
- 📧 **Email Notification** - Notifikasi otomatis untuk setiap pengajuan

## 🛠️ Teknologi

**Frontend:**

- React 18 + Vite
- Bootstrap 5
- React Router
- Axios

**Backend:**

- Node.js + Express
- PostgreSQL + Sequelize
- JWT Authentication
- Nodemailer
- Multer (file upload)

## 📦 Instalasi

### Prasyarat

- Node.js v16+
- PostgreSQL v12+
- npm atau yarn

### Langkah Instalasi

```bash
# Clone repository
git clone https://github.com/suryaaji016/Birojasa.git
cd Birojasa

# Install dependencies server
cd server
npm install

# Install dependencies client
cd ../client
npm install
```

## ⚙️ Konfigurasi

### Setup Database

```bash
# Buat database PostgreSQL
createdb birojasa

# Jalankan migrations
cd server
npx sequelize-cli db:migrate
```

### Environment Variables

Buat file `.env` di folder `server`:

```env
PORT=3000
DATABASE_URL=postgresql://username:password@localhost:5432/birojasa

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
FROM_EMAIL=your_email@gmail.com
```

## 🚀 Menjalankan Aplikasi

### Development Mode

**Terminal 1 - Server:**

```bash
cd server
npm run dev
```

Server berjalan di: `http://localhost:3000`

**Terminal 2 - Client:**

```bash
cd client
npm run dev
```

Client berjalan di: `http://localhost:5173`

### Production Mode

```bash
# Build client
cd client
npm run build

# Run server
cd ../server
npm start
```

## � Struktur Proyek

```
Birojasa/
├── client/              # Frontend React application
│   ├── src/
│   │   ├── components/  # Komponen React
│   │   ├── pages/       # Halaman aplikasi
│   │   └── api/         # API configuration
│   └── public/
│
└── server/              # Backend Node.js application
    ├── controllers/     # Route controllers
    ├── models/          # Database models
    ├── routes/          # API routes
    ├── services/        # Business logic
    ├── middlewares/     # Express middlewares
    └── uploads/         # Upload directory
```

## 🌐 Deployment

### Frontend (Firebase Hosting)

```bash
cd client
npm run build
firebase deploy
```

### Backend (Railway/Heroku/VPS)

1. Set environment variables di platform hosting
2. Deploy dari repository GitHub
3. Platform akan otomatis build dan run

**Live Demo:** [https://vinnojaya.co.id](https://vinnojaya.co.id)

## � License

ISC License

## 👨‍💻 Author

**Surya Aji** - [@suryaaji016](https://github.com/suryaaji016)

## 📧 Contact

Untuk informasi lebih lanjut:

- Website: [https://vinnojaya.co.id](https://vinnojaya.co.id)
- Email: your_email@gmail.com

---

Made with ❤️ for Vinno Jaya

- SweetAlert2
- React Icons

### Backend

- Node.js
- Express 5.1.0
- PostgreSQL
- Sequelize 6.37.7
- JWT (jsonwebtoken)
- Bcrypt.js
- Nodemailer
- Multer
- Helmet
- Express Rate Limit

### Testing

- Jest
- Supertest
- SQLite (untuk testing database)

## 📦 Prasyarat

Pastikan Anda telah menginstal:

- Node.js (v16 atau lebih tinggi)
- npm atau yarn
- PostgreSQL (v12 atau lebih tinggi)
- Git

## 🚀 Instalasi

### 1. Clone Repository

```bash
git clone https://github.com/suryaaji016/Birojasa.git
cd Birojasa
```

### 2. Install Dependencies

#### Server

```bash
cd server
npm install
```

#### Client

```bash
cd client
npm install
```

## ⚙️ Konfigurasi

### Server Configuration

1. Copy file `.env.example` menjadi `.env`:

```bash
cd server
cp .env.example .env
```

2. Edit file `.env` dengan konfigurasi Anda:

```env
# Server Configuration
PORT=3000

# Security - JWT Secret (WAJIB DIGANTI!)
JWT_SECRET=your_super_secret_jwt_key_here
ADMIN_UNIQUE_CODE=@Vinno1Jaya2

# Database Configuration
DATABASE_URL=postgresql://username:password@localhost:5432/birojasa

# Email Configuration (Gmail)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
FROM_EMAIL=your_email@gmail.com

# Branch Email Routing
EMAIL_DEFAULT=default@gmail.com
EMAIL_VINNOJAYA_PEKAYON=pekayon@gmail.com
EMAIL_VINNOJAYA_TAMAN_GALAXY=galaxy@gmail.com

# Queue Settings
MAX_RETRY_ATTEMPTS=3
QUEUE_BATCH_SIZE=5
QUEUE_INTERVAL_MS=1000
```

### Database Setup

1. Buat database PostgreSQL:

```bash
createdb birojasa
```

2. Jalankan migrations:

```bash
cd server
npx sequelize-cli db:migrate
```

### Client Configuration

Edit file `client/src/config.js` untuk mengatur API URL:

```javascript
export const API_URL = "http://localhost:3000";
```

## 🏃 Menjalankan Aplikasi

### Development Mode

#### 1. Jalankan Server (Terminal 1)

```bash
cd server
npm run dev
```

Server akan berjalan di: `http://localhost:3000`

#### 2. Jalankan Client (Terminal 2)

```bash
cd client
npm run dev
```

Client akan berjalan di: `http://localhost:5173`

### Production Mode

#### Build Client

```bash
cd client
npm run build
```

#### Run Server

```bash
cd server
npm start
```

## 🧪 Testing

### Menjalankan Test Server

```bash
cd server
npm test
```

### Menjalankan Test dengan Coverage

```bash
cd server
npm run test:coverage
```

### Test Spesifik

```bash
# Test authentication
npm test -- auth.test.js

# Test services
npm test -- service.test.js

# Test reviews
npm test -- review.test.js
```

## 📁 Struktur Proyek

```
Birojasa/
├── client/                 # Frontend React application
│   ├── public/            # Static files
│   ├── src/
│   │   ├── api/           # API configuration
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── utils/         # Utility functions
│   │   └── App.jsx        # Main app component
│   └── package.json
│
├── server/                # Backend Node.js application
│   ├── config/           # Configuration files
│   ├── controllers/      # Route controllers
│   ├── helpers/          # Helper functions
│   ├── middlewares/      # Express middlewares
│   ├── migrations/       # Database migrations
│   ├── models/           # Sequelize models
│   ├── routes/           # API routes
│   ├── services/         # Business logic services
│   ├── test/             # Test files
│   ├── workers/          # Background workers
│   ├── uploads/          # Upload directory
│   ├── app.js            # Express app configuration
│   ├── server.js         # Server entry point
│   └── package.json
│
└── README.md
```

## 📖 API Documentation

### Authentication

#### Register Admin

```http
POST /users/register
Content-Type: application/json

{
  "username": "admin",
  "email": "admin@example.com",
  "password": "password123",
  "uniqueCode": "@Vinno1Jaya2"
}
```

#### Login

```http
POST /users/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "password123"
}
```

### Services

#### Submit Service Form

```http
POST /service
Content-Type: application/json

{
  "name": "John Doe",
  "phone": "081234567890",
  "email": "john@example.com",
  "cabang": "Vinno Jaya Pekayon",
  "service": "Perpanjangan STNK",
  "message": "Butuh bantuan perpanjangan STNK"
}
```

### Reviews

#### Get All Reviews

```http
GET /reviews
```

#### Create Review (Admin)

```http
POST /reviews
Authorization: Bearer {token}
Content-Type: multipart/form-data

{
  "name": "Customer Name",
  "rating": 5,
  "review": "Pelayanan sangat memuaskan!",
  "image": [file]
}
```

### Banners

#### Get All Banners

```http
GET /banners
```

#### Create Banner (Admin)

```http
POST /banners
Authorization: Bearer {token}
Content-Type: multipart/form-data

{
  "title": "Promo Spesial",
  "description": "Diskon 20%",
  "image": [file]
}
```

### Partners

#### Get All Partners

```http
GET /partners
```

#### Create Partner (Admin)

```http
POST /partners
Authorization: Bearer {token}
Content-Type: multipart/form-data

{
  "name": "Partner Name",
  "logo": [file]
}
```

### Queue Management (Admin)

#### Get Pending Queue

```http
GET /admin/queue
Authorization: Bearer {token}
```

#### Get Failed Forms

```http
GET /admin/failed
Authorization: Bearer {token}
```

## 🚀 Deployment

### Frontend (Firebase Hosting)

1. Build aplikasi:

```bash
cd client
npm run build
```

2. Deploy ke Firebase:

```bash
firebase deploy
```

### Backend (Railway/Heroku/VPS)

1. Set environment variables di platform hosting
2. Push code ke repository
3. Platform akan otomatis build dan deploy

### Database (PostgreSQL)

Gunakan managed PostgreSQL dari:

- Supabase
- Railway
- Heroku Postgres
- DigitalOcean

## 🔐 Security Best Practices

1. **Jangan commit file `.env`** ke repository
2. Gunakan **JWT secret yang kuat** di production
3. Enable **HTTPS** di production
4. Update **CORS origins** sesuai domain production
5. Gunakan **rate limiting** untuk mencegah abuse
6. Validasi semua **input dari user**
7. Sanitasi data untuk mencegah **SQL injection**

## 🤝 Contributing

1. Fork repository
2. Buat branch baru (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

## 📝 License

This project is licensed under the ISC License.

## 👥 Author

- **Surya Aji** - [@suryaaji016](https://github.com/suryaaji016)

## 📧 Contact

Untuk pertanyaan atau support, hubungi:

- Email: suryaaji016@gmail.com

## 🙏 Acknowledgments

- React Team
- Express.js Team
- Sequelize Team
- Bootstrap Team
- Semua contributor open source

---

Made with ❤️ by Surya Aji
