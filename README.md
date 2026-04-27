# Money Manager Client

A modern React frontend for tracking personal finances with dashboards, category management, income/expense tracking, advanced filters, and downloadable/email reports.

## Features

- Authentication with protected routes (`/login`, `/signup`, `/dashboard`, etc.)
- Dashboard with:
  - total balance, total income, total expense cards
  - recent transactions
  - finance overview donut chart
- Income management:
  - add/delete income entries
  - income trend chart
  - export income report to Excel
  - send income report by email
- Expense management:
  - add/delete expense entries
  - expense trend chart
  - export expense report to Excel
  - send expense report by email
- Category management:
  - create and update categories
  - type-based category support (`income`, `expense`)
- Filter page for transaction search:
  - type, date range, keyword
  - sorting by date/amount/category
  - ascending/descending order
- Profile image upload support via Cloudinary
- Responsive sidebar/top menu layout
- Toast notifications for success/error feedback

## Tech Stack

- React 19 + Vite
- Tailwind CSS 4
- React Router DOM
- Axios
- Recharts (pie/donut)
- Chart.js + react-chartjs-2 (line charts)
- Lucide React icons
- react-hot-toast

## Project Structure

```text
src/
  assets/           # static assets, sidebar metadata
  components/       # UI components (charts, lists, forms, layout)
  context/          # app context provider/state
  hooks/            # custom hooks (e.g. useUser)
  pages/            # route pages (Home, Income, Expense, Category, Filter, Auth)
  util/             # API endpoints, axios config, auth helpers, validators, report helpers
```

## Routes

- `/login` - Login page
- `/signup` - Signup page
- `/dashboard` - Dashboard (protected)
- `/income` - Income management (protected)
- `/expense` - Expense management (protected)
- `/category` - Category management (protected)
- `/filter` - Transaction filters (protected)

## Environment Variables

Create a `.env` file in the project root:

```env
VITE_BASE_URL=http://localhost:8080/api/v1.0
VITE_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
```

Notes:
- `VITE_BASE_URL` should point to your backend API base path.
- Cloudinary variables are required for profile image upload during signup.

## Getting Started

### 1) Clone the repository

```bash
git clone <your-repo-url>
cd moneymanagerclient
```

### 2) Install dependencies

```bash
npm install
```

### 3) Configure environment

Create/update `.env` using the variables above.

### 4) Run development server

```bash
npm run dev
```

App runs on the Vite dev server (usually `http://localhost:5173`).

## Available Scripts

- `npm run dev` - Start local development server
- `npm run build` - Build production bundle
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint checks

## Backend/API Requirements

This frontend expects a backend with endpoints matching the paths in `src/util/apiEndpoints.js`, including:

- Auth: `/login`, `/register`, `/profile`
- Categories: `/categories`, `/categories/:id`, `/categories/:type`
- Income: `/incomes`, `/incomes/:id`, `/incomes/report/excel`, `/incomes/report/email`
- Expense: `/expenses`, `/expenses/:id`, `/expenses/report/excel`, `/expenses/report/email`
- Dashboard: `/dashboard`
- Filter: `/filter`

Authentication is token-based (Bearer token in `Authorization` header for protected requests).

## Deployment Notes

- Build with:

```bash
npm run build
```

- Deploy the generated `dist/` folder to your preferred static hosting platform.
- Ensure your deployed frontend can reach the backend URL configured via `VITE_BASE_URL`.

## Contributing

1. Create a feature branch.
2. Make your changes.
3. Run `npm run lint`.
4. Commit and open a pull request.

## License

Add your preferred license (for example, MIT) in a `LICENSE` file before publishing publicly.