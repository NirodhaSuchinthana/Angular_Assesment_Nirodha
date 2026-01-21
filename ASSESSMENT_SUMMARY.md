# Assessment Repository Summary

## Overview

This repository contains a complete assessment project for Frontend Developer candidates. The project includes:

- **Backend**: Node.js/Express API server (mostly complete)
- **Frontend**: Angular 15+ application scaffold (candidates will build on this)
- **Tasks**: 3 focused tasks designed to be completed in 4-5 hours

## Repository Structure

```
.
├── backend/                    # Node.js/Express API
│   ├── server.js              # API server with loan/borrower endpoints
│   ├── package.json           # Backend dependencies
│   └── .gitignore
│
├── frontend/                   # Angular application
│   ├── src/
│   │   ├── app/
│   │   │   ├── app.module.ts  # Main app module
│   │   │   ├── app-routing.module.ts  # Routing configuration
│   │   │   ├── app.component.*  # Root component
│   │   │   ├── components/
│   │   │   │   └── home/      # Home/welcome component
│   │   │   └── services/
│   │   │       └── loan.service.ts  # API service (ready to use)
│   │   ├── index.html
│   │   ├── main.ts
│   │   └── styles.css
│   ├── angular.json           # Angular configuration
│   ├── package.json           # Frontend dependencies
│   └── tsconfig.*.json        # TypeScript configurations
│
├── README.md                   # Main documentation
├── SETUP.md                    # Quick setup guide
├── TASKS.md                    # Assessment tasks (3 tasks)
└── .gitignore
```

## Assessment Tasks

### Task 1: Loan List Component (2 hours)
- Display loans in a responsive table/card layout
- Implement filtering (by status, borrower name)
- Implement sorting (by amount, date)
- Ensure accessibility compliance

### Task 2: Loan Application Form (2 hours)
- Create reactive form with validation
- Submit to API
- Handle errors and success states
- Accessibility requirements

### Task 3: Loan Details & Performance (1 hour)
- Display loan details with borrower info
- Calculate monthly payment
- Implement lazy loading
- Performance optimizations (OnPush, etc.)

## What's Already Provided

### Backend (Complete)
- ✅ All API endpoints implemented
- ✅ In-memory data store with sample loans
- ✅ CORS enabled
- ✅ Request validation
- ✅ Error handling

### Frontend (Scaffold)
- ✅ Angular project structure
- ✅ Routing setup
- ✅ Loan service with all API methods
- ✅ Home component
- ✅ Basic styling
- ✅ TypeScript interfaces for Loan and Borrower

## What Candidates Need to Build

1. **LoanListComponent** - Task 1
2. **LoanApplicationComponent** - Task 2
3. **LoanDetailComponent** - Task 3
4. Update routing to include new components
5. Implement lazy loading module
6. Add responsive styles
7. Ensure accessibility

## Evaluation Criteria

Candidates will be evaluated on:
- ✅ Functionality (does it work?)
- ✅ Code quality and Angular best practices
- ✅ Responsive design
- ✅ Accessibility (WCAG 2.1 Level AA)
- ✅ Performance optimizations
- ✅ User experience
- ✅ TypeScript usage
- ✅ Error handling

## Time Estimate

**Total: 4-5 hours**
- Task 1: ~2 hours
- Task 2: ~2 hours
- Task 3: ~1 hour

## Getting Started

1. Candidates should read `README.md` first
2. Follow `SETUP.md` to get the environment running
3. Review `TASKS.md` for detailed requirements
4. Start implementing tasks

## Notes for Reviewers

- The backend is intentionally simple (in-memory store) for assessment purposes
- Candidates should focus on frontend implementation
- The loan service is already provided to save time
- Sample data is pre-populated in the backend
- All tasks are designed to be independent and testable

## Technical Stack

- **Backend**: Node.js, Express, CORS
- **Frontend**: Angular 15+, TypeScript, RxJS
- **Styling**: CSS3 (candidates can use any approach)
- **Testing**: Jasmine (optional bonus task)

---

**Repository Status**: Ready for candidate assessment
