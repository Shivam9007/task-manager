# TaskFlow — Task Manager App

A full-stack task management web application built with Node.js, Express, MongoDB, and vanilla JavaScript.

---

## 🚀 Live Demo

- **Frontend:** Open `frontend/index.html` via Live Server
- **Backend API:** Deployed on Railway

---

## 🛠 Tech Stack

**Backend**
- Node.js
- Express.js v5
- MongoDB + Mongoose
- JWT (JSON Web Tokens) for authentication
- bcryptjs for password hashing
- CORS enabled

**Frontend**
- HTML5, CSS3, Vanilla JavaScript
- Responsive dark UI with animated background
- Live clock, progress tracking, analytics

---

## 📁 Project Structure

```
task-manager/
├── backend/
│   ├── middleware/
│   │   └── auth.js          # JWT authentication middleware
│   ├── models/
│   │   ├── User.js          # User schema
│   │   ├── task.js          # Task schema
│   │   └── project.js       # Project schema
│   ├── routes/
│   │   ├── auth.js          # Register & Login routes
│   │   ├── task.js          # Task CRUD routes
│   │   └── project.js       # Project routes
│   ├── .env                 # Environment variables (not committed)
│   ├── .gitignore
│   ├── package.json
│   └── server.js            # Entry point
├── frontend/
│   ├── index.html           # Login & Register page
│   ├── dashboard.html       # Main dashboard
│   ├── script.js            # API calls & UI logic
│   └── style.css            # Styles
├── railway.json             # Railway deployment config
└── README.md
```

---

## ⚙️ Setup & Installation

### Prerequisites
- Node.js v18+
- MongoDB Atlas account
- Git

### 1. Clone the repository

```bash
git clone https://github.com/Shivam9007/task-manager.git
cd task-manager/backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env` file inside `/backend`

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=8000
```

### 4. Start the server

```bash
node server.js
```

### 5. Open the frontend

Open `frontend/index.html` using VS Code Live Server at:
```
http://127.0.0.1:5500/frontend/index.html
```

---

## 🔐 API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login and receive JWT token |

### Tasks (Protected — requires Bearer token)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | Get all tasks |
| POST | `/api/tasks` | Create a new task |
| PUT | `/api/tasks/:id` | Update task status |
| DELETE | `/api/tasks/:id` | Delete a task |

### Projects (Protected)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/projects` | Get all projects |
| POST | `/api/projects` | Create a new project |

---

## 🌐 Deployment

### Backend — Railway
1. Push code to GitHub
2. Connect repo to [Railway](https://railway.app)
3. Set environment variables in Railway dashboard:
   - `MONGO_URI`
   - `JWT_SECRET`
   - `PORT`
4. Set Root Directory to `backend`
5. Railway auto-deploys on every `git push`

### Frontend
- Served via VS Code Live Server locally
- Can be deployed to Netlify, Vercel, or GitHub Pages

---

## ✨ Features

- ✅ User registration and login with JWT auth
- ✅ Password hashing with bcryptjs
- ✅ Full task CRUD (Create, Read, Update, Delete)
- ✅ Task status tracking (Pending / In Progress / Completed)
- ✅ Beautiful dark dashboard with animated UI
- ✅ Real-time stats and progress bar
- ✅ Analytics panel with donut chart
- ✅ Calendar view
- ✅ Filter tasks by status
- ✅ Responsive sidebar navigation

---

## 🔒 Security Notes

- Passwords are hashed using bcryptjs before storing
- JWT tokens expire after 7 days
- CORS is configured to allow only trusted origins
- `.env` file is excluded from version control

---

## 👨‍💻 Author

**Shivam Singh**
- GitHub: [@Shivam9007](https://github.com/Shivam9007)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
