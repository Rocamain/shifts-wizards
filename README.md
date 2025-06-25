Shift Wizards
===============

The repository contains a **Next.js 15** front‑end for managing shop rotas. It lets you maintain a list of employees, build weekly shift schedules and automatically resolve unassigned shifts by calling a Flask backend.

Features
--------

-   Create and edit employees with contract hours, roles (Team Leader, CTM, Baker) and unavailable periods.

-   Design weekly rotas with drag‑and‑drop shifts, respecting shop opening hours.

-   Auto‑assign remaining shifts by hitting `/api/schedule`, which calls the Flask service while applying rate limiting and reading environment variables `FLASK_URL` and `FLASK_SECRET_KEY`  
-   Print-friendly rota view.

Getting Started
---------------

Install dependencies and run the dev server:

`npm install
npm run dev # or yarn dev / pnpm dev / bun dev  `

Open `http://localhost:3000` in the browser. You can modify pages under `src/app` and React components under `src/ui`.

### Environment Variables

Create a `.env.local` file and define:

`FLASK_URL=<URL of your Flask backend> FLASK_SECRET_KEY=<API key expected by Flask> `

Project Structure
-----------------

-   **src/app** -- Next.js routes and layout (see `src/app/page.tsx` for an overview of the application goals).

-   **src/ui** -- React components for employees, rota editor and helpers.

-   **src/lib** -- Context providers and utilities for employees and rota management.

Scripts
-------

-   `npm run dev` -- run Next.js in development mode.

-   `npm run build` -- create a production build.

-   `npm run start` -- start the production server.

-   `npm run lint` -- lint the source code.

The application uses Tailwind CSS for styling and leverages `next/font` to load local fonts. The sample configuration for Tailwind is in `tailwind.config.ts`

.
