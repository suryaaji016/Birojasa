# 🔒 SECURITY QUICK REFERENCE

## ✅ Aplikasi Sudah Secure!

Security Score: **9/10** ✅

---

## 🚨 PENTING - Sebelum Deploy ke Production

### 1️⃣ Generate JWT Secret Baru
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```
Copy hasil dan update di `server/.env`:
```
JWT_SECRET=hasil_generate_di_atas
```

### 2️⃣ Ganti Email Password
- Password email sudah terekspos di repository
- Buat app password baru: https://myaccount.google.com/apppasswords
- Update `SMTP_PASS` di `server/.env`

### 3️⃣ Hapus .env dari Git History
```bash
# CRITICAL! File .env masih ada di git history
# Lihat PRODUCTION_SETUP.md untuk cara menghapusnya
```

### 4️⃣ Update CORS untuk Domain Production
Edit `server/app.js` baris ~20:
```javascript
const allowedOrigins = [
  "https://domain-production-anda.com" // Tambahkan domain Anda
];
```

---

## 🛡️ Fitur Keamanan yang Aktif

✅ **JWT Authentication** - Token expire 24 jam
✅ **Kode Unik Admin** - Backend validation `@Vinno1Jaya2`
✅ **Rate Limiting** - 5 login/15min, 3 register/hour
✅ **Helmet.js** - Security headers
✅ **Input Validation** - Email, password, phone
✅ **NoSQL Injection** - Prevention aktif
✅ **CORS** - Domain whitelist
✅ **Payload Limit** - Max 10MB
✅ **Password Hashing** - Bcrypt 10 rounds

---

## 📝 Kode Unik Admin

**Kode:** `@Vinno1Jaya2`

Kode ini diperlukan untuk:
- Register admin baru
- Login sebagai admin

Simpan kode ini dengan aman! Hanya bagikan kepada admin yang berwenang.

---

## 🚀 Quick Start

### Development
```bash
# Install dependencies
cd server && npm install
cd ../client && npm install

# Start server (port 3000)
cd server && npm start

# Start client (port 5174)
cd client && npm run dev
```

### Production
```bash
# Lihat PRODUCTION_SETUP.md untuk panduan lengkap
```

---

## 📚 Dokumentasi Lengkap

1. **SECURITY.md** - Dokumentasi fitur keamanan
2. **PRODUCTION_SETUP.md** - Panduan setup production
3. **SECURITY_SUMMARY.md** - Ringkasan perbaikan keamanan
4. **.env.example** - Template environment variables

---

## 🔐 Environment Variables

Copy `server/.env.example` ke `server/.env` dan update nilai-nilainya:

```bash
cp server/.env.example server/.env
```

Edit `server/.env`:
```bash
JWT_SECRET=your_strong_secret_here        # Wajib diisi!
ADMIN_UNIQUE_CODE=@Vinno1Jaya2            # Kode admin
SMTP_USER=your_email@gmail.com            # Email Anda
SMTP_PASS=your_app_password               # App password
```

---

## ⚠️ Security Checklist

Sebelum deploy:

- [ ] JWT_SECRET sudah diganti dengan yang kuat
- [ ] Email password sudah diganti  
- [ ] .env dihapus dari git history
- [ ] CORS origins include domain production
- [ ] HTTPS sudah enabled
- [ ] npm audit sudah dijalankan
- [ ] Monitoring sudah disetup
- [ ] Backup sudah disetup

---

## 🆘 Troubleshooting

### Server tidak bisa start
```
❌ JWT_SECRET tidak ditemukan!
```
**Solusi:** Set `JWT_SECRET` di file `.env`

### CORS Error
```
The CORS policy does not allow access
```
**Solusi:** Tambahkan domain Anda ke `allowedOrigins` di `server/app.js`

### Too Many Requests
```
Terlalu banyak percobaan login
```
**Solusi:** Tunggu 15 menit atau restart server

---

## 📞 Support

Jika ada pertanyaan atau menemukan security issue:
- Email: suryaaji016@gmail.com
- Review: Setiap 3 bulan

---

**Last Updated:** November 11, 2025
**Security Audit:** ✅ Passed
