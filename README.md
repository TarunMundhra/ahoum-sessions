# Ahoum Sessions - Session Booking Marketplace

A full-stack, fully dockerized session booking platform. This platform is designed as a portfolio piece and assignment deliverable, with a clean one-click setup so reviewers can immediately understand the architecture and run the project.

## 🚀 Architecture Overview

This project is built with a production-ready, multi-container Docker setup:

- **Frontend:** React (Vite)
- **Backend:** Django & Django REST Framework (DRF)
- **Database:** PostgreSQL
- **Reverse Proxy:** Nginx
- **Authentication:** JWT via `dj-rest-auth` and Google OAuth via `dj-rest-auth` / social login integration

The infrastructure is entirely **one-click**. A custom `entrypoint.sh` automatically handles Django startup tasks, including database migrations.

## 📋 Prerequisites

- **Docker-desktop** installed on your machine and engine running during installation
- **Git**
## 🛠️ Installation & Setup (One-Click Boot)

### 1. Clone the repository

```bash
git clone <YOUR_GITHUB_REPO_URL>
cd ahoum-sessions
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory. You can copy the provided example file:

```bash
cp .env.example .env
```

Ensure your `.env` file contains the following structure (replace with your secure values):

```env
# Django Security
DJANGO_SECRET_KEY=your-secure-random-string
DJANGO_DEBUG=True

# PostgreSQL Database
POSTGRES_USER=ahoum_user
POSTGRES_PASSWORD=your-secure-db-password
POSTGRES_DB=ahoum_sessions_db

# Google OAuth Credentials
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_SECRET_KEY=your-google-client-secret
```

### 3. Build and Run the Application

Run the following command to build the images and start the system.

> Note: The custom entrypoint script will automatically apply all Django database migrations in the background.

```bash
docker compose up -d --build
```

### 4. Create an Admin Account

To manage the database and social auth settings, create a superuser:

```bash
docker compose exec backend python manage.py createsuperuser
```

## 🌐 Accessing the Application

Once the containers are running, you can access the different services at:

- Frontend App: http://localhost:5173
- Django Admin Panel: http://localhost:8000/admin
- Backend API Base URL: http://localhost:8000/api/

## 🔐 Google OAuth Setup Instructions

To enable Google Login, you must generate credentials in the Google Cloud Console and link them to this project.

### Step 1: Google Cloud Console Configuration

1. Go to the Google Cloud Console.
2. Create a new project (or select an existing one).
3. Navigate to **APIs & Services > OAuth consent screen**. Choose **External** and fill in the required app details.
4. Navigate to **APIs & Services > Credentials**.
5. Click **Create Credentials > OAuth client ID**.
6. Select **Web application** as the application type.
7. Under **Authorized JavaScript origins**, add:

```text
http://localhost:5173 (Frontend)
http://127.0.0.1:5173
```

8. Under **Authorized redirect URIs**, add your frontend auth handler (adjust based on your React routing):

```text
http://localhost:5173/auth/callback
http://127.0.0.1:8000/accounts/google/login/callback/
```

9. Click **Create**. Copy your **Client ID** and **Client Secret**.

### Step 2: Django Configuration

1. Paste your new Client ID and Client Secret into your root `.env` file:

```env
GOOGLE_CLIENT_ID=your-copied-client-id
GOOGLE_SECRET_KEY=your-copied-client-secret
```

2. Restart your Docker containers to apply the new environment variables:

```bash
docker compose up -d
```

3. Go to the Django Admin panel (`http://localhost:8000/admin`) and log in.
4. Navigate to **Sites > Sites**. Edit the default `example.com` site:
   - Domain name: `localhost:8000`
   - Display name: `Ahoum Sessions`

   Save the changes.

5. The backend is now fully configured to accept Google OAuth tokens and issue JWTs to the React frontend.

## 🛑 Stopping the Application

To stop the application while preserving your database data:

```bash
docker compose down
```

To stop the application and completely wipe the database volume:

```bash
docker compose down -v
```
---
