# DevenT - Community Event Management Platform

DevenT is a modern full-stack web platform designed to streamline the process of organizing, categorizing, registering for, and reviewing community events. The system is built with a clean separation between the Client (React) and Server (Laravel RESTful API), focusing on role-based access, automatic waitlist handling, and real-time data state management.

---

## 🛠️ Technology Stack

### 1. Frontend
* **Core library:** ReactJS (initialized with Vite for fast development and runtime performance).
* **State management:** Zustand with the `persist` middleware to automatically sync user session state to `localStorage`.
* **API communication:** Axios with interceptors to automatically attach the authentication token (`Authorization: Bearer <token>`) to every request and centrally handle `401 Unauthorized` responses when a session expires.
* **Routing & protection:** React Router Dom combined with the `<PrivateRoute>` component to enforce strict route access based on user roles.

### 2. Backend & Database
* **Framework:** Laravel 11 optimized for RESTful API performance.
* **Authentication:** Laravel Sanctum manages sessions using encrypted token strings stored in the `personal_access_tokens` table.
* **Database:** MySQL for relational data storage with strict foreign key constraints to ensure data integrity.

---

## 📌 Core Business Rules & Scope Constraints

To ensure the system operates according to technical requirements and analysis documents, the development team must strictly follow these three core rules:

### 1. No Event Deletion
* The system does not provide any delete button or API endpoint to remove event records from the database, preserving data integrity and history.
* Events can only be edited while in `Draft` status or explicitly switched to `Cancelled` by the Organizer.

### 2. Review & Feedback Restriction for Finished Events
* Attendees can only submit ratings and comments for events they successfully registered for (`Confirmed`) and that have fully ended.
* Display rule: the public review block, comment feed, and average rating (`AVG()`) on the event details page must remain hidden until the event status becomes `Finished`.

### 3. Automatic FIFO Waitlist
* When an event reaches full capacity (`capacity`), the registration button automatically changes to "Join Waitlist". Users registering at that time are stored with `Waiting` status.
* When a confirmed participant cancels their registration, the backend automatically finds the earliest `Waiting` user and upgrades them to `Confirmed`. This update happens directly in the database, without push notification support (In-app/Email/SMS notifications are out of scope).

---

## 📂 Project Directory Structure

The project is split into two independent folders running in parallel:

```plaintext
devent-advanced-web-project/
├── backend/                             # SERVER SOURCE CODE (LARAVEL 11)
│   ├── app/
│   │   ├── Http/
│   │   │   ├── Controllers/
│   │   │   │   ├── AuthController.php   # Handles registration, login, and logout
│   │   │   │   └── EventController.php  # Handles event CRUD (Create/Edit/Cancel) and status management
│   │   │   └── Middleware/
│   │   │       └── CheckRole.php        # Role-based middleware protecting API routes
│   │   └── Models/
│   │       ├── User.php                 # User model (Attendee/Organizer) includes HasApiTokens
│   │       ├── Event.php                # Event model (manages Draft/Published/Cancelled/Finished statuses)
│   │       ├── Registration.php         # Registration model (Confirmed/Waiting)
│   │       └── Review.php               # Review model for event feedback
│   ├── database/
│   │   ├── migrations/                  # MySQL table structure files with foreign key constraints
│   │   └── seeders/                     # Seeders for sample system data used in testing
│   └── routes/
│       └── api.php                      # Defines public and auth:sanctum protected API routes
│
└── frontend/                            # CLIENT SOURCE CODE (REACT / VITE)
    ├── src/
    │   ├── components/
    │   │   ├── common/                  # Reusable components (EventCard, CategoryCard, Search)
    │   │   ├── layout/                  # Fixed layout components (NavBar, Footer)
    │   │   └── PrivateRoute.jsx         # Protects routes and prevents cross-role access
    │   ├── hooks/
    │   │   ├── useLogin.js              # Custom hook for login logic and client-side validation
    │   │   └── useRegister.js           # Custom hook for registration form logic
    │   ├── pages/
    │   │   ├── Attendee/                # Attendee-specific UI (Dashboard, Login, Register)
    │   │   ├── Organizer/               # Organizer-specific UI (Dashboard, Login, Register)
    │   │   └── Home/                    # Public event discovery pages
    │   ├── services/
    │   │   └── authService.js           # Auth API endpoint manager (POST /login, POST /logout)
    │   ├── store/
    │   │   └── authStore.js             # Zustand store for token and user session data
    │   ├── utils/
    │   │   └── api.js                   # Axios instance configuration and interceptors
    │   ├── App.jsx                      # Main router configuration with React Router Dom
    │   └── main.jsx                     # Frontend application entry point
```

## 🚀 Installation & Setup

### 1. Database Setup
Open your MySQL database manager (XAMPP, phpMyAdmin, or MySQL Workbench).

Create an empty database named `devent_db`.

### 2. Backend Setup (Laravel)
Open a terminal inside the `backend/` folder and run the following commands:

```bash
# 1. Change into the backend directory
cd backend

# 2. Install backend dependencies
composer install

# 3. Create the environment configuration file
cp .env.example .env

# 4. Generate the application key
php artisan key:generate
```

Open the newly created `.env` file in `backend/`, locate the DB_ settings, and update them for your local environment:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=devent_db
DB_USERNAME=root
DB_PASSWORD=YOUR_MYSQL_PASSWORD_HERE
```

Run migrations and seed the database:

```bash
# Run migrations and seed sample data
php artisan migrate --seed

# Start the local backend server
php artisan serve
```

The default backend server will run at: `http://127.0.0.1:8000`

### 3. Frontend Setup (React)
Open a new terminal window, change into the `frontend/` folder, and run:

```bash
# 1. Change into the frontend directory
cd frontend

# 2. Install Node.js packages (React Router, Zustand, Axios, etc.)
npm install

# 3. Create the environment configuration file
cp .env.example .env
```

Make sure the frontend `.env` file contains the correct API base URL that points to the Laravel backend:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000/api
```

Start the frontend application:

```bash
# 4. Start the Vite development server
npm run dev
```

The client app should be available at: `http://localhost:5173`

## 🔄 Development & Commit Workflow

The project uses Conventional Commits for a consistent git history. Team members should create feature branches from `develop` and use the following commit prefixes:

* `feat:` for new features (for example: `feat: add event editing screen`).
* `fix:` for bug fixes or technical corrections.
* `chore:` for project setup, configuration, or dependency changes.
