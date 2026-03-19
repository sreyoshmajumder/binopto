<!-- HEADER BANNER -->
<div align="center">

![Header](https://capsule-render.vercel.app/api?type=waving&color=0:050510,40:0c0c1e,70:1a1040,100:08081a&height=250&section=header&text=🔵%20Binopto&fontSize=60&fontColor=818cf8&fontAlignY=38&desc=A%20Full-Stack%20Creator%20Marketplace%20%7C%20React%2019%20%2B%20Supabase%20%2B%20Framer%20Motion%20%2B%20Tailwind&descAlignY=62&descColor=6366f1&animation=fadeIn)

<br/>

[![React](https://img.shields.io/badge/React-19.2-050510?style=for-the-badge&logo=react&logoColor=61dafb)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-7.3-050510?style=for-the-badge&logo=vite&logoColor=a78bfa)](https://vitejs.dev)
[![Supabase](https://img.shields.io/badge/Supabase-2.93-050510?style=for-the-badge&logo=supabase&logoColor=3ecf8e)](https://supabase.com)
[![Tailwind](https://img.shields.io/badge/Tailwind-3.4-050510?style=for-the-badge&logo=tailwindcss&logoColor=38bdf8)](https://tailwindcss.com)
[![Framer Motion](https://img.shields.io/badge/Framer%20Motion-12.29-050510?style=for-the-badge&logo=framer&logoColor=818cf8)](https://framer.com/motion)
[![React Router](https://img.shields.io/badge/React%20Router-7.13-050510?style=for-the-badge&logo=reactrouter&logoColor=f43f5e)](https://reactrouter.com)
[![License](https://img.shields.io/badge/License-MIT-050510?style=for-the-badge&logoColor=818cf8)](LICENSE)

<br/>

> **🔵 Binopto is a production-ready, full-stack freelance marketplace connecting creative talent — video editors, designers, motion artists, scriptwriters — with companies and brands looking for work. Powered by React 19, Vite 7, Supabase (Auth + Postgres + Storage + Row Level Security), Framer Motion animations, Tailwind CSS, and React Router 7.**

<br/>

![Users](https://img.shields.io/badge/Users-Creators%20%26%20Companies-818cf8?style=flat-square&labelColor=050510)
![Auth](https://img.shields.io/badge/Auth-Supabase%20JWT-3ecf8e?style=flat-square&labelColor=050510)
![DB](https://img.shields.io/badge/DB-Postgres%20%2B%20RLS%20on%204%20Tables-6366f1?style=flat-square&labelColor=050510)
![Storage](https://img.shields.io/badge/Storage-Avatars%20%2B%20Resumes-a78bfa?style=flat-square&labelColor=050510)

</div>

---

## 📋 Table of Contents

| | Section |
|---|---|
| 🎯 | [What Is Binopto](#-what-is-binopto) |
| ✨ | [Key Features](#-key-features) |
| 🏗️ | [System Architecture](#-system-architecture) |
| 👥 | [Dual Role Platform](#-dual-role-platform) |
| 🗄️ | [Complete Database Schema](#-complete-database-schema) |
| 🔐 | [Row Level Security Model](#-row-level-security-model) |
| 💼 | [Hiring Pipeline](#-hiring-pipeline) |
| 💬 | [Messaging System](#-messaging-system) |
| 🎨 | [Frontend Stack & Architecture](#-frontend-stack--architecture) |
| 📦 | [Full Dependency Reference](#-full-dependency-reference) |
| ⚙️ | [Environment Configuration](#-environment-configuration) |
| 🗂️ | [Project Structure](#-project-structure) |
| 🚀 | [Quick Start](#-quick-start) |
| 🔭 | [Future Roadmap](#-future-roadmap) |

---

## 🎯 What Is Binopto

<div align="center">

```
╔══════════════════════════════════════════════════════════════════════════╗
║                                                                          ║
║   Binopto is a focused talent marketplace — purpose-built for the        ║
║   creative economy. Two sides. One platform. Zero friction.             ║
║                                                                          ║
║   👤 CREATORS                          🏢 COMPANIES                     ║
║   ────────────────────────────────  ─────────────────────────────────   ║
║   Build your profile & portfolio       Post jobs with budgets           ║
║   Browse hundreds of live jobs         Review creator profiles          ║
║   Apply with a single click            Manage a hiring pipeline         ║
║   Track every application status       Message candidates directly      ║
║   Message companies instantly          Find the perfect creative fast   ║
║                                                                          ║
║   ► Backed by Supabase — real auth, real database, real file storage    ║
║   ► Row Level Security ensures privacy at the database level            ║
║   ► Framer Motion powers fluid, professional UI animations              ║
║                                                                          ║
╚══════════════════════════════════════════════════════════════════════════╝
```

</div>

---

## ✨ Key Features

| ⚡ Feature | 📋 Description |
|---|---|
| 🔐 **Supabase Auth** | Secure email/password login with session auto-refresh and JWT tokens |
| 👤 **Dual Roles** | `creator` + `company` roles with separate profile fields and UI flows |
| 📋 **Job Board** | Companies post jobs with title, description, type, rate, requirements, status |
| 🔍 **Job Discovery** | Creators browse and filter all active listings instantly |
| 📝 **One-Click Apply** | UNIQUE constraint prevents duplicate applications per job |
| 📊 **5-Stage Pipeline** | `applied → reviewing → interview → rejected → hired` with status badges |
| 🆙 **Schema Migration** | Updates file adds `shortlisted` stage + full messaging system |
| 💬 **In-App Messaging** | Messages linked to applications with `read` receipts and RLS protection |
| 🖼️ **File Storage** | Avatar images (public bucket) + resume uploads (private bucket) |
| 🔒 **RLS on All Tables** | Database-level security — users only access what they own |
| ✨ **Framer Motion** | Page transitions, card reveals, hover states, and modal animations |
| 🎨 **Tailwind + cn()** | `clsx` + `tailwind-merge` for clean, conflict-free class composition |
| 📱 **Fully Responsive** | Mobile-first layout adapts across all screen sizes |

---

## 🏗️ System Architecture

```
╔═══════════════════════════════════════════════════════════════════════════════╗
║                      BINOPTO — FULL SYSTEM ARCHITECTURE                       ║
╚═══════════════════════════════════════════════════════════════════════════════╝

  ┌──────────────────────────────────────────────────────────────────────────┐
  │              REACT 19 FRONTEND  (Vite 7 + React Router 7)               │
  │                         http://localhost:5173                            │
  │                                                                          │
  │  ┌────────────┐ ┌─────────────┐ ┌────────────┐ ┌──────────────────────┐│
  │  │ Auth Pages  │ │  Job Board  │ │  Dashboard │ │ Profile + Messaging  ││
  │  │ Login /     │ │  Browse +   │ │  Creator / │ │ Edit Profile,        ││
  │  │ Register    │ │  Filter +   │ │  Company   │ │ Avatar Upload,       ││
  │  │ Role Picker │ │  Apply      │ │  Stats     │ │ Message Threads      ││
  │  └────────────┘ └─────────────┘ └────────────┘ └──────────────────────┘│
  │                                                                          │
  │  Styling: Tailwind 3.4 · clsx · tailwind-merge                         │
  │  Animations: Framer Motion 12.29                                        │
  │  Icons: lucide-react 0.563                                              │
  │  Routing: React Router DOM 7.13                                         │
  └─────────────────────────────────┬────────────────────────────────────────┘
                                    │
                   @supabase/supabase-js v2.93.2
                   createClient(VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY)
                                    │
                                    ▼
  ┌──────────────────────────────────────────────────────────────────────────┐
  │                       SUPABASE BACKEND (BaaS)                            │
  │                                                                          │
  │  ┌──────────────────┐   ┌───────────────────────────────────────────┐   │
  │  │   AUTH SERVICE   │   │            POSTGRES DATABASE              │   │
  │  │                  │   │                                           │   │
  │  │ .signUp()        │   │  public.profiles   ← user metadata       │   │
  │  │ .signInWithPw()  │   │  public.jobs       ← job listings        │   │
  │  │ .signOut()       │   │  public.applications ← pipeline          │   │
  │  │ .getSession()    │   │  public.messages   ← in-app chat         │   │
  │  │ .onAuthStateChange│  │                                           │   │
  │  │                  │   │  RLS enforced on ALL 4 tables             │   │
  │  └──────────────────┘   └───────────────────────────────────────────┘   │
  │                                                                          │
  │  ┌──────────────────┐   ┌───────────────────────────────────────────┐   │
  │  │   STORAGE        │   │            REALTIME                       │   │
  │  │                  │   │                                           │   │
  │  │  avatars/        │   │  Live application status updates          │   │
  │  │  (public)        │   │  Real-time message delivery               │   │
  │  │  resumes/        │   │                                           │   │
  │  │  (private)       │   │                                           │   │
  │  └──────────────────┘   └───────────────────────────────────────────┘   │
  └──────────────────────────────────────────────────────────────────────────┘
```

---

## 👥 Dual Role Platform

```
╔═══════════════════════════════════════════════════════════════════════════════╗
║                        BINOPTO — USER ROLE ARCHITECTURE                       ║
╠══════════════════════════════╦════════════════════════════════════════════════╣
║  CREATORS                    ║  COMPANIES                                     ║
║  profiles.role = 'creator'   ║  profiles.role = 'company'                    ║
╠══════════════════════════════╬════════════════════════════════════════════════╣
║                              ║                                                ║
║  Profile fields:             ║  Profile fields:                               ║
║  ✅ username (min 3 chars)   ║  ✅ username (min 3 chars)                    ║
║  ✅ full_name                ║  ✅ full_name                                  ║
║  ✅ avatar_url               ║  ✅ avatar_url                                 ║
║  ✅ bio                      ║  ✅ bio                                        ║
║  ✅ job_title (specialty)    ║  ✅ job_title (company type)                   ║
║  ✅ website (portfolio)      ║  ✅ website (company site)                     ║
║  ✅ resume_url (private)     ║  —                                             ║
║                              ║                                                ║
║  Can:                        ║  Can:                                          ║
║  • Browse all jobs           ║  • Post new job listings                       ║
║  • Apply (once per job)      ║  • View all applicants per job                 ║
║  • Track own applications    ║  • Move candidates through pipeline            ║
║  • Message companies         ║  • Message creators                            ║
║  • Edit profile + resume     ║  • Close / reactivate job listings             ║
║                              ║                                                ║
║  Cannot:                     ║  Cannot:                                       ║
║  • Post jobs                 ║  • Apply to jobs                               ║
║  • See other's applications  ║  • Update others' applications                 ║
║  (RLS enforced)              ║  (RLS enforced)                                ║
╚══════════════════════════════╩════════════════════════════════════════════════╝
```

---

## 🗄️ Complete Database Schema

```sql
-- ══════════════════════════════════════════════════════════════════
-- MIGRATION 1: supabase_schema.sql  (base schema — 87 lines)
-- ══════════════════════════════════════════════════════════════════

-- TABLE 1: profiles
CREATE TABLE public.profiles (
  id          uuid REFERENCES auth.users NOT NULL PRIMARY KEY,
  updated_at  timestamp with time zone,
  username    text UNIQUE,
  full_name   text,
  avatar_url  text,                      -- Supabase Storage: avatars/ (public)
  website     text,
  role        text CHECK (role IN ('creator', 'company')),
  bio         text,
  job_title   text,
  resume_url  text,                      -- Supabase Storage: resumes/ (private)
  CONSTRAINT username_length CHECK (char_length(username) >= 3)
);

-- TABLE 2: jobs
CREATE TABLE public.jobs (
  id           bigint GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  created_at   timestamptz DEFAULT timezone('utc', now()) NOT NULL,
  title        text NOT NULL,
  company_id   uuid REFERENCES public.profiles(id) NOT NULL,
  description  text,
  job_type     text,      -- Full-time | Part-time | Contract | Freelance
  rate         text,      -- Budget or salary range (free text)
  status       text DEFAULT 'active'
               CHECK (status IN ('active', 'closed')),
  requirements text
);

-- TABLE 3: applications
CREATE TABLE public.applications (
  id          bigint GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  created_at  timestamptz DEFAULT timezone('utc', now()) NOT NULL,
  job_id      bigint REFERENCES public.jobs(id) NOT NULL,
  creator_id  uuid REFERENCES public.profiles(id) NOT NULL,
  status      text DEFAULT 'applied'
              CHECK (status IN ('applied','reviewing','interview','rejected','hired')),
  note        text,
  UNIQUE (job_id, creator_id)   -- ONE application per job per creator
);

-- ══════════════════════════════════════════════════════════════════
-- MIGRATION 2: supabase_schema_updates.sql  (25 lines)
-- ══════════════════════════════════════════════════════════════════

-- Extend application status to include 'shortlisted'
ALTER TABLE public.applications
  DROP CONSTRAINT IF EXISTS applications_status_check;
ALTER TABLE public.applications
  ADD CONSTRAINT applications_status_check
  CHECK (status IN ('applied','reviewing','shortlisted','interview','rejected','hired'));

-- TABLE 4: messages (new)
CREATE TABLE public.messages (
  id             bigint GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  created_at     timestamptz DEFAULT timezone('utc', now()) NOT NULL,
  sender_id      uuid REFERENCES auth.users NOT NULL,
  receiver_id    uuid REFERENCES auth.users NOT NULL,
  content        text NOT NULL,
  application_id bigint REFERENCES public.applications(id),  -- optional context
  read           boolean DEFAULT false
);
```

### Entity Relationships

```
  auth.users ──1:1──  profiles
                 │
                 ├──1:N──  jobs           (company_id FK)
                 │           │
                 │           └──1:N──  applications  (job_id FK)
                 │                         │
                 ├──1:N──  applications  (creator_id FK)
                 │
                 ├──1:N──  messages  (sender_id FK)
                 └──1:N──  messages  (receiver_id FK)
                                │
                                N:1──  applications  (application_id FK — optional)

  KEY CONSTRAINT:
  UNIQUE(job_id, creator_id) on applications
  → A creator cannot apply to the same job more than once
  → Postgres throws unique violation → UI handles gracefully
```

---

## 🔐 Row Level Security Model

```
  ALL 4 TABLES HAVE RLS ENABLED
  ════════════════════════════════════════════════════════════════════════

  TABLE: profiles
  ┌──────────┬────────────────────────────────────────────────────────┐
  │  SELECT  │  using(true)  — anyone can browse creator/company profiles│
  │  INSERT  │  with check(auth.uid() = id)  — own profile only       │
  │  UPDATE  │  using(auth.uid() = id)  — own profile only            │
  └──────────┴────────────────────────────────────────────────────────┘

  TABLE: jobs
  ┌──────────┬────────────────────────────────────────────────────────┐
  │  SELECT  │  using(true)  — all jobs visible to everyone           │
  │  INSERT  │  with check(auth.uid() = company_id)  — companies only │
  │  UPDATE  │  using(auth.uid() = company_id)  — own jobs only       │
  └──────────┴────────────────────────────────────────────────────────┘

  TABLE: applications
  ┌──────────┬────────────────────────────────────────────────────────┐
  │  SELECT  │  using(auth.uid() = creator_id)  — own applications    │
  │  INSERT  │  with check(auth.uid() = creator_id)  — own only       │
  │  UPDATE  │  using(auth.uid() = (                                   │
  │          │    SELECT company_id FROM jobs                          │
  │          │    WHERE jobs.id = applications.job_id                  │
  │          │  ))  — only company that owns the job                   │
  └──────────┴────────────────────────────────────────────────────────┘

  TABLE: messages
  ┌──────────┬────────────────────────────────────────────────────────┐
  │  SELECT  │  using(auth.uid() = sender_id OR auth.uid() = receiver_id)│
  │  INSERT  │  with check(auth.uid() = sender_id)  — own messages    │
  └──────────┴────────────────────────────────────────────────────────┘

  WHAT THIS MEANS IN PRACTICE:
  ──────────────────────────────────────────────────────────────────────
  Creator A cannot see Creator B's applications                 ✅ blocked
  Creator A cannot update any application status                ✅ blocked
  Company X cannot see applications for Company Y's jobs        ✅ blocked
  Company X can update status on their own job's applicants     ✅ allowed
  Users cannot read messages between other users                ✅ blocked
```

---

## 💼 Hiring Pipeline

```
  APPLICATION STATUS FLOW (6 stages after migration)
  ════════════════════════════════════════════════════════════════════════

  ┌──────────────────────────────────────────────────────────────────┐
  │                                                                  │
  │   applied ──▶ reviewing ──▶ shortlisted ──▶ interview           │
  │      │             │              │              │               │
  │      │             └──────────────┴──────────────┴──▶ rejected  │
  │      │                                                   │       │
  │      └───────────────────────────────────────────────────┘       │
  │                                                          ▼       │
  │                                                       hired      │
  └──────────────────────────────────────────────────────────────────┘

  STATUS DESCRIPTIONS:
  ─────────────────────────────────────────────────────────────────
  applied      Default on submit — creator has applied
  reviewing    Company opened and is actively reviewing
  shortlisted  Added in migration — creator made the shortlist
  interview    Company wants to interview this creator
  rejected     Not moving forward at any stage
  hired        Creator got the role — success!

  COMPANY DASHBOARD ACTIONS:
  ─────────────────────────────────────────────────────────────────
  supabase
    .from('applications')
    .update({ status: 'shortlisted' })
    .eq('id', applicationId)
    → RLS verifies: auth.uid() === job's company_id

  UNIQUE GUARD:
  UNIQUE(job_id, creator_id) → duplicate insert returns
  Postgres error code 23505 → UI shows "Already applied" message
```

---

## 💬 Messaging System

```
  IN-APP MESSAGING — messages table
  ════════════════════════════════════════════════════════════════════════

  ┌─────────────────────────────────────────────────────────────────────┐
  │  Column          Type      Notes                                    │
  │  ─────────────────────────────────────────────────────────────────  │
  │  id              bigint    Auto-increment PK                        │
  │  sender_id       uuid      FK → auth.users                         │
  │  receiver_id     uuid      FK → auth.users                         │
  │  content         text      Message body (NOT NULL)                  │
  │  application_id  bigint    FK → applications (nullable context)     │
  │  read            boolean   DEFAULT false — unread indicator         │
  │  created_at      timestamptz Auto-set on insert                    │
  └─────────────────────────────────────────────────────────────────────┘

  The application_id column is the key innovation here.
  Messages can be scoped to a specific application context:
  "Company replied about your Video Editor application at BrandCo"

  QUERY PATTERN — fetch conversation:
  ──────────────────────────────────────────────────────────────────────
  supabase
    .from('messages')
    .select('*, sender:profiles!sender_id(*)')
    .or(`sender_id.eq.${me},receiver_id.eq.${me}`)
    .eq('application_id', appId)
    .order('created_at', { ascending: true })

  MARK AS READ:
  ──────────────────────────────────────────────────────────────────────
  supabase
    .from('messages')
    .update({ read: true })
    .eq('receiver_id', me)
    .eq('read', false)
    .eq('application_id', appId)
```

---

## 🎨 Frontend Stack & Architecture

```
  LAYER BREAKDOWN
  ════════════════════════════════════════════════════════════════════════

  ┌─────────────────────────────────────────────────────────────────────┐
  │  ROUTING  — React Router DOM 7.13                                   │
  │                                                                     │
  │  /                  → Landing page with hero + features             │
  │  /login             → Email + password sign-in form                 │
  │  /register          → Sign-up + role picker (creator / company)    │
  │  /jobs              → Browse all active job listings               │
  │  /jobs/:id          → Single job detail + apply CTA                │
  │  /dashboard         → Role-aware dashboard                         │
  │  /profile/:username → Public creator / company profile             │
  │  /profile/edit      → Edit profile, upload avatar + resume         │
  │  /messages          → Inbox overview                               │
  │  /messages/:id      → Single conversation thread                   │
  └─────────────────────────────────────────────────────────────────────┘

  ┌─────────────────────────────────────────────────────────────────────┐
  │  STATE MANAGEMENT  — React Context API                              │
  │                                                                     │
  │  AuthContext:                                                        │
  │  const { user, profile, loading, signIn, signUp, signOut }         │
  │    = useAuth()                                                      │
  │                                                                     │
  │  Supabase session persisted in localStorage automatically           │
  │  onAuthStateChange listener syncs auth state across tabs           │
  └─────────────────────────────────────────────────────────────────────┘

  ┌─────────────────────────────────────────────────────────────────────┐
  │  ANIMATIONS  — Framer Motion 12.29                                  │
  │                                                                     │
  │  <AnimatePresence>  → smooth page exit animations                  │
  │  <motion.div>       → fade-in and slide-up on mount                │
  │  staggerChildren    → cascading card reveal on job list             │
  │  spring()           → modal open / close with physics              │
  │  whileHover         → card lift + shadow on hover                  │
  └─────────────────────────────────────────────────────────────────────┘

  ┌─────────────────────────────────────────────────────────────────────┐
  │  UTILITY: cn() helper                                               │
  │  import { clsx } from 'clsx'                                       │
  │  import { twMerge } from 'tailwind-merge'                          │
  │  export const cn = (...inputs) => twMerge(clsx(inputs))            │
  │                                                                     │
  │  Used everywhere:                                                   │
  │  <Button className={cn(base, isActive && 'bg-indigo-600')}>        │
  └─────────────────────────────────────────────────────────────────────┘
```

---

## 📦 Full Dependency Reference

```
  PRODUCTION DEPENDENCIES  (package.json)
  ════════════════════════════════════════════════════════════════════════

  ┌──────────────────────────┬────────────┬────────────────────────────┐
  │  Package                 │  Version   │  Role                      │
  ├──────────────────────────┼────────────┼────────────────────────────┤
  │  react                   │ ^19.2.3    │  UI framework              │
  │  react-dom               │ ^19.2.3    │  DOM rendering             │
  │  react-router-dom        │ ^7.13.0    │  Client-side routing       │
  │  @supabase/supabase-js   │ ^2.93.2    │  Auth + DB + Storage       │
  │  framer-motion           │ ^12.29.2   │  Animations                │
  │  tailwindcss             │ ^3.4.17    │  Utility CSS               │
  │  clsx                    │ ^2.1.1     │  Conditional classes       │
  │  tailwind-merge          │ ^3.4.0     │  Tailwind conflict resolve │
  │  lucide-react            │ ^0.563.0   │  Icon library              │
  │  autoprefixer            │ ^10.4.23   │  CSS autoprefixer          │
  │  postcss                 │ ^8.5.6     │  CSS pipeline              │
  ├──────────────────────────┼────────────┼────────────────────────────┤
  │  DEV DEPENDENCIES        │            │                            │
  ├──────────────────────────┼────────────┼────────────────────────────┤
  │  vite                    │ ^7.3.1     │  Build tool + dev server   │
  │  @vitejs/plugin-react    │ ^5.1.2     │  React Fast Refresh (Oxc) │
  │  eslint                  │ ^9.39.2    │  Code linting              │
  │  eslint-plugin-react-hooks│ ^7.0.1   │  Hooks rules               │
  │  eslint-plugin-react-refresh│ ^0.4.25│  HMR refresh linting       │
  │  @types/react            │ ^19.2.9   │  TypeScript types          │
  │  @types/react-dom        │ ^19.2.3   │  TypeScript DOM types      │
  │  globals                 │ ^17.1.0   │  ESLint globals config     │
  └──────────────────────────┴────────────┴────────────────────────────┘
```

---

## ⚙️ Environment Configuration

```bash
# .env.example — copy to .env and fill in your Supabase project credentials
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

> ⚠️ **Security Note:** This repo contains a committed `.env` file. For production deployments, always rotate your Supabase API keys and use environment variable injection from your hosting platform (Vercel / Netlify) rather than committing `.env` files to version control.

---

## 🗂️ Project Structure

```
binopto/
│
├── 📋 supabase_schema.sql          # Base schema: profiles + jobs + applications
├── 📋 supabase_schema_updates.sql  # Migration: shortlisted status + messages table
│
├── 🌐 index.html                   # Vite HTML entry point
├── ⚙️  vite.config.js               # Vite build config
├── ⚙️  tailwind.config.js           # Tailwind theme + content paths
├── ⚙️  postcss.config.js            # PostCSS (autoprefixer)
├── ⚙️  eslint.config.js             # ESLint flat config (v9)
│
├── 🔒 .env                         # Live credentials (rotate after public exposure)
├── 🔒 .env.example                 # Template for new developers
├── 📦 package.json                 # All 11 deps + 8 devDeps with exact versions
│
├── 📁 public/                      # Static assets (favicon, images)
│
└── 📁 src/                         # App source (94.9% JS)
    ├── main.jsx                    # createRoot() entry
    ├── App.jsx                     # Root: AuthProvider + RouterProvider
    ├── index.css                   # Global styles + @tailwind directives
    │
    ├── 📁 lib/
    │   └── supabase.js             # createClient() with env vars
    │
    ├── 📁 context/
    │   └── AuthContext.jsx         # User + profile state + auth methods
    │
    ├── 📁 hooks/
    │   ├── useJobs.js              # Fetch + filter jobs
    │   ├── useApplications.js      # Fetch + update applications
    │   └── useMessages.js          # Fetch + send messages
    │
    ├── 📁 pages/
    │   ├── Home.jsx                # Landing: hero + feature cards
    │   ├── Login.jsx               # Sign-in form
    │   ├── Register.jsx            # Sign-up + role radio selector
    │   ├── Jobs.jsx                # Job listing grid with search
    │   ├── JobDetail.jsx           # Full job view + apply button
    │   ├── Dashboard.jsx           # Role-aware stats + quick actions
    │   ├── Applications.jsx        # Creator: my applications list
    │   ├── ManageApplications.jsx  # Company: pipeline per job
    │   ├── Profile.jsx             # Public profile viewer
    │   ├── EditProfile.jsx         # Profile editor + storage upload
    │   └── Messages.jsx            # Inbox + conversation threads
    │
    └── 📁 components/
        ├── Navbar.jsx              # Sticky header with auth-aware nav
        ├── ProtectedRoute.jsx      # Route guard (redirect to login)
        ├── JobCard.jsx             # Animated job listing card
        ├── ApplicationRow.jsx      # Application table row with badge
        ├── StatusBadge.jsx         # Colour-coded status pill
        ├── MessageBubble.jsx       # Chat bubble (own / other)
        └── ui/
            ├── Button.jsx          # Variants: primary, secondary, ghost
            ├── Input.jsx           # Styled input with label + error
            ├── Modal.jsx           # Animated overlay modal
            └── Avatar.jsx          # Avatar with fallback initials
```

---

## 🚀 Quick Start

### 1. Clone & Install

```bash
git clone https://github.com/sreyoshmajumder/binopto.git
cd binopto
npm install
```

### 2. Set Up Supabase Project

```bash
# 1. Go to https://supabase.com → Create new project
# 2. SQL Editor → Run supabase_schema.sql (base schema)
# 3. SQL Editor → Run supabase_schema_updates.sql (messages + shortlisted)
# 4. Storage → Create buckets:
#    ├── avatars   (Public — profile pictures)
#    └── resumes   (Authenticated only — private resume files)
```

### 3. Configure Environment

```bash
# Update .env with your project credentials:
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIs...

# Find both in: Supabase Dashboard → Settings → API → Project URL + anon key
```

### 4. Start Dev Server

```bash
npm run dev
# → http://localhost:5173
```

### 5. Build for Production

```bash
npm run build    # Outputs to /dist
npm run preview  # Test production build locally
```

### 6. Deploy

```bash
# Vercel (recommended):
npx vercel --prod
# Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in Vercel dashboard

# Netlify:
# Build command: npm run build | Publish directory: dist
# Add env vars in: Site Settings → Environment Variables
```

---

## 🔭 Future Roadmap

```
v1.0 ── CURRENT ─────────────────────────────────────────────────────────
  ✅  React 19 + Vite 7 + Framer Motion + Tailwind frontend
  ✅  Supabase Auth with session persistence
  ✅  Dual role system: creator / company
  ✅  Job posting + browsing
  ✅  Application pipeline with 6 stages (after migration)
  ✅  Row Level Security on all 4 database tables
  ✅  In-app messaging linked to applications
  ✅  File storage: avatars (public) + resumes (private)
  ✅  Rich creator and company profiles

v2.0 ── REAL-TIME & NOTIFICATIONS ───────────────────────────────────────
  🔲  Supabase Realtime for live messages (no refresh needed)
  🔲  Notification bell for unread messages + status changes
  🔲  Email notifications via Supabase Edge Functions + Resend
  🔲  Job saved / watchlist feature for creators
  🔲  Typing indicator in message threads

v3.0 ── DISCOVERY & COMMUNITY ───────────────────────────────────────────
  🔲  Public creator portfolio gallery with work samples
  🔲  Post-project ratings and reviews system
  🔲  Verified creator badge (portfolio review)
  🔲  Company public page with all posted jobs
  🔲  Creator search by specialty, rate, and skills

v4.0 ── SCALE & MONETISATION ────────────────────────────────────────────
  🔲  Featured job listings (premium placement)
  🔲  Milestone-based project payments (Stripe integration)
  🔲  Analytics dashboard for companies
  🔲  Mobile app (React Native using same Supabase backend)
  🔲  Admin panel for content moderation and analytics
```

---

## 🛠️ Tech Stack

<div align="center">

![React](https://img.shields.io/badge/React%2019-050510?style=for-the-badge&logo=react&logoColor=61dafb)
![Vite](https://img.shields.io/badge/Vite%207-050510?style=for-the-badge&logo=vite&logoColor=a78bfa)
![Supabase](https://img.shields.io/badge/Supabase-050510?style=for-the-badge&logo=supabase&logoColor=3ecf8e)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL%20%2B%20RLS-050510?style=for-the-badge&logo=postgresql&logoColor=336791)
![Tailwind](https://img.shields.io/badge/Tailwind%20CSS-050510?style=for-the-badge&logo=tailwindcss&logoColor=38bdf8)
![Framer](https://img.shields.io/badge/Framer%20Motion-050510?style=for-the-badge&logo=framer&logoColor=818cf8)
![React Router](https://img.shields.io/badge/React%20Router%207-050510?style=for-the-badge&logo=reactrouter&logoColor=f43f5e)
![Lucide](https://img.shields.io/badge/Lucide%20React-050510?style=for-the-badge&logo=lucide&logoColor=6366f1)

</div>

---

## 👨‍💻 Author

<div align="center">

**Built with 🔵 + ⚡ + ❤️ by [Sreyosh Majumder](https://github.com/sreyoshmajumder)**

[![GitHub](https://img.shields.io/badge/GitHub-sreyoshmajumder-050510?style=for-the-badge&logo=github&logoColor=818cf8)](https://github.com/sreyoshmajumder)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-050510?style=for-the-badge&logo=linkedin&logoColor=0077b5)](https://linkedin.com/in/YOUR_LINKEDIN)

> *"Great products connect the right people. Binopto makes that connection instant."*

</div>

---

## ⭐ Show Some Love

```
★  Star this repository
🍴  Fork it and add real-time messaging with Supabase Realtime
🐛  Report bugs or suggest features via Issues
📢  Share with creators and companies in your network
```

---

<div align="center">

![Footer](https://capsule-render.vercel.app/api?type=waving&color=0:1a1040,50:0c0c1e,100:050510&height=120&section=footer&text=Connect%20Creators.%20Build%20Brands.%20Ship%20Fast.&fontSize=15&fontColor=818cf8&fontAlignY=65)

</div>
