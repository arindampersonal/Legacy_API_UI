# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

**Installing the Dependancies**

**Step 1: Install Node.js**
First check if Node.js is installed:
node -v
npm -v
If not installed:
Download from:
https://nodejs.org/
Install the LTS version.
________________________________________
**Step 2: Create a New React Project using Vite**
Open terminal / PowerShell:
npm create vite@latest legacy-api-ui
It will ask:
Project name → legacy-api-ui
Framework → React
Variant → JavaScript
Then move inside the project:
cd legacy-api-ui
________________________________________
**Step 3: Install Dependencies**
Run:
npm install
Then install required packages:
npm install framer-motion lucide-react
Also install Tailwind:
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
________________________________________
**Step 4: Configure Tailwind CSS**
Open:
tailwind.config.js
Replace with:
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
________________________________________
**Step 5: Update CSS File**
Open:
src/index.css
Delete everything and paste:
@tailwind base;
@tailwind components;
@tailwind utilities;
________________________________________
**Step 6: Install shadcn/ui Components**
Run:
npx shadcn@latest init
Choose:
Style → Default
Base color → Slate
Use CSS Variables → Yes
Then install required components:
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add input
npx shadcn@latest add textarea
npx shadcn@latest add tabs
npx shadcn@latest add select
npx shadcn@latest add badge
________________________________________
**Step 7: Replace App.jsx**
Open:
src/App.jsx
Delete existing code.
Paste the full code I generated for you.
Make sure:
export default function LegacyApiDashboard()
is present.
________________________________________
**Step 8: Start Development Server**
Run:
npm run dev
You will see something like:
Local: http://localhost:5173/
Open it in browser.
Your frontend will run 🎉
________________________________________
**Final Folder Structure**
Should look like:
legacy-api-ui/
 ├── src/
 │   ├── App.jsx
 │   ├── index.css
 │   └── components/
 ├── package.json
 ├── tailwind.config.js
 └── vite.config.js
________________________________________
**If You Get Error: "@/components/ui"**
Then update:
vite.config.js
with:
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
Also install:
npm install path

