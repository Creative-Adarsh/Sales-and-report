# SalesPro - Enterprise Admin Dashboard

A professional, high-performance admin dashboard built with React, TypeScript, and Tailwind CSS. Designed with Atomic Design principles for scalability and maintainability.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-3.0-38B2AC?logo=tailwind-css&logoColor=white)

## 🚀 Features

*   **Atomic Architecture**: Codebase organized into Atoms, Molecules, and Organisms.
*   **Interactive Analytics**: 
    *   Dynamic filtering by Year, Chart Type, and Sales Thresholds.
    *   Visualizations using `recharts` (Bar, Line, Area).
*   **Transaction Management**: Detailed data grid with search, status badges, and currency formatting.
*   **Professional Reporting**:
    *   **CSV Export**: One-click raw data export.
    *   **Print Mode**: Optimized CSS for generating clean PDF reports (Ctrl+P).
*   **Responsive UI**: Fully responsive sidebar layout with mobile drawer support.

## 🛠 Tech Stack

*   **Core**: React 19, TypeScript
*   **Styling**: Tailwind CSS
*   **Charts**: Recharts
*   **Icons**: Heroicons (SVG)
*   **Build**: Vite / Next.js compatible

## 📂 Project Structure

```bash
/
├── components/
│   ├── ui/           # Atoms: Button, Input, Select, Card
│   ├── charts/       # Molecules: Reusable Chart wrappers
│   └── dashboard/    # Organisms: Dashboard, Transactions, Settings
├── services/         # API services (GenAI, Fetch)
├── utils/            # Utilities: Export logic, Formatters
├── types.ts          # Type definitions
└── constants.ts      # Mock data and Config
```

## ⚡ Quick Start

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Start Development Server**
    ```bash
    npm run dev
    ```

3.  **Build for Production**
    ```bash
    npm run build
    ```

## 🎨 Atomic Design Implementation

- **Atoms**: Functional units like `Button.tsx`, `Input.tsx`. Stateless and purely presentational.
- **Molecules**: Combinations of atoms like `SalesChart.tsx`.
- **Organisms**: Complex sections like `FilterBar.tsx` that manage local state.
- **Templates**: Page layouts like `Dashboard.tsx`.

## 📄 License

This project is licensed under the MIT License.
