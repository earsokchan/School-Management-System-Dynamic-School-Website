<div align="center">

# 🏫 HSKTH — School Website Framework

### **Open-Source Bilingual School Management & Website Platform**

> *A free, open-source, production-ready school website & management system for everyone.*

[![CI](https://github.com/earsokchan/Hun-Sen-Kompong-Tralach-High-School/actions/workflows/nextjs.yml/badge.svg)](https://github.com/earsokchan/Hun-Sen-Kompong-Tralach-High-School/actions)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?logo=typescript)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?logo=mongodb)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

**[🌐 Live Demo](https://sms.builware.app/km) · [🔧 Admin Demo](https://sms.builware.app/admin) · [📖 Documentation](#-table-of-contents) · [🐛 Report Bug](https://github.com/earsokchan/Hun-Sen-Kompong-Tralach-High-School/issues) · [💡 Request Feature](https://github.com/earsokchan/Hun-Sen-Kompong-Tralach-High-School/issues)**

</div>

---

## 🚀 What is HSKTH?

**HSKTH** is a **free and open-source, production-ready school website & management framework** built with modern web technologies. It is designed to be fully **adaptable for any school** around the world — from setup to deployment in minutes.

> ⭐ If this project helps your school, please consider giving it a star on GitHub!

**Why use this framework?**

- 🏗️ **Production-ready** — not a boilerplate; a fully working school platform deployed at a real school.
- 🌏 **Built-in i18n** — ships with Khmer & English; easily extendable to any language.
- 🔒 **Secure by default** — no third-party auth libraries; custom HMAC-signed session system.
- 📦 **Self-contained** — MongoDB + Vercel Blob; no complex infrastructure required.
- 🎨 **Modern UI** — Tailwind CSS + Radix UI; clean, accessible, and responsive out of the box.
- ⚡ **Blazing fast** — Next.js 15 App Router with Incremental Static Regeneration (ISR).
- 🛠️ **Admin dashboard included** — manage all content without touching code.
- 📖 **Open source** — MIT licensed; free to use, fork, and customize.

---
 
## 🧩 Use This as a Framework for Your School

This project is designed to be **forked and adapted**. To use it for your own school:

1. **Fork** this repository on GitHub
2. Update **`src/lib/site.ts`** with your school's name, address, contacts, and social links
3. Update **`src/lib/translations.ts`** with your own language strings
4. Configure your **`.env.local`** with your own MongoDB and Vercel Blob credentials
5. Deploy to **[Vercel](https://vercel.com)** in one click

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/YOUR_SCHOOL_REPO.git
cd YOUR_SCHOOL_REPO
npm install
cp .env.example .env.local
# Edit .env.local with your credentials
npm run dev
```

> 🎓 **Schools using this framework:** [sms.builware.app](https://sms.builware.app/km) · *Add yours by submitting a PR!*

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Architecture](#-project-architecture)
- [Directory Structure](#-directory-structure)
- [Public Pages](#-public-pages)
- [Admin Dashboard](#-admin-dashboard)
- [Database Collections](#-database-collections)
- [API Reference](#-api-reference)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Authentication System](#-authentication-system)
- [Internationalization (i18n)](#-internationalization-i18n)
- [Image & File Uploads](#-image--file-uploads)
- [CI/CD Pipeline](#-cicd-pipeline)
- [Available Scripts](#-available-scripts)
- [School Information](#-school-information)

---

## 🌐 Overview

This is a full-stack web application built with **Next.js 15 (App Router)**. It provides:

- A **public-facing multilingual website** for the school community with pages for news, events, academic programs, teachers, student results, and a photo gallery.
- A **secure admin dashboard** (password + session protected) for school administrators to manage all website content through an intuitive interface — no coding required.

The system uses **MongoDB Atlas** as its database and **Vercel Blob** for cloud-based image and file storage.

---

## ✨ Features

### Public Website
- 🌏 **Bilingual (Khmer/English)** — full localization with automatic locale detection from browser headers and a persistent locale cookie
- 🏠 **Homepage** — hero section, school statistics, featured news, upcoming events, and a campus gallery
- 📰 **News** — school announcements and articles
- 📅 **Events** — upcoming school events with dates and descriptions
- 🎓 **Academics** — academic programs and course information
- 👩‍🏫 **Teachers** — public directory of teachers and staff
- 🖼️ **Gallery** — school photo gallery
- 📊 **Student Results** — publicly searchable examination results
- 🗺️ **Contact** — contact form, address, working hours, and an embedded Google Maps location
- 📱 **Fully Responsive** — mobile-first design that works on all screen sizes

### Admin Dashboard (`/admin`)
- 🔒 **Secure Login** — username + password authentication with signed HTTP-only session cookies (8-hour sessions)
- 📊 **Dashboard Overview** — live statistics, recent news, upcoming events, and latest student results
- 📰 **News Manager** — create, edit, and delete school news articles with image uploads
- 📅 **Events Manager** — manage school events
- 🖼️ **Gallery Manager** — upload and manage photo gallery images
- 🎓 **Academic Programs Manager** — manage academic programs displayed on the website
- 👩‍🏫 **Teacher Manager** — manage the public teacher directory
- 🏫 **Classes Manager** — manage class groups and configurations
- 📚 **Subjects Manager** — manage school subjects
- 🗓️ **Timetable Manager** — manage class timetables
- 👨‍🎓 **Student Manager** — manage internal student records
- 📈 **Results Manager** — manage and publish student examination results
- 👥 **Users Manager** — manage admin user accounts
- 🎭 **Roles Manager** — manage admin roles and permissions
- ⚙️ **Settings** — configure site-wide settings and front-page content
- 🌱 **Data Seeding** — one-click seed of default public content to get started quickly

---

## 🛠 Tech Stack

| Category | Technology | Version |
|---|---|---|
| **Framework** | [Next.js](https://nextjs.org/) | ^15.1.3 |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | ^5.7.2 |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) | ^3.4.17 |
| **UI Primitives** | [Radix UI](https://www.radix-ui.com/) | Various |
| **Icons** | [Lucide React](https://lucide.dev/) | ^0.460.0 |
| **Database** | [MongoDB](https://www.mongodb.com/) (via Atlas) | ^7.6.0 |
| **File Storage** | [Vercel Blob](https://vercel.com/docs/storage/vercel-blob) | ^2.8.0 |
| **Runtime** | [Node.js](https://nodejs.org/) | ≥ 18 (20 recommended) |
| **Package Manager** | npm | — |

**Key Libraries:**
- `class-variance-authority` — for building variant-based UI components
- `clsx` + `tailwind-merge` — for clean, conditional class name management
- `@radix-ui/react-dialog`, `@radix-ui/react-select`, `@radix-ui/react-avatar`, etc. — accessible, headless UI components

---

## 🏗 Project Architecture

```
                    ┌─────────────────────────────────┐
                    │         Next.js App Router       │
                    └─────────────┬───────────────────┘
                                  │
          ┌───────────────────────┼──────────────────────┐
          │                       │                      │
  ┌───────▼──────┐      ┌────────▼────────┐   ┌─────────▼──────────┐
  │  Public Site │      │  Admin Dashboard │   │    REST API Routes  │
  │  /[lang]/... │      │  /admin/...      │   │    /api/...         │
  └───────┬──────┘      └────────┬────────┘   └─────────┬──────────┘
          │                      │                       │
          │              ┌───────▼────────┐              │
          │              │  Admin Auth    │              │
          │              │  (Session      │              │
          │              │   Cookie)      │              │
          │              └───────┬────────┘              │
          │                      │                       │
          └──────────────────────┼───────────────────────┘
                                  │
                    ┌─────────────▼───────────────┐
                    │     Server Actions / DB Layer │
                    └──────────┬──────────┬────────┘
                               │          │
                    ┌──────────▼──┐  ┌────▼───────────┐
                    │  MongoDB    │  │  Vercel Blob    │
                    │  (Atlas)    │  │  (Images/Files) │
                    └─────────────┘  └─────────────────┘
```

**Key architectural decisions:**
- **App Router** with React Server Components (RSC) for optimal performance and SEO.
- **Server Actions** for all data mutation operations (create, update, delete), avoiding unnecessary API round-trips.
- **Middleware** handles locale detection/redirection and admin route protection before requests hit any page.
- **ISR (Incremental Static Regeneration)** via `revalidatePath` — public pages are automatically revalidated when admin content changes.
- A unified **generic collection API** (`/api/content/[collection]`) handles all MongoDB collections through one flexible route.

---

## 📁 Directory Structure

```
.
├── .github/
│   └── workflows/
│       └── nextjs.yml          # CI/CD: Lint, Typecheck, Build
├── public/                     # Static assets (images, favicon, etc.)
├── scripts/
│   └── generate-images.mjs     # Utility to generate placeholder images
├── src/
│   ├── app/
│   │   ├── [lang]/             # Public bilingual pages (en / km)
│   │   │   ├── about/          # About the school
│   │   │   ├── academics/      # Academic programs
│   │   │   ├── contact/        # Contact page
│   │   │   ├── events/         # School events
│   │   │   ├── gallery/        # Photo gallery
│   │   │   ├── news/           # School news
│   │   │   ├── results/        # Student exam results
│   │   │   ├── students/       # Student life section
│   │   │   ├── teachers/       # Teacher directory
│   │   │   ├── layout.tsx      # Shared layout with navigation & footer
│   │   │   └── page.tsx        # Homepage
│   │   ├── admin/              # Admin dashboard (protected)
│   │   │   ├── academics/      # Manage academic programs
│   │   │   ├── classes/        # Manage classes
│   │   │   ├── events/         # Manage events
│   │   │   ├── gallery/        # Manage gallery
│   │   │   ├── login/          # Admin login page
│   │   │   ├── news/           # Manage news articles
│   │   │   ├── pages/          # Manage front-page content sections
│   │   │   ├── results/        # Manage student results
│   │   │   ├── roles/          # Manage admin roles
│   │   │   ├── settings/       # Site settings
│   │   │   ├── students/       # Manage student records
│   │   │   ├── subjects/       # Manage subjects
│   │   │   ├── teachers/       # Manage teacher directory
│   │   │   ├── timetable/      # Manage timetables
│   │   │   ├── users/          # Manage admin users
│   │   │   ├── layout.tsx      # Admin shell layout with sidebar
│   │   │   └── page.tsx        # Admin dashboard home
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   └── login/      # POST /api/auth/login
│   │   │   ├── content/
│   │   │   │   ├── [collection]/ # Generic REST API for all collections
│   │   │   │   └── seed/       # POST /api/content/seed
│   │   │   ├── health/         # GET /api/health (health check)
│   │   │   └── upload/         # POST /api/upload (image upload)
│   │   └── globals.css         # Global styles & CSS variables
│   ├── components/
│   │   ├── admin/              # Admin dashboard React components
│   │   │   ├── AdminLoginForm.tsx
│   │   │   ├── AdminShell.tsx  # Sidebar, navigation, layout wrapper
│   │   │   ├── ClassesManager.tsx
│   │   │   ├── DashboardStats.tsx
│   │   │   ├── NewsManager.tsx
│   │   │   ├── ResultsManager.tsx
│   │   │   ├── StudentManager.tsx
│   │   │   ├── TeacherManager.tsx
│   │   │   ├── TimetableManager.tsx
│   │   │   └── ...
│   │   ├── home/               # Public homepage section components
│   │   │   ├── Hero.tsx
│   │   │   ├── AboutSection.tsx
│   │   │   ├── NewsSection.tsx
│   │   │   ├── EventsSection.tsx
│   │   │   ├── GallerySection.tsx
│   │   │   ├── ContactSection.tsx
│   │   │   ├── StatsSection.tsx
│   │   │   ├── TeachersSection.tsx
│   │   │   ├── StudentResults.tsx
│   │   │   └── ...
│   │   ├── layout/             # Shared layout components (Nav, Footer)
│   │   └── ui/                 # Reusable generic UI components
│   ├── data/                   # TypeScript data type definitions
│   ├── hooks/                  # Custom React hooks
│   ├── lib/
│   │   ├── admin-translations.ts # Translations for admin UI
│   │   ├── cn.ts               # Tailwind class merging utility
│   │   ├── fonts.ts            # Google Fonts configuration
│   │   ├── format.ts           # Date & number formatting utilities
│   │   ├── i18n.ts             # Locale types, helpers, Khmer numeral converter
│   │   ├── seo.ts              # SEO metadata utilities
│   │   ├── site.ts             # School config (name, address, contacts, routes)
│   │   ├── translations.ts     # All public UI text in Khmer & English
│   │   ├── utils.ts            # General utilities
│   │   └── server/             # Server-only modules (never imported on client)
│   │       ├── actions.ts      # Next.js Server Actions for CRUD operations
│   │       ├── admin-auth.ts   # Session creation, validation, and cookie management
│   │       ├── blob.ts         # Vercel Blob image upload/delete service
│   │       ├── collections.ts  # Generic MongoDB collection CRUD layer
│   │       ├── content-validation.ts # Input sanitization & validation
│   │       ├── env.ts          # Safe environment variable access helpers
│   │       ├── mongodb.ts      # MongoDB connection pooling
│   │       ├── public-content.ts # Fetch public-facing content from DB
│   │       └── seed.ts         # Default data seeding logic
│   └── middleware.ts           # Locale detection + admin route protection
├── .env.example                # Example environment variable template
├── .env.local                  # Your local environment variables (not committed)
├── next.config.js              # Next.js configuration
├── tailwind.config.ts          # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
└── package.json
```

---

## 🌍 Public Pages

All public pages are available at `/{locale}/path` where `{locale}` is either `en` (English) or `km` (Khmer). Visiting `/` will automatically redirect based on the browser's language preference.

| Route | Description |
|---|---|
| `/{locale}` | Homepage with hero, stats, news, events, gallery |
| `/{locale}/about` | School history, mission, leadership |
| `/{locale}/academics` | Academic programs and curriculum |
| `/{locale}/teachers` | Public teacher directory |
| `/{locale}/students` | Student life information |
| `/{locale}/news` | School news and announcements |
| `/{locale}/events` | Upcoming school events |
| `/{locale}/gallery` | School photo gallery |
| `/{locale}/results` | Student examination results lookup |
| `/{locale}/contact` | Contact form, map, and working hours |

---

## 🔧 Admin Dashboard

The admin panel is located at `/admin` and is protected. All routes under `/admin` require an active session cookie. Unauthenticated users are automatically redirected to `/admin/login`.

| Admin Route | Description |
|---|---|
| `/admin` | Dashboard overview with stats and recent activity |
| `/admin/login` | Admin login page (username + password) |
| `/admin/news` | Create, edit, delete news articles |
| `/admin/events` | Manage school events |
| `/admin/gallery` | Upload and manage gallery images |
| `/admin/academics` | Manage academic programs |
| `/admin/teachers` | Manage public teacher directory |
| `/admin/classes` | Manage class groups |
| `/admin/subjects` | Manage school subjects |
| `/admin/timetable` | Manage class timetables |
| `/admin/students` | Manage internal student records |
| `/admin/results` | Manage and publish examination results |
| `/admin/users` | Manage admin user accounts |
| `/admin/roles` | Manage admin roles and permissions |
| `/admin/settings` | Configure site settings |
| `/admin/pages` | Control front-page section content |

---

## 🗄 Database Collections

The application uses MongoDB with the following collections, all managed through a generic abstraction layer:

| Collection | Description | Public? |
|---|---|---|
| `news` | School news articles | ✅ Yes |
| `events` | School events | ✅ Yes |
| `gallery` | Photo gallery images | ✅ Yes |
| `academic-programs` | Academic programs info | ✅ Yes |
| `public-teachers` | Teacher directory (public view) | ✅ Yes |
| `public-results` | Exam results (public view) | ✅ Yes |
| `admin-teachers` | Full teacher records (admin only) | 🔒 Admin |
| `admin-students` | Full student records (admin only) | 🔒 Admin |
| `admin-results` | Full results data (admin only) | 🔒 Admin |
| `classes` | Class configurations | 🔒 Admin |
| `subjects` | Subject definitions | 🔒 Admin |
| `timetable` | Class timetable entries | 🔒 Admin |
| `roles` | Admin role definitions | 🔒 Admin |
| `users` | Admin user accounts | 🔒 Admin |
| `settings` | Site-wide configuration | 🔒 Admin |

When a public collection is updated, `revalidatePath` is called automatically to regenerate the affected public pages via ISR.

---

## 🔌 API Reference

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/auth/login` | None | Log in with username + password, returns session cookie |
| `GET` | `/api/content/[collection]` | 🔒 Admin | List all documents in a collection |
| `POST` | `/api/content/[collection]` | 🔒 Admin | Create a new document in a collection |
| `PUT` | `/api/content/[collection]` | 🔒 Admin | Update an existing document |
| `DELETE` | `/api/content/[collection]` | 🔒 Admin | Delete a document |
| `POST` | `/api/content/seed` | 🔒 Admin | Seed default content into public collections |
| `POST` | `/api/upload` | 🔒 Admin | Upload an image to Vercel Blob |
| `GET` | `/api/health` | None | Health check endpoint |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18 or higher (v20 recommended — matches CI)
- **npm** (comes with Node.js)
- A **MongoDB Atlas** cluster (or local MongoDB instance)
- A **Vercel Blob** store (for image uploads)

### Installation

**1. Clone the repository:**
```bash
git clone <repository-url>
cd "Hun Sen Kompong Tralach High School"
```

**2. Install dependencies:**
```bash
npm install
```

**3. Configure environment variables:**
```bash
cp .env.example .env.local
```
Then edit `.env.local` with your values (see [Environment Variables](#-environment-variables) below).

**4. Start the development server:**
```bash
npm run dev
```

The website will be available at **http://localhost:3000**.  
It will automatically redirect to `http://localhost:3000/en` or `http://localhost:3000/km` based on your browser language.

---

## 🔑 Environment Variables

Copy `.env.example` to `.env.local` and fill in the values:

```env
# ─────────────────────────────────────────
# Database — MongoDB Atlas Connection String
# ─────────────────────────────────────────
MONGODB_URI="mongodb+srv://<username>:<password>@<cluster>.mongodb.net/?retryWrites=true&w=majority"

# ─────────────────────────────────────────
# File Storage — Vercel Blob
# ─────────────────────────────────────────
BLOB_STORE_ID="store_xxxxxxxxxxxxxxxxxxxx"
BLOB_READ_WRITE_TOKEN="vercel_blob_rw_xxxxxxxxxxxxxxxxxxxx"

# ─────────────────────────────────────────
# Admin Authentication
# ─────────────────────────────────────────
ADMIN_USERNAME="admin"
ADMIN_PASSWORD="your_secure_password_here"

# Must be at least 32 characters long — used to sign session tokens (HMAC-SHA256).
# You can generate one with: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
ADMIN_SESSION_SECRET="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
```

### Variable Reference

| Variable | Required | Description |
|---|---|---|
| `MONGODB_URI` | ✅ Yes | Full MongoDB connection string (Atlas or self-hosted) |
| `BLOB_STORE_ID` | ✅ Yes | Your Vercel Blob store ID |
| `BLOB_READ_WRITE_TOKEN` | ✅ Yes | Vercel Blob read/write API token |
| `ADMIN_USERNAME` | ✅ Yes | Username for the admin login page |
| `ADMIN_PASSWORD` | ✅ Yes | Password for the admin login page |
| `ADMIN_SESSION_SECRET` | ✅ Yes | A secret string (min. 32 chars) for signing session tokens |

> **Security tip:** Never commit `.env.local` to version control. It is already listed in `.gitignore`. Always use strong, unique values for `ADMIN_PASSWORD` and `ADMIN_SESSION_SECRET` in production.

To generate a secure `ADMIN_SESSION_SECRET`, run:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## 🔒 Authentication System

The admin authentication is a custom, lightweight session system built entirely using Node.js built-ins and Next.js cookies — no third-party auth libraries required.

**How it works:**

1. The admin submits their **username** and **password** on `/admin/login`.
2. The server validates credentials against `ADMIN_USERNAME` and `ADMIN_PASSWORD` using `timingSafeEqual` (prevents timing attacks).
3. If valid, the server creates a **signed session token** — a Base64-encoded JSON payload (`{ expiresAt }`) signed with `HMAC-SHA256` using the `ADMIN_SESSION_SECRET`.
4. The token is stored in an **HTTP-only, Secure, SameSite=Lax cookie** named `hskth_admin_session`, valid for **8 hours**.
5. The **middleware** (`src/middleware.ts`) checks for this cookie on every request to `/admin/*`. If missing or invalid, it redirects to `/admin/login`.
6. All server actions also independently validate the session before performing any data operations.

**Security properties:**
- ✅ Passwords are never stored — only compared in memory
- ✅ Timing-safe comparisons prevent brute-force timing attacks
- ✅ Sessions expire after 8 hours
- ✅ HTTP-only cookies prevent JavaScript access (XSS protection)
- ✅ HMAC-signed tokens prevent forgery

---

## 🌐 Internationalization (i18n)

The site supports two locales: **English (`en`)** and **Khmer (`km`)**.

**How it works:**

- All public pages live under the dynamic `[lang]` segment: `/en/...` and `/km/...`.
- The **middleware** auto-detects the preferred locale from the `Accept-Language` request header and redirects accordingly.
- The chosen locale is persisted in a **cookie** (`hskth_locale`, 1-year expiry) so returning users stay in their preferred language.
- All UI strings are stored in `src/lib/translations.ts` as key-value pairs for both `en` and `km`.
- Khmer numeral conversion is handled by `toKhmerNumerals()` in `src/lib/i18n.ts`.

---

## 🖼 Image & File Uploads

Images are uploaded and stored using **Vercel Blob**:

- Maximum file size: **10 MB**
- Supported formats: **JPEG, PNG, WebP, GIF, AVIF**
- Files are stored in organized folders (e.g., `images/`, `gallery/`) with UUID-based filenames to avoid conflicts.
- Uploaded images are publicly accessible via a CDN URL from `*.public.blob.vercel-storage.com`.
- The Next.js `images.remotePatterns` config in `next.config.js` allows these external images to be used with `<Image />`.

---

## ⚙️ CI/CD Pipeline

The project uses **GitHub Actions** for continuous integration. The workflow (`.github/workflows/nextjs.yml`) runs automatically on every push to `main` and on all pull requests.

**Pipeline steps:**

```
Push to main / Pull Request
         │
         ▼
  1. Checkout code
         │
         ▼
  2. Setup Node.js 20 (with npm cache)
         │
         ▼
  3. npm ci (clean install)
         │
         ▼
  4. npm run lint (ESLint)
         │
         ▼
  5. npx tsc --noEmit (TypeScript type check)
         │
         ▼
  6. npm run build (Next.js production build)
```

All steps must pass for a successful CI run.

---

## 📜 Available Scripts

| Script | Command | Description |
|---|---|---|
| **Development** | `npm run dev` | Starts the Next.js dev server at `http://localhost:3000` with hot-reload |
| **Production Build** | `npm run build` | Compiles and optimizes the application for production |
| **Production Start** | `npm run start` | Starts the production server (requires a build first) |
| **Linting** | `npm run lint` | Runs ESLint to check for code quality and style issues |
| **Image Generation** | `npm run images` | Runs the `scripts/generate-images.mjs` utility script |

---

## 🏫 School Information

| Detail | Value |
|---|---|
| **School Name (EN)** | Hun Sen Kampong Tralach High School |
| **School Name (KM)** | វិទ្យាល័យ ហ៊ុន សែន កំពង់ត្រឡាច |
| **Motto (EN)** | Building Knowledge. Inspiring the Future. |
| **Address** | Salalek Bram Village, Or Russei Commune, Kampong Tralach District, Kampong Chhnang Province, Cambodia |
| **Email** | info@kp-tralach.org |
| **Phone** | +855 76 647 8888 / +855 17 821 588 |
| **Telegram** | [t.me/kampongtralach_bot](https://t.me/kampongtralach_bot) |
| **Working Hours** | Monday – Saturday, 07:00–11:00 & 13:00–17:00 |
| **Academic Year** | 2025–2026 |
| **Ministry** | Ministry of Education, Youth and Sport — Cambodia |

---

*© Hun Sen Kampong Tralach High School. Developed with ❤️ using Next.js.*
