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

The following secrets are required and already configured:
- `FIREBASE_API_KEY`
- `FIREBASE_AUTH_DOMAIN`
- `FIREBASE_PROJECT_ID`
- `FIREBASE_STORAGE_BUCKET`
- `FIREBASE_MESSAGING_SENDER_ID`
- `FIREBASE_APP_ID`

These are automatically exposed to Vite with the `VITE_` prefix.

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

## Recent Changes

- **2025-10-22**: Initial project setup
  - Implemented complete frontend with all pages
  - Created data schemas for complaints
  - Set up Firebase integration structure
  - Designed theme system with dark mode
  - Added navigation and routing
  - Implemented form validation
  - Created admin authentication flow
  - Added animations and transitions throughout

## Next Steps

- Implement Firebase backend integration
- Connect frontend to Firestore
- Test all user flows end-to-end
- Add error boundaries
- Optimize performance
