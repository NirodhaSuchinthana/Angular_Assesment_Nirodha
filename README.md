# Frontend Developer Assessment

Welcome to the Creative Information Technology, Inc. (CITI) Frontend Developer Assessment. This repository contains a loan origination and servicing system with a Node.js backend and an Angular frontend.

## Overview

This assessment is designed to evaluate your skills in:
- Angular development (Angular 15+)
- TypeScript, HTML5, and CSS3
- Responsive design and cross-browser compatibility
- Front-end performance optimization
- Accessibility (WCAG guidelines)
- API integration
- Code quality and best practices

## Time Estimate

**Expected completion time: 4-5 hours**

## Prerequisites

Before starting, ensure you have the following installed:
- Node.js (v18 or higher)
- npm (v9 or higher) or yarn
- Angular CLI (v15 or higher): `npm install -g @angular/cli`

## Project Structure

```
.
├── backend/          # Node.js/Express API server
├── frontend/         # Angular application
├── TASKS.md          # Assessment tasks and requirements
└── README.md         # This file
```

## Setup Instructions

### 1. Clone and Install Dependencies

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Start the Backend Server

```bash
cd backend
npm start
```

The backend API will be available at `http://localhost:3000`

### 3. Start the Frontend Application

In a new terminal:

```bash
cd frontend
ng serve
```

The frontend application will be available at `http://localhost:4200`

**Note:** The Angular app is configured with a proxy that automatically routes `/api` requests to the backend server at `http://localhost:3000`. This eliminates CORS issues during development.

## API Endpoints

The backend provides the following endpoints:

- `GET /api/loans` - Get all loans
- `GET /api/loans/:id` - Get a specific loan by ID
- `POST /api/loans` - Create a new loan
- `PUT /api/loans/:id` - Update a loan
- `DELETE /api/loans/:id` - Delete a loan
- `GET /api/borrowers` - Get all borrowers
- `GET /api/borrowers/:id` - Get a specific borrower by ID

## Assessment Tasks

Please refer to `TASKS.md` for detailed task descriptions and requirements.

## Submission Guidelines

1. Complete all tasks as specified in `TASKS.md`
2. Ensure your code follows Angular best practices
3. Make sure the application is responsive and accessible
4. Test your implementation thoroughly
5. Commit your changes with clear, descriptive commit messages
6. Push your code to your own repository and share the link

## Evaluation Criteria

Your submission will be evaluated based on:
- **Functionality**: Does the code work as expected?
- **Code Quality**: Clean, maintainable, and well-structured code
- **Best Practices**: Following Angular and TypeScript best practices
- **Responsive Design**: Works well on different screen sizes
- **Accessibility**: WCAG 2.1 Level AA compliance
- **Performance**: Optimized rendering and API calls
- **User Experience**: Intuitive and polished interface

## Questions?

If you have any questions about the assessment, please reach out to the hiring team.

Good luck!
