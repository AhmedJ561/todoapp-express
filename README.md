# Todo App Express

A todo application built with Express.js, featuring a clean and responsive user interface with authentication and Node.js built-in SQLite database.

## Overview

This is a web-based todo application that allows users to manage their tasks efficiently. The application uses Express.js as the backend framework, Node.js built-in SQLite for data persistence, and JWT for authentication.

## Tech Stack

- **Backend:** Express.js (Node.js) with ES modules
- **Database:** Node.js built-in `node:sqlite` (DatabaseSync)
- **Authentication:** JWT & bcryptjs
- **Frontend:** HTML, CSS, JavaScript
- **Language Composition:**
  - CSS: 48.8%
  - HTML: 34%
  - JavaScript: 17.2%

## Features

- User authentication with JWT and bcryptjs
- Create, read, update, and delete todos
- User-specific todo management
- In-memory SQLite database for data persistence
- Responsive design with clean UI
- RESTful API endpoints
- Protected routes with JWT middleware

## Tech Dependencies

- `express` - Web framework
- `jsonwebtoken` - JWT authentication
- `bcryptjs` - Password hashing
- `node:sqlite` - Built-in SQLite database (no additional npm package needed)

## Getting Started

### Prerequisites

- Node.js (v22+) and npm installed on your machine

### Installation

1. Clone the repository:
```bash
git clone https://github.com/AhmedJ561/todoapp-express.git
cd todoapp-express
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with:
```
JWT_SECRET=your_jwt_secret_here
PORT=3000
```

4. Run the development server:
```bash
npm run dev
```

The development script uses Node's `--env-file` flag to load environment variables directly without requiring an external package.

## Project Structure

```
todoapp-express/
├── src/
│   ├── server.js           # Main application entry point
│   ├── db.js               # Database configuration and initialization
│   ├── routes/             # API route handlers (auth, todos)
│   └── middleware/         # Express middleware (auth, etc.)
├── public/
│   └── index.html          # Main HTML template
├── package.json            # Project dependencies and scripts
├── todo_app.rest           # REST API endpoint testing file
├── .env                    # Environment variables
└── .gitignore              # Git ignore rules
```

## Database Schema

### Users Table
```sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
)
```

### Todos Table
```sql
CREATE TABLE todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    task TEXT,
    completed BOOLEAN DEFAULT 0,
    FOREIGN KEY(user_id) REFERENCES users(id)
)
```

## Available Scripts

- `npm run dev` - Run the development server with hot reload, experimental SQLite features, and environment file loading via `--env-file`
- `npm test` - Run tests (currently not configured)

## API Endpoints

See `todo_app.rest` for example API requests and endpoints.

## Usage

1. Start the development server with `npm run dev`
2. Open your browser and navigate to `http://localhost:3000`
3. Create an account or login with your credentials
4. Start managing your todos

## License

This project is open source and available under the ISC License.

## Author

Ahmed J (AhmedJ561)

---

Feel free to contribute, report issues, or suggest improvements!
