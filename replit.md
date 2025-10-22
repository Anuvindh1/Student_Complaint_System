# College Complaint Registration System

An open-source themed student complaint portal for B.Tech colleges built with React, TypeScript, Firebase, and modern web technologies.

## Overview

This is a comprehensive complaint management system that allows students to submit complaints and track their status. The system features:

- **Student Portal**: Submit complaints with detailed information
- **Public Dashboard**: View all submitted complaints with filtering capabilities
- **Admin Panel**: Manage complaint statuses (requires authentication)
- **Real-time Updates**: Firebase Firestore for live data synchronization
- **Modern UI**: Beautiful animations, dark mode support, and responsive design

## Project Architecture

### Frontend (React + TypeScript)
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Shadcn UI components
- **Animations**: Framer Motion for smooth transitions
- **Forms**: React Hook Form with Zod validation
- **State Management**: TanStack Query for server state

### Backend (Express + Firebase)
- **Server**: Express.js
- **Database**: Firebase Firestore
- **Validation**: Zod schemas shared between frontend and backend
- **API**: RESTful endpoints for CRUD operations

### Design System
- **Theme**: Open-source inspired (GitHub/GitLab style)
- **Colors**: Trust blue primary, semantic status colors
- **Typography**: Inter font family with JetBrains Mono for code
- **Dark Mode**: Full dark mode support with theme toggle

## Features

### 1. Complaint Submission (Student)
- Form fields: Name, Department, Issue Title, Description
- B.Tech departments: CSE, ECE, EEE, Mechanical, Civil, IT, Chemical, Biotechnology, Aerospace, Automobile
- Real-time validation with helpful error messages
- Character counters and input constraints
- Success confirmation with animations

### 2. Complaints Dashboard (Public)
- View all submitted complaints
- Filter by status (Pending/Resolved)
- Filter by department
- Search by title, description, or student name
- Status badges with icons
- Responsive card layout
- Real-time statistics

### 3. Admin Panel (Protected)
- Simple password authentication (demo: "admin123")
- Update complaint status (Pending ↔ Resolved)
- Search and filter capabilities
- Confirmation dialogs for status changes
- Visual distinction from public views

### 4. Home Page
- Hero section with call-to-action
- Live statistics (total, resolved, pending, resolution rate)
- Recent complaints preview
- Encouraging CTA section

## Data Model

### Complaint Schema
```typescript
{
  id: string (auto-generated)
  studentName: string (2-100 chars)
  department: Department enum
  issueTitle: string (5-150 chars)
  description: string (10-1000 chars)
  status: "pending" | "resolved"
  createdAt: timestamp
  updatedAt: timestamp
}
```

## Environment Variables

### Required Secrets

**Admin Authentication:**
- `ADMIN_PASSWORD` - **REQUIRED** for admin panel access. Set a strong password.
- `SESSION_SECRET` - Required in production for secure session management. Auto-generated in development.

**Firebase Configuration (Optional):**
- `FIREBASE_API_KEY`
- `FIREBASE_AUTH_DOMAIN`
- `FIREBASE_PROJECT_ID`
- `FIREBASE_STORAGE_BUCKET`
- `FIREBASE_MESSAGING_SENDER_ID`
- `FIREBASE_APP_ID`

If Firebase credentials are not provided, the application will automatically use in-memory storage (MemStorage) which stores data temporarily during the session. For persistent data storage, enable Firestore in your Firebase Console and provide the credentials above.

Firebase variables are automatically exposed to Vite with the `VITE_` prefix for client-side use.

## Pages

1. **/** - Home page with stats and recent complaints
2. **/submit** - Complaint submission form
3. **/complaints** - All complaints with filters
4. **/admin** - Admin panel (password protected)

## User Preferences

- Clean, modern design with open-source aesthetics
- Smooth animations and transitions
- Mobile-first responsive design
- Accessible UI with proper ARIA labels
- Professional color scheme with semantic status indicators

## Security

### Admin Authentication
- Admin access requires password authentication via backend API
- Passwords never stored or transmitted in client-side code
- Session-based authentication with httpOnly cookies
- Protected routes enforce admin privileges server-side
- ADMIN_PASSWORD environment variable must be set for security

### Data Privacy
- Complaint data stored securely in Firebase Firestore or in-memory
- No sensitive information exposed in client bundles
- All admin operations require valid authentication session

## Production Deployment Checklist

1. **Set Required Environment Variables:**
   - `ADMIN_PASSWORD` - Set a strong admin password
   - `SESSION_SECRET` - Generate a random secret (32+ characters)
   - Firebase credentials (if using Firestore for persistence)

2. **Enable Firestore (Optional but Recommended):**
   - Go to Firebase Console → Firestore Database
   - Create database (start in production mode for production apps)
   - Set security rules to protect data

3. **Test Admin Flow:**
   - Navigate to /admin
   - Login with ADMIN_PASSWORD
   - Verify status update functionality
   - Test logout

4. **Verify Complaint Submission:**
   - Submit a test complaint via /submit
   - Verify it appears in /complaints
   - Verify admin can update status

## Recent Changes

- **2025-10-22**: Complete MVP implementation
  - ✅ Implemented secure backend authentication with sessions
  - ✅ Created all frontend pages with modern UI/UX
  - ✅ Integrated Firebase Firestore with fallback to MemStorage
  - ✅ Built responsive design with dark mode support
  - ✅ Added comprehensive form validation
  - ✅ Implemented protected admin routes
  - ✅ Added smooth animations and transitions
  - ✅ Created filtering and search functionality
  - ✅ Tested all security measures
