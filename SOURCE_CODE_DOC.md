# Hostel Management System (HMS) — Source Code Documentation

This document provides a high-level overview of the codebase for the Hostel Management System (HMS), describing the structure, main components, and how different parts interact. It is intended for developers who want to understand, maintain, or extend the project.

---

## Project Structure

```
HMS_SE/
├── Backend/           # Node.js/Express backend API
│   ├── controllers/   # Business logic for each resource (students, hostels, complaints, etc.)
│   ├── models/        # Mongoose schemas for MongoDB collections
│   ├── routes/        # Express route definitions for API endpoints
│   ├── uploads/       # Uploaded files (profile/warden photos)
│   ├── server.js      # Main server entry point
│   └── ...            # Config and utility files
│
├── Frontend/          # React + TypeScript frontend
│   ├── public/        # Static assets (HTML, images, etc.)
│   └── src/           # Source code
│       ├── components/ # Reusable UI components (forms, viewers, widgets)
│       ├── pages/      # Main application pages (dashboards, login, booking, etc.)
│       ├── config/     # API config and helpers
│       ├── services/   # API service functions (if any)
│       ├── styles/     # CSS stylesheets
│       └── utils/      # Utility/helper functions
│
├── README.md          # Project overview and setup
└── ...                # Deployment/config files
```

---

## Backend Overview (`Backend/`)

- **server.js**: Entry point. Sets up Express app, connects to MongoDB, registers all routes, and serves static files.
- **controllers/**: Each file contains business logic for a resource (e.g., `studentController.js`, `hostelController.js`). Handles requests, interacts with models, and sends responses.
- **models/**: Mongoose schemas for MongoDB collections (e.g., `Student.js`, `Hostel.js`, `Complaint.js`). Defines data structure and validation.
- **routes/**: Express routers mapping HTTP endpoints to controller functions (e.g., `studentRoutes.js`, `hostelRoutes.js`).
- **uploads/**: Stores uploaded images (profile photos, warden photos).

### Main Backend Flows
- **Authentication**: `/api/login` (handled in `server.js`)
- **Student Management**: `/api/students` (routes, controller, model)
- **Hostel/Room Management**: `/api/hostels`, `/api/occupied-beds` (routes, controller, model)
- **Complaints**: `/api/complaints` (routes, controller, model)
- **Announcements**: `/api/announcements`
- **Warden/Admin Actions**: `/api/warden`, `/api/users`

---

## Frontend Overview (`Frontend/`)

- **src/pages/**: Main application views (e.g., `LoginPage.tsx`, `StudentDashboard.tsx`, `WardenDashboard.tsx`, `AdminDashboard.tsx`). Each page handles a major user flow.
- **src/components/**: Reusable UI components (e.g., `HostelFloorPlanViewer.tsx` for interactive room selection, `ProfilePhotoUploader.tsx`).
- **src/config/api.ts**: API endpoint configuration and helpers.
- **src/styles/**: CSS files for styling pages and components.
- **src/services/**: (If present) Functions for making API calls.
- **src/utils/**: Utility/helper functions.

### Main Frontend Flows
- **Login**: `LoginPage.tsx` — Authenticates user and redirects based on role.
- **Student Booking**: `HostelFormPage.tsx` (application), `HostelBookingPage.tsx` (room selection), `CurrentBookingPage.tsx` (view booking).
- **Warden Dashboard**: `WardenDashboard.tsx` — Room allotment, student search, complaint management, uses `HostelFloorPlanViewer.tsx` for interactive room selection.
- **Admin Dashboard**: `AdminDashboard.tsx` — User and hostel management.
- **Profile Management**: `ProfilePhotoUploader.tsx`, profile pages.
- **Complaints**: Submission and tracking via student and warden pages.

---

## How Components Interact

- **Frontend pages** call API endpoints (from Backend) using fetch/axios (see `src/config/api.ts`).
- **Controllers** in Backend handle business logic, validate data, and interact with **models** (MongoDB).
- **Routes** map HTTP requests to controller functions.
- **Uploads**: Profile/warden photos are uploaded from the frontend and served as static files by the backend.

---

## Where to Look for...
- **Add/Edit API logic**: `Backend/controllers/` and `Backend/routes/`
- **Change data structure**: `Backend/models/`
- **Add a new page/feature**: `Frontend/src/pages/` and `Frontend/src/components/`
- **Change styles**: `Frontend/src/styles/`
- **API URLs/config**: `Frontend/src/config/api.ts`

---

## Example: Adding a New Feature
1. **Backend**: Add a new model, controller, and route for your resource.
2. **Frontend**: Add a new page/component, update API calls in `services/` or directly in the page.
3. **Connect**: Use the new API endpoint from your frontend component/page.

---

## Tips for Developers
- Follow the structure and naming conventions for new files.
- Use JSDoc/TSDoc comments for functions, classes, and components.
- Keep business logic in controllers, not in routes.
- Reuse components and styles where possible.
- Test API endpoints with tools like Postman before connecting frontend.

---

For more details, see comments in individual files and the main `README.md` for setup instructions.
