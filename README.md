# Product Manager

A full stack web application for managing products with complete CRUD operations, JWT authentication, image upload, search, filter, and pagination.

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, Axios, React Router
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas (Mongoose)
- **Auth:** JWT + bcrypt
- **Image Upload:** Multer
- **Containerization:** Docker + Docker Compose

## Features

- JWT Authentication (Register / Login)
- Add, View, Edit, Delete Products
- Image Upload (file or URL)
- Search products by name
- Filter by price range
- Pagination
- Loading states & toast notifications
- Responsive UI
- Docker support

## Project Structure

```
product-manager/
├── backend/
│   ├── src/
│   │   ├── config/        # MongoDB connection
│   │   ├── controllers/   # Route handlers
│   │   ├── middleware/    # Auth & upload middleware
│   │   ├── models/        # Mongoose schemas
│   │   └── routes/        # API routes
│   ├── uploads/           # Uploaded images
│   ├── server.js
│   ├── .env.example
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── api/           # Axios API calls
│   │   ├── components/    # Reusable components
│   │   ├── context/       # Auth context
│   │   └── pages/         # Page components
│   └── Dockerfile
├── docker-compose.yml
└── README.md
```

## Setup & Installation

### Prerequisites
- Node.js v18+
- MongoDB Atlas account
- Git

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/product-manager.git
cd product-manager
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

Fill in your values:

```
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/product-manager?appName=Cluster0
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d
```

Start the backend:

```bash
npm run dev
```

Backend runs on `http://localhost:5000`

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`

### 4. Docker Setup (Alternative)

```bash
docker-compose up --build
```

- Frontend: `http://localhost:80`
- Backend: `http://localhost:5000`

## API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login and get JWT token |

### Products
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/products` | No | Get all products (search, filter, paginate) |
| POST | `/api/products` | Yes | Create a product |
| PUT | `/api/products/:id` | Yes | Update a product |
| DELETE | `/api/products/:id` | Yes | Delete a product |

### Query Parameters for GET /api/products
- `search` — search by product name
- `minPrice` — filter by minimum price
- `maxPrice` — filter by maximum price
- `page` — page number (default: 1)
- `limit` — items per page (default: 8)

## Environment Variables

| Variable | Description |
|----------|-------------|
| `PORT` | Backend server port (default: 5000) |
| `MONGO_URI` | MongoDB Atlas connection string |
| `JWT_SECRET` | Secret key for JWT signing |
| `JWT_EXPIRES_IN` | JWT expiry duration (e.g. 7d) |

## Live Demo

- **Frontend:** [Live Link]
- **Backend API:** [Live Link]

## Author

Developed as a job task for Weero Digital.
