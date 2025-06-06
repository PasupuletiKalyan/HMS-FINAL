# Hostel Management System (HMS)

A web-based system for managing our University hostels, Managing Complaints, and related administrative tasks.

## Overview

The Hostel Management System (HMS) is designed to streamline and automate the management of student accommodations in Mahindra Univerity. The system handles room bookings, complaint management, fee payments, and administrative operations.

## Features

- **User Authentication**
  - Role-based access (Students, Wardens, Administrators)
  - Secure login

- **Student Features**
  - Hostel application and booking
  - Room selection with interactive floor plans
  - Fee payment
  - Complaint submission and tracking
  - Profile management
  - Virtual Tour of College

- **Warden Features**
  - Hostel occupancy monitoring
  - Student management
  - Complaint resolution

- **Admin Features**
  - System-wide management
  - User administration
  - Hostel configuration
  - Announcements Management

- **Interactive Hostel Layouts**
  - Visual representation of hostel blocks(SVG)
  - Real-time room availability
  - Interactive booking system

## Tech Stack

### Frontend
- React with TypeScript
- Vite for build tooling
- Interactive SVG floor plans(for diffrent hostel blocks and floors of our hostels)
- Responsive UI with CSS

### Backend
- Node.js
- Express.js
- MongoDB database
- JWT authentication

### Deployment
- Database hosted on MongoDB Atlas
- Backend deployed on AWS cloud server (512 MB free tier)

## Project Structure

├── Backend/            # Server-side code
│   ├── controllers/    # Business logic
│   ├── models/         # Database schemas
│   ├── routes/         # API endpoints
│   └── uploads/        # Uploaded files storage
│
├── Frontend/           # Client-side code
│   ├── public/         # Static assets
│   └── src/            # React components and logic
│       ├── components/ # Reusable UI components
│       ├── pages/      # Main application views(diffent pages and dashboards)
│       └── styles/     # CSS stylesheets

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- Git

### Backend Setup
1. Navigate to the backend directory:
   cd Backend

2. Install dependencies:
   npm install

3. Start the server:
   npm start or node server.js

### Frontend Setup
1. Navigate to the frontend directory:
   cd Frontend

2. Install dependencies:
   npm install

3. Start the development server:
   npm run dev

4. Access the application at `http://localhost:5173`

## Usage

### Student Flow
1. Login with student credentials
2. Complete hostel application form
3. Complete payment process
4. Select room from available options
5. View current booking and status

### Warden Flow
1. Login with warden credentials
2. View dashboard with hostel statistics
3. Manage student requests and complaints
4. Search Student with Application No.

### Admin Flow
1. Access admin dashboard
2. Manage users, hostels blocks and floors
3. Manage Announcements

Below is the one drive link for Additional Video(our website tour) and documents
https://1drv.ms/f/c/5b581e1ffec53fd6/Eup8qNQiG0dKk7V0Vut9xrsB5ispXsGu5nfGZt5s9PxuRw?e=hxUIbf

### LOGIN DETAILS
### STUDENT
 LOGIN ID : MUBT1001
 PASSWORD : Vikranth@0609
### WARDEN
LOGIN ID : Hostelcom@mahindrauniversity.edu.in
PASSWORD : Warden@1234
### ADMIN 
LOGIN ID : Admin@mahindrauniversity.edu.in
PASSWORD : Admin@123
