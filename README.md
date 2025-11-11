# P2P File Transfer System

A full-stack web application for secure peer-to-peer file sharing, featuring user authentication, file upload, sharing, and download functionalities. Built with React (frontend) and Node.js/Express/MongoDB (backend).

## Features
- User registration and login (JWT-based authentication)
- Upload files (images, PDFs, docs, etc.) with description and category
- Share files with specific users by username
- View files uploaded by you or shared with you
- Download files (access-controlled)
- Search files by name, description, or category
- Responsive, modern UI

## Folder Structure
```
P2P File Transfer System/
├── client/   # React frontend
├── server/   # Node.js/Express backend
└── README.md # Project documentation
```

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm or yarn
- MongoDB (local or cloud)

### 1. Clone the Repository
```bash
git clone https://github.com/Ranj-001/P2P-File-Sharing-System.git
cd P2P-File-Sharing-System
```

### 2. Setup the Backend (server)
```bash
cd server
npm install
# or
yarn install
```

#### Configure Environment Variables
Create a `.env` file in the `server/` directory:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

#### Start the Backend
```bash
npm run dev   # for development (nodemon)
# or
npm start     # for production
```

### 3. Setup the Frontend (client)
```bash
cd ../client
npm install
# or
yarn install
```

#### Configure API URL
Create a `.env` file in the `client/` directory:
```
REACT_APP_API_URL=http://localhost:5000
```

#### Start the Frontend
```bash
npm start
# or
yarn start
```
The app will run at [http://localhost:3000](http://localhost:3000)

## Usage
- Register a new account or log in
- Upload files and share with other registered users by username
- View and download files you uploaded or that were shared with you
- Use the search feature to find files

## Tech Stack
- **Frontend:** React, React Router, MUI, Axios
- **Backend:** Node.js, Express, MongoDB, Mongoose, JWT, Multer

## Scripts
### Client
- `npm start` – Start React dev server
- `npm run build` – Build for production
- `npm test` – Run tests

### Server
- `npm run dev` – Start backend with nodemon
- `npm start` – Start backend

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---
**Maintainer:** [Ranjan Kumar](https://github.com/Ranj-001) 