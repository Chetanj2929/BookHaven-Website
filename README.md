# BookHaven — Full Stack Setup Guide

## Architecture Overview

```
frontend/
├── index.html      ← Your existing HTML (unchanged)
├── styles.css      ← Your existing CSS (unchanged)
├── script.js       ← Your existing JS (unchanged)
└── api.js          ← NEW: patches script.js with real API calls

backend/
├── manage.py
├── db.sqlite3      ← SQLite database (auto-created)
├── requirements.txt
├── bookhaven/      ← Django project settings
├── books/          ← Book catalog, trending, offers
├── users/          ← Auth (register/login/JWT)
├── orders/         ← Cart & orders
└── reviews/        ← Book reviews
```

---

## Quick Start

### One-Command Launch (Recommended)

```powershell
# From the "BookHaven website" root directory:
.\start.ps1
```

This script starts **MySQL 8.4** and the **Django server** together automatically.

---

### Manual Start

#### Step 1 — Start MySQL
```powershell
Start-Process "C:\Program Files\MySQL\MySQL Server 8.4\bin\mysqld.exe" -ArgumentList "--datadir=C:\MySQL\data" -WindowStyle Hidden
```

#### Step 2 — Start Django
```powershell
cd "BookHaven website\backend"
.\venv\Scripts\Activate.ps1
python manage.py runserver 8000
```

Server runs at: **http://127.0.0.1:8000**

### Open the Frontend

Simply open `frontend/index.html` in your browser.
The `api.js` automatically connects to Django → MySQL.

---

## Django Admin Panel

URL: **http://127.0.0.1:8000/admin/**

| Credential | Value |
|-----------|-------|
| Email | `admin@bookhaven.com` |
| Password | `admin123` |

> ⚠️ Change the admin password in production!

---

## API Endpoints Reference

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register/` | Register new user |
| POST | `/api/auth/login/` | Login → JWT tokens |
| POST | `/api/auth/logout/` | Logout (blacklists token) |
| GET/PUT | `/api/auth/me/` | View/update profile |
| POST | `/api/auth/google/` | Google OAuth (placeholder) |
| POST | `/api/auth/token/refresh/` | Refresh JWT token |

### Books & Catalog
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/books/` | All books (filter: `?category=Fiction`) |
| GET | `/api/books/<id>/` | Single book detail |
| GET | `/api/books/trending/` | Top 8 trending books |
| GET | `/api/books/ebooks/` | eBook-only listing |
| GET | `/api/books/offers/` | Active promotional offers |

### Cart
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/orders/cart/` | View user's cart |
| POST | `/api/orders/cart/add/` | Add item `{book_id, format, quantity}` |
| PUT | `/api/orders/cart/update/<id>/` | Update quantity `{quantity}` |
| DELETE | `/api/orders/cart/remove/<id>/` | Remove item |
| DELETE | `/api/orders/cart/clear/` | Clear entire cart |

### Orders
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/orders/` | List user's orders |
| POST | `/api/orders/checkout/` | Place order from cart |
| GET | `/api/orders/<id>/` | Order detail + tracking |
| POST | `/api/orders/<id>/cancel/` | Cancel order |

### Reviews
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/reviews/?book=<id>` | Reviews for a book |
| POST | `/api/reviews/create/` | Submit review `{book, rating, text}` |
| DELETE | `/api/reviews/<id>/` | Delete own review |

---

## Coupon Codes (Working)

| Code | Discount |
|------|---------|
| `CLASSIC30` | 30% off |
| `SELFHELP150` | ₹150 off |
| `EBOOK25` | 25% off |
| `NEWREADER40` | 40% off |
| `WEEKEND200` | ₹200 off |

---

## Re-Seeding the Database

```powershell
# Re-seed books/trending/offers (safe to run multiple times)
python manage.py seed_books

# Clear everything and re-seed fresh
python manage.py seed_books --clear
```

---

## Useful Commands

```powershell
# Create a new superuser
python manage.py createsuperuser

# Open Django shell
python manage.py shell

# Run tests
python manage.py test

# Check for issues
python manage.py check
```

---

## Production Notes

Before deploying to production:

1. Change `SECRET_KEY` in `settings.py`
2. Set `DEBUG = False`
3. Set `CORS_ALLOW_ALL_ORIGINS = False` and specify allowed origins
4. Use PostgreSQL instead of SQLite
5. Use `python manage.py collectstatic` for static files
6. Use gunicorn or uWSGI as WSGI server
