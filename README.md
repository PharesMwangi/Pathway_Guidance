# EdTech Assessment Platform

An educational technology platform that enables students to take assessments and view their results, while allowing administrators to manage questions and subjects.

## Features

### For Students
- User authentication (login/signup)
- Take online assessments
- View assessment results
- Access academic results

### For Administrators
- Manage subjects
- Create and manage assessment questions
- Oversee student assessments and results

## Tech Stack

### Backend
- **Node.js** with Express.js
- **Supabase** for database and authentication
- **CORS** for cross-origin requests

### Frontend
- **React** with Vite
- **TailwindCSS** for styling
- **React Router** for navigation
- **Supabase** for authentication

## Prerequisites

Before running this project, make sure you have the following installed:

- Node.js (v14 or higher)
- pnpm package manager
- Supabase account and project

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/PharesMwangi/Pathway_Guidance.git
   cd edtech
   ```

2. **Set up the backend:**
   ```bash
   cd backend
   pnpm install
   ```

3. **Set up the frontend:**
   ```bash
   cd ../react-frontend
   pnpm install
   ```

4. **Environment Configuration:**

   Create a `.env` file in the `backend` directory with the following variables:
   ```
   SUPABASE_URL=your_supabase_project_url
   SERVICE_ROLE_KEY=your_supabase_service_role_key
   ALLOWED_CORS_ORIGIN=http://localhost:5173
   PORT=5000
   ```

   Note: The frontend uses Supabase for authentication, so ensure your Supabase project is configured with the appropriate auth settings.

## Usage

1. **Start the backend server:**
   ```bash
   cd backend
   pnpm start
   ```
   The server will run on `http://localhost:5000`

2. **Start the frontend development server:**
   ```bash
   cd react-frontend
   pnpm dev
   ```
   The app will be available at `http://localhost:5173`

3. **Access the application:**
   - Open your browser and navigate to `http://localhost:5173`
   - Sign up or log in as a student or admin
   - Students can take assessments and view results
   - Admins can manage subjects and questions

## API Endpoints

The backend provides the following API endpoints:

- `/api/assessment` - Assessment-related operations
- `/api/results` - Results management
- `/api/academic` - Academic data
- `/api/admin` - Administrative functions
- `/api/scoring` - Scoring calculations

## Project Structure

```
edtech/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   └── services/
│   ├── package.json
│   └── pnpm-lock.yaml
└── react-frontend/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── hooks/
    │   └── lib/
    ├── package.json
    ├── vite.config.js
    └── README.md
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.