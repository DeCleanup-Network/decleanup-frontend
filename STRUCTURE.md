# Project Structure Documentation

This document outlines the professional folder structure for the DeCleanup dApp.

## 📁 Root Directory

```
dapp/
├── .github/           # GitHub workflows and configurations
├── .husky/           # Git hooks
├── .next/            # Next.js build output
├── node_modules/     # Dependencies
├── out/              # Static export output
├── public/           # Static assets
├── src/              # Source code
├── .gitignore        # Git ignore rules
├── .prettierrc       # Prettier configuration
├── .prettierignore   # Prettier ignore rules
├── .yarnrc.yml       # Yarn configuration
├── bun.lockb         # Bun lock file
├── components.json   # UI components configuration
├── eslint.config.mjs # ESLint configuration
├── LICENSE           # Project license
├── next-env.d.ts     # Next.js TypeScript definitions
├── next.config.ts    # Next.js configuration
├── package.json      # Project dependencies and scripts
├── package-lock.json # NPM lock file
├── postcss.config.mjs # PostCSS configuration
├── README.md         # Project documentation
├── tailwind.config.ts # Tailwind CSS configuration
├── tsconfig.json     # TypeScript configuration
└── yarn.lock         # Yarn lock file
```

## 📁 Source Code Structure (`src/`)

### 🏗️ App Directory (`src/app/`)

Next.js 13+ App Router structure:

```
src/app/
├── api/              # API routes
│   └── auth/         # Authentication API endpoints
├── dashboard/        # Dashboard pages
│   └── preclaim/     # Preclaim functionality
├── leaderboard/      # Leaderboard pages
├── favicon.ico       # Site favicon
├── globals.css       # Global styles (moved to styles/globals/)
├── index.tsx         # Index page
├── layout.tsx        # Root layout
├── page.tsx          # Home page
└── provider.tsx      # App providers
```

### 🧩 Components (`src/components/`)

Organized by functionality:

```
src/components/
├── common/           # Reusable common components
│   └── SessionProvider.tsx
├── features/         # Feature-specific components
│   ├── ContractInfo.tsx
│   └── DecleanupShareModal.tsx
├── forms/            # Form components
│   └── Login.tsx
├── layout/           # Layout components
│   ├── Footer.tsx
│   └── Header.tsx
├── modals/           # Modal components
├── ui/               # Base UI components (shadcn/ui)
│   ├── button.tsx
│   ├── card.tsx
│   ├── collapsible.tsx
│   ├── dropdown-menu.tsx
│   ├── input.tsx
│   ├── navigation-menu.tsx
│   ├── Progress.tsx
│   ├── separator.tsx
│   ├── sheet.tsx
│   ├── skeleton.tsx
│   └── tooltip.tsx
├── upload/           # Upload-related components
├── imageUploader/    # Image upload components
└── landingPage/      # Landing page components
```

### 🔧 Context (`src/context/`)

React Context providers:

```
src/context/
├── AuthContext.tsx   # Authentication context
└── ContextApi.tsx    # General app context
```

### 🪝 Hooks (`src/hooks/`)

Custom React hooks:

```
src/hooks/
├── useDeCleanupContracts.ts  # DeCleanup contract hooks
└── use-mobile.tsx            # Mobile detection hook
```

### 📚 Library (`src/lib/`)

Utility functions and configurations:

```
src/lib/
├── constants/        # Application constants
│   └── index.ts
├── utils/            # Utility functions
│   ├── format.ts     # Formatting utilities
│   ├── index.ts      # Re-exports
│   ├── storage.ts    # Storage utilities
│   ├── validation.ts # Validation utilities
│   └── web3.ts       # Web3 utilities
└── utils.ts          # Legacy utils (moved to utils/)
```

### 🔌 Services (`src/services/`)

API and external service integrations:

```
src/services/
├── api/              # API service functions
│   ├── auth.ts       # Authentication API
│   ├── contracts.ts  # Contract API
│   ├── index.ts      # Re-exports
│   └── user.ts       # User API
└── web3/             # Web3 service functions
    ├── contracts.ts  # Contract interactions
    └── decleanup-contracts.ts
```

### 🎨 Styles (`src/styles/`)

Styling and CSS:

```
src/styles/
├── components/       # Component-specific styles
└── globals/          # Global styles
    └── globals.css
```

### 📝 Types (`src/types/`)

TypeScript type definitions:

```
src/types/
├── auth.ts           # Authentication types
├── contracts.ts      # Contract types
├── index.ts          # Re-exports
├── modal.ts          # Modal types
└── ui.ts             # UI component types
```

## 🏗️ Architecture Principles

### 1. **Separation of Concerns**

- Each directory has a specific purpose
- Components are organized by functionality
- Business logic is separated from UI components

### 2. **Scalability**

- Modular structure allows easy expansion
- Clear naming conventions
- Consistent file organization

### 3. **Maintainability**

- Centralized types and constants
- Reusable utility functions
- Clear import/export patterns

### 4. **Developer Experience**

- Intuitive folder structure
- Comprehensive documentation
- Consistent coding patterns

## 📋 File Naming Conventions

### Components

- **PascalCase** for component files: `Header.tsx`, `LoginForm.tsx`
- **kebab-case** for directories: `image-uploader/`, `landing-page/`

### Utilities

- **camelCase** for utility files: `format.ts`, `validation.ts`
- **PascalCase** for type files: `auth.ts`, `contracts.ts`

### Constants

- **UPPER_SNAKE_CASE** for constant values
- **camelCase** for constant objects

## 🔄 Import/Export Patterns

### Barrel Exports

Use index files for clean imports:

```typescript
// Instead of multiple imports
import { formatAddress } from '@/lib/utils/format'
import { isValidEmail } from '@/lib/utils/validation'

// Use barrel exports
import { formatAddress, isValidEmail } from '@/lib/utils'
```

### Type Imports

Centralize type imports:

```typescript
// Use centralized types
import { User, AuthState } from '@/types'
```

## 🚀 Best Practices

1. **Keep components small and focused**
2. **Use TypeScript for type safety**
3. **Implement proper error handling**
4. **Follow consistent naming conventions**
5. **Document complex functions and components**
6. **Use environment variables for configuration**
7. **Implement proper testing structure**

## 📦 Package Management

The project supports multiple package managers:

- **npm**: `package-lock.json`
- **yarn**: `yarn.lock`
- **bun**: `bun.lockb`

Choose one and stick with it for consistency.

## 🔧 Development Scripts

```json
{
  "dev": "next dev --turbopack", // Development server
  "build": "next build", // Production build
  "start": "next start", // Production server
  "lint": "next lint", // Lint code
  "format": "prettier --write ." // Format code
}
```

This structure provides a solid foundation for a professional, scalable dApp that's easy to maintain and extend.
