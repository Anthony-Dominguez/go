# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React Native mobile application built with Expo, TypeScript, and NativeWind (Tailwind CSS for React Native). The project follows professional development practices with a structured codebase.

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- Expo CLI: `npm install -g expo-cli`
- iOS Simulator (for iOS development)
- Android Studio & Emulator (for Android development)

### Installation
```bash
npm install
```

### Development Commands

- `npm start` - Start Expo development server
- `npm run android` - Run on Android emulator/device
- `npm run ios` - Run on iOS simulator/device
- `npm run web` - Run on web browser

### Project Structure

```
go2/
├── src/
│   ├── components/    # Reusable UI components
│   ├── screens/       # App screens/pages
│   ├── navigation/    # Navigation configuration
│   ├── utils/         # Utility functions
│   ├── hooks/         # Custom React hooks
│   └── types/         # TypeScript type definitions
├── assets/            # Static assets (images, fonts, etc.)
├── App.tsx           # Main app component
├── global.css        # Global Tailwind CSS styles
├── metro.config.js   # Metro bundler configuration
├── tailwind.config.js # Tailwind CSS configuration
├── babel.config.js   # Babel configuration
└── tsconfig.json     # TypeScript configuration
```

## Architecture Notes

- **Component Organization**: Place reusable components in `src/components/`
- **Screen Organization**: Place screen components in `src/screens/`
- **Styling**: Use NativeWind (Tailwind CSS) for styling with `className` prop
- **Type Safety**: All components and functions should be properly typed with TypeScript
- **State Management**: Use React hooks for local state, consider Redux Toolkit for global state

## Git Workflow

This project uses a professional Git workflow similar to big tech companies:

### Branch Structure
- `main` - Production-ready code, protected branch
- `staging` - Pre-production testing, merge from develop
- `develop` - Integration branch for features
- `feature/*` - Feature development branches
- `bugfix/*` - Bug fix branches
- `hotfix/*` - Critical production fixes

### Workflow Process
1. Create feature branches from `develop`: `git checkout -b feature/new-feature develop`
2. Work on features in isolation
3. Merge features to `develop` via PR/MR
4. Test integration in `develop`
5. Merge `develop` to `staging` for pre-production testing
6. Merge `staging` to `main` for production release
7. Tag releases: `git tag -a v1.0.0 -m "Release v1.0.0"`

### Branch Protection
- `main` and `staging` require pull request reviews
- No direct pushes to protected branches
- All tests must pass before merging

## Development Guidelines

- Follow Go naming conventions and formatting standards
- Write tests for all packages using Go's built-in testing framework
- Use Go modules for dependency management
- Follow semantic versioning for releases