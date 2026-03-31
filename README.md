# Assignment 7

**Author:** abo al magd  
**Group:** Node_C45_Mon&Thurs_8:30pm_(Online)

---

## Project Overview

This repository contains a full-featured Node.js RESTful API for user authentication and note management, featuring secure signup/login, encrypted user data, and robust access control. The application is architected using Express, MongoDB (via Mongoose), and follows modern best practices for modular backend projects.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [API Reference](#api-reference)
- [Setup & Usage](#setup--usage)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)

---

## Features

- **User Authentication:** JWT-based signup, login, update, deletion, and profile access.
- **Note Management:** CRUD operations for notes associated with users.
- **Data Security:** Passwords hashed with bcrypt; phone numbers encrypted with AES.
- **Authorization:** Middleware enforces access control via JWT.
- **Pagination & Search:** Notes listing includes pagination and search by title/content.
- **Aggregation & Analytics:** Aggregation endpoints for advanced queries.
- **Error Handling:** Centralized error handler with dev/production modes.
- **Modular Structure:** Logical separation using Express routers, service layers, and models.

---

## Tech Stack

- **Node.js** (ES Modules)
- **Express** (`^5.2.1`)
- **MongoDB** (via Mongoose `^9.1.5`)
- **JWT** (`jsonwebtoken`)
- **bcrypt**
- **dotenv**
- **crypto-js**
- **cross-env**

---

## Architecture

```shell
src/
  main.js               # Entry point
  app.bootstrap.js      # App startup and wiring
  DB/
    connection.db.js    # DB connection logic
    model/
      user.model.js     # User Mongoose schema
      note.model.js     # Note Mongoose schema
  middleware/
    auth.middleware.js  # JWT authorization
  modules/
    user/
      user.controller.js  # User endpoints
      user.service.js     # User business logic
    notes/
      notes.controller.js # Notes endpoints
      notes.service.js    # Notes business logic
config/
  config.service.js     # Env configuration
.env.*                  # Per-environment variables
```

---

## API Reference

### Users

- `POST   /users/signup` — Register a new user (name, email, password, phone, age).
- `POST   /users/login` — Login with email and password, returns JWT.
- `PATCH  /users/` — Update user profile (requires token).
- `DELETE /users/` — Delete user account (requires token).
- `GET    /users/` — Get current user profile (requires token).

### Notes

All `/notes` endpoints require authentication.

- `POST   /notes/` — Create a new note (`title`, `content`).
- `GET    /notes/` — List notes, supports `page`, `size`, `searchKey`.
- `PATCH  /notes/all` — Bulk update notes' title for current user.
- `PATCH  /notes/:noteId` — Update a specific note.
- `PUT    /notes/replace/:noteId` — Replace a note document.
- `DELETE /notes/:noteId` — Delete a specific note.
- `DELETE /notes/` — Delete all notes of the user.
- `GET    /notes/:id` — Get a specific note by ID.
- `GET    /notes/note-by-content?content=...` — Search note by content.
- `GET    /notes/note-with-user` — Get notes with user data.
- `GET    /notes/aggregate?title=...` — Aggregate notes with advanced lookups.

---

## Setup & Usage

1. **Install Dependencies**

   ```bash
   npm install
   ```

2. **Create Environment Variables**

   Add `.env.development` and `.env.production` in `/config`:

   ```
   PORT=7000
   DB_URI=your_mongo_uri
   SALT_ROUND=10
   NODE_ENV=development
   ```

3. **Run the App**

   - Development: `npm run start:dev`
   - Production: `npm run start:prod`

4. **Base URL:**  
   ```
   http://localhost:7000/
   ```

---

## Environment Variables

Edit or supply variables in `/config/.env.*`

- `PORT` - Server port (default: 7000)
- `DB_URI` - MongoDB connection string
- `SALT_ROUND` - Bcrypt salt rounds (default: 10)
- `NODE_ENV` - `development` or `production`
- (Other secrets as required, such as JWT secret keys)

---

## Project Structure

```
assignment-7/
├── bonus.js                  # Utility for string processing
├── config/
│   └── config.service.js     # Env and config logic
├── package.json
├── src/
│   ├── app.bootstrap.js      # Main app composer
│   ├── main.js               # Entry point
│   ├── DB/
│   │   ├── connection.db.js  # Database connection setup
│   │   └── model/
│   │       ├── user.model.js # User schema
│   │       └── note.model.js # Note schema
│   ├── middleware/
│   │   └── auth.middleware.js # Authentication middleware
│   └── modules/
│       ├── notes/
│       │   ├── notes.controller.js
│       │   └── notes.service.js
│       └── user/
│           ├── user.controller.js
│           └── user.service.js
```

---

## Notes

- **Password hashing** and **phone encryption** are handled at signup.
- Comprehensive RESTful endpoints for both user accounts and their private notes.
- All business logic is handled in the `service.js` files for each module.
- Error handling is centralized and meticulous, with developer-friendly stack traces in development mode.
- Production-ready, modular, and secured with best industry practices.
