# 🚀 Premium E-Commerce & Agency Framework

![Hero Banner](https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop)

A high-end, conversion-optimized E-Commerce and Digital Agency platform. Built with modern web standards to deliver maximum performance, seamless user experience, and a robust admin portal. Designed specifically to scale operations and maximize ROI.

## 🌟 Key Features

### Client-Side (Storefront)
- **Premium Aesthetics:** Modern Light Theme, Glassmorphism elements, refined Gradient Glows, and smooth Scroll Reveal animations.
- **E-Commerce Ready:** Complete shopping cart functionality, secure checkout flows, and real-time order tracking.
- **Localization (i18n):** Built-in multi-language support (English / Vietnamese).
- **Extreme Performance:** Near-perfect Lighthouse scores ensuring zero-latency page loads and maximum SEO benefits.

### Admin Portal (Dashboard)
- **Content Management:** Intuitive CRUD interfaces for managing Projects/Templates and Blog Posts.
- **Order Management:** Real-time order status updates (Pending, Processing, Completed, Cancelled).
- **Dynamic Configuration:** Adjust homepage Hero texts, Marquee keywords, statistics, Site Name, and Logo without modifying code.
- **Modern UI Components:** Smooth, responsive, and beautifully animated modals, toast notifications, and interactive elements.
- **Firebase Integration:** Real-time database syncing and smart data seeding capabilities.

## 🛠 Tech Stack

Built on a bleeding-edge frontend ecosystem:

- **Core Framework:** [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Bundler:** [Vite](https://vitejs.dev/) (Lightning-fast HMR and optimized builds)
- **Styling:** [Tailwind CSS v3](https://tailwindcss.com/) (Utility-first, highly customizable)
- **Backend Services:** [Firebase Firestore](https://firebase.google.com/) (Real-time NoSQL Database)
- **Routing:** [React Router v7](https://reactrouter.com/)
- **Localization:** [react-i18next](https://react.i18next.com/)

## 🚀 Quick Start Guide

### 1. Prerequisites
- **Node.js**: Version 18.x or higher
- **NPM** or **Yarn**

### 2. Installation

```bash
# Clone the repository
git clone <your-repository-url>

# Navigate into the project directory
cd <project-directory>

# Install all dependencies
npm install
# or
yarn install
```

### 3. Environment Setup
Configure your Firebase credentials. Open `src/config/firebase.ts` and replace the placeholder API keys and configuration objects with your own Firebase project credentials.

### 4. Development Server

```bash
# Start the local development server
npm run dev
# or
yarn dev
```
Access the application at: `http://localhost:5173`

### 5. Admin Access
Navigate to `/login`. Authenticate using an account that has been granted Administrative privileges in your Firebase Authentication setup.

## 📦 Build & Deployment

To prepare the application for a production environment (e.g., Vercel, Netlify, or Firebase Hosting):

```bash
# Generate a production build
npm run build
# or
yarn build
```

Once the build process completes, the `dist/` directory will contain the highly optimized static files ready for deployment.

---

**Note:** This is a proprietary source code framework. Please refer to your licensing agreement before distributing or modifying the core architecture for external commercial use.
