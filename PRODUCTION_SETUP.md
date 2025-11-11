# 🔐 Setup Keamanan untuk Production

## ⚠️ PENTING - Lakukan Sebelum Deploy

### 1. Generate JWT Secret yang Kuat

Jalankan command ini untuk generate secret key yang kuat:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copy hasil output dan tambahkan ke file `.env`:

```bash
JWT_SECRET=hasil_generate_di_sini
```

### 2. Update File .env

Edit file `server/.env` dan pastikan semua nilai sudah benar:

```bash
# Security - GANTI DENGAN SECRET YANG KUAT!
JWT_SECRET=hasil_generate_dari_step_1
ADMIN_UNIQUE_CODE=@Vinno1Jaya2

# Email - GANTI DENGAN EMAIL ANDA
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=email_anda@gmail.com
SMTP_PASS=app_password_dari_google
FROM_EMAIL=email_anda@gmail.com

# Email routing
EMAIL_DEFAULT=email_anda@gmail.com
EMAIL_VINNOJAYA_PEKAYON=email_cabang1@gmail.com
EMAIL_VINNOJAYA_TAMAN_GALAXY=email_cabang2@gmail.com

# Server
PORT=3000
```

### 3. Hapus .env dari Git History (CRITICAL!)

File `.env` sudah ter-commit ke repository sebelumnya. Hapus dari history:

```bash
# Backup file .env terlebih dahulu
cp server/.env server/.env.backup

# Hapus dari git history
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch server/.env" \
  --prune-empty --tag-name-filter cat -- --all

# Atau gunakan git-filter-repo (recommended):
# git filter-repo --path server/.env --invert-paths

# Force push ke remote
git push origin --force --all
```

### 4. Update CORS Origins

Edit `server/app.js` dan tambahkan domain production Anda:

```javascript
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://vinnojaya.web.app",
  "https://vinnojaya.firebaseapp.com",
  "https://domain-production-anda.com" // Tambahkan domain Anda
];
```

### 5. Ganti Email Password

Email password di file `.env` sudah terekspos. Segera:

1. Buka Google Account Settings
2. Buat App Password baru
3. Update `SMTP_PASS` di `.env` dengan password baru
4. Hapus app password yang lama

### 6. Install Dependencies

```bash
cd server
npm install
```

### 7. Test Security

Jalankan server dan test:

```bash
cd server
npm start
```

Test endpoints:
- ❌ POST `/users/register` tanpa kodeUnik → Harus gagal (403)
- ❌ POST `/users/login` tanpa kodeUnik → Harus gagal (403)
- ✅ POST `/users/register` dengan kodeUnik benar → Harus berhasil
- ✅ POST `/users/login` dengan kodeUnik benar → Harus berhasil

### 8. Production Checklist

- [ ] JWT_SECRET sudah diganti dengan yang kuat
- [ ] File `.env` sudah dihapus dari git history
- [ ] Email password sudah diganti
- [ ] CORS origins sudah include domain production
- [ ] HTTPS sudah enabled (gunakan Let's Encrypt)
- [ ] Database credentials aman
- [ ] `npm audit` sudah dijalankan dan issue sudah diperbaiki
- [ ] Rate limiting sudah aktif
- [ ] Monitoring & logging sudah disetup

### 9. Monitoring

Setup monitoring untuk:
- Failed login attempts
- Rate limit hits
- API errors
- Server uptime

Recommended tools:
- PM2 untuk process management
- Winston untuk logging
- Sentry untuk error tracking

### 10. Backup

Setup automatic backup untuk:
- Database
- Uploads folder
- Environment variables (di tempat aman, bukan git!)

---

## 🚀 Deploy ke Production

### Menggunakan PM2 (Recommended)

```bash
# Install PM2
npm install -g pm2

# Start server dengan PM2
cd server
pm2 start server.js --name "birojasa-api"

# Auto restart on reboot
pm2 startup
pm2 save

# View logs
pm2 logs birojasa-api

# Monitor
pm2 monit
```

### Environment Variables di Hosting

Jika menggunakan cloud hosting (Heroku, Railway, Render, dll):

1. Jangan commit file `.env`
2. Set environment variables melalui dashboard hosting
3. Pastikan semua variable sudah diset

---

## 🔒 Security Best Practices

1. **Jangan pernah** commit file `.env` ke Git
2. **Selalu** gunakan HTTPS di production
3. **Update** dependencies secara berkala: `npm update && npm audit fix`
4. **Monitor** logs untuk suspicious activities
5. **Backup** data secara berkala
6. **Rotate** secrets (JWT, API keys) secara periodik
7. **Limit** database user privileges
8. **Enable** firewall di server

---

## 📞 Support

Jika ada pertanyaan atau menemukan security issue:
- Email: suryaaji016@gmail.com

---

**Created**: November 11, 2025
