# Intranet Media Streaming Service

A full-stack Netflix-like media streaming application for internal networks with advanced features like JWT authentication, video uploads, and personalized recommendations.

## 🎯 Features

- **JWT Authentication**: Secure user authentication with admin and user roles
- **Video Upload**: Admins can upload and manage videos
- **Video Streaming**: HTTP Range support for efficient video playback
- **Categories & Search**: Browse videos by categories and search functionality
- **User Engagement**: Like videos, track watch history, and continue watching
- **Responsive Design**: Modern Netflix-like UI with dark mode support
- **Admin Dashboard**: Admin panel for content management

## 🧱 Tech Stack

### Frontend
- **React 18** with Vite
- **Tailwind CSS** for styling
- **Axios** for API calls
- **React Router** for navigation

### Backend
- **Node.js** runtime
- **Express.js** framework
- **PostgreSQL** database
- **JWT** for authentication

## 📁 Project Structure

```
.
├── frontend/              # React Vite application
├── backend/               # Express API server
├── docs/                  # Documentation
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js v16+
- PostgreSQL 12+
- npm or yarn

### Installation

1. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```

2. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   ```

3. **Database Setup**
   - Create a postgres database named `imss_db`.
   - Run the initial schema migration in `backend/migrations/001_initial_schema.sql` (or use `run_migrations.bat`).
   - Run the seeded categories and test data via `backend/migrations/002_seed_categories.sql` and `003_sample_data.sql`.

4. **Environment Configuration**
   - The `.env` files are already provided based on `.env.example`.
   - Ensure `backend/.env` has the correct `DB_PASSWORD` for your postgres setup.

5. **Run Development Servers**
   - Backend: `npm run dev` (in backend directory)
   - Frontend: `npm run dev` (in frontend directory)

## 📖 Documentation

See [docs/](./docs) for detailed documentation.

## 👥 Contributors

- Prajeen Lishali

## 📄 License

MIT License
