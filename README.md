# Y15 - Clean Energy Innovations Dashboard

A Single Page Application (SPA) showcasing recent innovations in clean energy, built with Angular and Node.js.

## Tech Stack

- **Frontend**: Angular 21
- **Backend**: Node.js with Express
- **Database**: MySQL
- **Authentication**: JWT (JSON Web Tokens)
- **Charts**: Chart.js

## Features

- User registration and authentication system
- JWT-based authentication with encrypted passwords (bcrypt)
- User credentials stored securely in MySQL database
- Protected routes requiring login
- Dashboard with 200-word summary on clean energy innovations
- Technical implementation description
- Two dynamic charts:
  - Investment Summary: Global clean energy investment by technology
  - Regional Reports: Regional clean energy capacity growth

## Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- MySQL (v5.7 or higher)
- npm

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
PORT=3000
NODE_ENV=development

# Database
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=y15_clean_energy
DB_PORT=3306

# JWT
JWT_SECRET=your_secret_key_here
```

4. Setup database:
```bash
mysql -u root -p < database/schema.sql
```

5. Start backend server:
```bash
npm start
```

The backend will run on http://localhost:3000

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm start
```

The frontend will run on http://localhost:4200

### Configure API URL in frontend

For production deployment, update the API base URL:

**File**: `frontend/src/app/config/api.config.ts`

```typescript
export const API_CONFIG = {
  baseUrl: 'http://your-server-ip:3000',  // Change this
  // ...
};
```

## References

- [IEA - Renewables: Analysis and Forecast to 2028](https://www.iea.org/energy-system/renewables)
