# StaffSync — HR Management System

A full-stack MERN starter for employee management, attendance, leave requests, announcements and training. Built with React + Vite, Express, MongoDB/Mongoose, JWT and bcrypt.

## Requirements
- Node.js 18+
- MongoDB Atlas account OR local MongoDB

## Run locally
1. Open this folder in VS Code.
2. Open terminal at the `staffsync` folder and run:
   ```bash
   npm install
   npm run install:all
   ```
3. In `server`, copy `.env.example` to `.env` and configure `MONGO_URI` and `JWT_SECRET`.
4. Start MongoDB (if using local database).
5. From the project root run:
   ```bash
   npm run dev
   ```
6. Open http://localhost:5173

Backend: http://localhost:8000/api/health

## Create the first HR account
Register through the UI. For safety, public registration only permits `Employee` role. To create an HR or Manager, register an account, then promote its role directly in MongoDB Compass/Atlas for the first setup:
```js
db.users.updateOne({ email: "your-email@example.com" }, { $set: { role: "HR" } })
```
Use `Manager` instead of `HR` to create a manager. Do not expose public role selection in a production app.

## Features
- JWT login and registration; hashed passwords
- Role-based Employee, HR and Manager access
- Employee directory CRUD (HR)
- Leave request creation and HR/Manager approval/rejection
- Attendance check-in/check-out and HR attendance list
- Announcements creation and audience filtering
- Training creation, assignment and employee visibility
- Responsive dashboard UI

## Notes
This is a learning project starter. Before production, add stronger validation, rate limiting, audit logging, tests, email verification/password reset, and deployment secrets management.
