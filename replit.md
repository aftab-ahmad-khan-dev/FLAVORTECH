# FlavorTech - Restaurant & Food Delivery Management Dashboard

## Overview

FlavorTech is a full-stack restaurant management dashboard application built for managing orders, menus, staff, sales analytics, and delivery operations. The application features a modern React frontend with a comprehensive UI component library, backed by an Express.js API server with PostgreSQL database storage.

The platform provides:
- Real-time order management and tracking
- Menu item creation and management
- Sales and revenue analytics with charts
- Staff and delivery rider operations
- Customer insights and retention tracking
- Promotional campaign management
- Multi-theme support (light, dark, premium gradient)

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state caching and synchronization
- **Styling**: Tailwind CSS with CSS variables for theming
- **UI Components**: shadcn/ui component library (Radix UI primitives with custom styling)
- **Charts**: Recharts for data visualization
- **Animations**: Framer Motion for page transitions and micro-interactions
- **Build Tool**: Vite with custom plugins for Replit integration

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript (ESM modules)
- **API Pattern**: RESTful endpoints defined in shared route contracts
- **Validation**: Zod schemas for request/response validation
- **Database ORM**: Drizzle ORM with PostgreSQL dialect

### Data Layer
- **Database**: PostgreSQL (connection via DATABASE_URL environment variable)
- **Schema Location**: `shared/schema.ts` - defines all database tables
- **Migrations**: Drizzle Kit for schema migrations (`drizzle-kit push`)

### Shared Code Pattern
The `shared/` directory contains code used by both frontend and backend:
- `schema.ts`: Database table definitions and Zod insert schemas
- `routes.ts`: API contract definitions with typed paths, methods, and response schemas

### Authentication
- Client-side mock authentication via React Context (`AuthContext`)
- User session persisted to localStorage for demo purposes
- Protected routes redirect unauthenticated users to landing page

### Theming System
- Three themes: Light, Dark, Premium Gradient
- CSS variables defined in `client/src/index.css`
- Theme state managed via React Context (`ThemeContext`)
- Persisted to localStorage

### Build Configuration
- Development: `tsx` for running TypeScript directly
- Production: esbuild bundles server, Vite bundles client
- Output: `dist/` directory with `index.cjs` (server) and `public/` (client assets)

## External Dependencies

### Database
- **PostgreSQL**: Primary data store, configured via `DATABASE_URL` environment variable
- **Drizzle ORM**: Type-safe database queries and schema management
- **connect-pg-simple**: PostgreSQL session storage (available but not currently active)

### Frontend Libraries
- **@tanstack/react-query**: Server state management and caching
- **Radix UI**: Accessible component primitives (dialog, dropdown, tabs, etc.)
- **Recharts**: React charting library for analytics dashboards
- **Framer Motion**: Animation library
- **date-fns**: Date formatting utilities

### Build & Development
- **Vite**: Frontend build tool with HMR
- **esbuild**: Server bundling for production
- **Drizzle Kit**: Database migration tooling
- **TypeScript**: Type checking across the entire codebase

### Replit-Specific
- `@replit/vite-plugin-runtime-error-modal`: Error overlay in development
- `@replit/vite-plugin-cartographer`: Development tooling
- `@replit/vite-plugin-dev-banner`: Development environment indicator