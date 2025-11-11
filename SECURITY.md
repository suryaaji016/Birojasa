# 🔒 Security Documentation - Vinnojaya Birojasa

## Overview
Dokumentasi ini menjelaskan fitur-fitur keamanan yang telah diimplementasikan pada aplikasi Vinnojasa Birojasa.

---

## ✅ Fitur Keamanan yang Telah Diimplementasikan

### 1. **Authentication & Authorization**
- ✅ JWT (JSON Web Token) authentication
- ✅ Token expiration (24 jam)
- ✅ Kode unik untuk admin registration/login: `@Vinno1Jaya2`
- ✅ Password hashing menggunakan bcrypt (salt rounds: 10)
- ✅ Protected routes untuk endpoint admin

### 2. **Rate Limiting**
- ✅ Login: Maksimal 5 percobaan per 15 menit
- ✅ Register: Maksimal 3 registrasi per 1 jam
- ✅ API umum: Maksimal 100 request per 15 menit

### 3. **Input Validation & Sanitization**
- ✅ Email format validation
- ✅ Password minimum 6 karakter
- ✅ Phone number validation (10-13 digit)
- ✅ Input sanitization untuk mencegah XSS
- ✅ NoSQL injection prevention (express-mongo-sanitize)

### 4. **Security Headers**
- ✅ Helmet.js untuk security headers:
  - X-Content-Type-Options: nosniff
  - X-Frame-Options: DENY
  - X-XSS-Protection: 1; mode=block
  - Strict-Transport-Security (HSTS)

### 5. **CORS Configuration**
- ✅ Whitelist domain yang diizinkan:
  - `http://localhost:5173`
  - `http://localhost:5174`
  - `https://vinnojaya.web.app`
  - `https://vinnojaya.firebaseapp.com`

### 6. **Environment Variables**
- ✅ Sensitive data disimpan di `.env`
- ✅ `.env` ditambahkan ke `.gitignore`
- ✅ `.env.example` sebagai template

### 7. **Payload Limits**
- ✅ JSON payload dibatasi maksimal 10MB
- ✅ URL-encoded payload dibatasi maksimal 10MB

---

## 🔐 Environment Variables yang Diperlukan

```bash
# Security
JWT_SECRET=your_strong_secret_key_here
ADMIN_UNIQUE_CODE=@Vinno1Jaya2

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
FROM_EMAIL=your_email@gmail.com

# Server
PORT=3000
```

---

## 🚨 Best Practices

### Untuk Production:

1. **JWT Secret**
   - Gunakan secret key yang kuat (minimal 32 karakter)
   - Generator: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

2. **HTTPS**
   - Selalu gunakan HTTPS di production
   - Gunakan SSL/TLS certificate (Let's Encrypt gratis)

3. **Environment Variables**
   - Jangan pernah commit file `.env` ke repository
   - Gunakan secret management (AWS Secrets Manager, etc.)

4. **Database**
   - Gunakan database user dengan privilege terbatas
   - Enable SSL connection ke database

5. **Monitoring**
   - Log semua authentication attempts
   - Monitor untuk suspicious activities
   - Set up alerts untuk failed login attempts

6. **Updates**
   - Selalu update dependencies secara berkala
   - Run `npm audit` dan fix vulnerabilities

---

## 🛡️ Security Checklist

- [x] Password hashing dengan bcrypt
- [x] JWT authentication dengan expiration
- [x] Rate limiting untuk mencegah brute force
- [x] Input validation & sanitization
- [x] Security headers dengan Helmet
- [x] CORS configuration
- [x] Environment variables untuk sensitive data
- [x] `.gitignore` untuk file sensitif
- [x] Payload size limits
- [x] NoSQL injection prevention
- [x] Kode unik untuk admin access

---

## 📝 Catatan Penting

1. **Kode Unik Admin**: `@Vinno1Jaya2`
   - Simpan kode ini dengan aman
   - Hanya bagikan kepada admin yang berwenang
   - Dapat diubah melalui environment variable `ADMIN_UNIQUE_CODE`

2. **JWT Token**
   - Token berlaku selama 24 jam
   - User harus login ulang setelah token expired

3. **Rate Limiting**
   - Jika terlalu banyak percobaan login, tunggu 15 menit
   - Jika terlalu banyak registrasi, tunggu 1 jam

---

## 🔄 Maintenance

### Update Dependencies
```bash
cd server
npm update
npm audit fix
```

### Generate New JWT Secret
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Check Security Vulnerabilities
```bash
cd server
npm audit
```

---

## 📞 Contact

Jika menemukan security issue, segera hubungi:
- Email: suryaaji016@gmail.com

---

**Last Updated**: November 11, 2025
