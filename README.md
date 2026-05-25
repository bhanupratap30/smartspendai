# SmartSpend AI

SmartSpend AI is a full-stack expense management application built using React, Vite, Spring Boot, and MongoDB.  
It helps users manage expenses, track spending, and analyze financial data efficiently.

---

# Project Structure

```bash
smartspend-ai/
│
├── smartspend/            # Frontend (React + Vite)
├── smartspend-backend/    # Backend (Spring Boot)
```

---

# Tech Stack

## Frontend
- React.js
- Vite
- Tailwind CSS

## Backend
- Spring Boot
- MongoDB
- Maven

---

# Prerequisites

Make sure these are installed on your system:

- Java 17
- Maven
- Node.js
- MongoDB

Check versions using:

```bash
java -version
mvn -version
node -v
npm -v
```

---

# Backend Setup (Spring Boot)

## Step 1: Navigate to Backend Folder

```bash
cd smartspend-backend
```

---

## Step 2: Configure MongoDB

Open:

```bash
src/main/resources/application.properties
```

Add your MongoDB connection URL:

```properties
spring.data.mongodb.uri=YOUR_MONGODB_URL
server.port=8080
```

---

## Step 3: Install Dependencies and Run Backend

```bash
mvn clean install
mvn spring-boot:run
```

Backend will start on:

```bash
http://localhost:8080
```

---

# Frontend Setup (React + Vite)

## Step 1: Navigate to Frontend Folder

```bash
cd smartspend
```

---

## Step 2: Install Dependencies

```bash
npm install
```

---

## Step 3: Create Environment File

Create a `.env` file inside the `smartspend` folder.

Example:

```env
VITE_API_URL=http://localhost:8080
```

---

## Step 4: Run Frontend

```bash
npm run dev
```

Frontend will start on:

```bash
http://localhost:5173
```

---

# Important Notes

- Start MongoDB before running the backend.
- Run backend first, then frontend.
- `.env` and `node_modules` are ignored using `.gitignore`.

---

# Build Commands

## Frontend Production Build

```bash
npm run build
```

## Backend Build

```bash
mvn clean package
```

---

# GitHub Push Commands

```bash
git add .
git commit -m "Initial Commit"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_LINK
git push -u origin main
```

---

# API Base URL

```bash
http://localhost:8080/api
```

---

# Troubleshooting

## Backend Not Starting

Check:
- Java version
- MongoDB connection
- Maven installation

Commands:

```bash
java -version
mvn -version
```

---

## Frontend Not Starting

Check Node.js installation:

```bash
node -v
npm -v
```

Reinstall dependencies if needed:

```bash
npm install
```

---

