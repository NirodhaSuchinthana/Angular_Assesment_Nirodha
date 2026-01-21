# Assessment Tasks

This document outlines the tasks you need to complete for the Frontend Developer assessment. Please read each task carefully and implement the required functionality.

## Task 1: Loan List Component (2 hours)

### Objective
Create a responsive loan list component that displays all loans from the API with filtering and sorting capabilities.

### Requirements

1. **Create a Loan List Component**
   - Component name: `LoanListComponent`
   - Route: `/loans`
   - Display loans in a table or card layout (your choice)

2. **Display Loan Information**
   - Loan ID
   - Borrower Name
   - Loan Amount
   - Interest Rate
   - Loan Status (Active, Pending, Closed)
   - Created Date (formatted as MM/DD/YYYY)

3. **Implement Filtering**
   - Filter by loan status (dropdown or buttons)
   - Filter by borrower name (search input)
   - Filters should work together (e.g., filter by status AND borrower name)

4. **Implement Sorting**
   - Sort by loan amount (ascending/descending)
   - Sort by created date (newest/oldest)
   - Visual indicators for current sort column and direction

5. **Responsive Design**
   - Desktop: Full table/card layout
   - Tablet: Optimized layout
   - Mobile: Stacked cards or simplified table

6. **Accessibility**
   - Proper ARIA labels
   - Keyboard navigation support
   - Screen reader friendly

### API Endpoint
- `GET /api/loans` - Returns array of loan objects

### Example Loan Object
```json
{
  "id": 1,
  "borrowerId": 101,
  "borrowerName": "John Doe",
  "amount": 50000,
  "interestRate": 4.5,
  "status": "Active",
  "createdDate": "2024-01-15T10:30:00Z"
}
```

---

## Task 2: Loan Application Form (2 hours)

### Objective
Create a loan application form component with validation and submission to the API.

### Requirements

1. **Create a Loan Application Form Component**
   - Component name: `LoanApplicationComponent`
   - Route: `/loans/apply`
   - Use Angular Reactive Forms

2. **Form Fields**
   - Borrower Name (required, min 2 characters)
   - Loan Amount (required, number, min: 1000, max: 1000000)
   - Interest Rate (required, number, min: 0.1, max: 20, step: 0.1)
   - Loan Term in months (required, number, min: 12, max: 360)
   - Purpose (required, dropdown: "Home Purchase", "Refinance", "Home Improvement", "Other")

3. **Validation**
   - Real-time validation with error messages
   - Display validation errors below each field
   - Disable submit button when form is invalid
   - Show success message after successful submission

4. **Form Submission**
   - Submit to `POST /api/loans`
   - Show loading state during submission
   - Handle errors gracefully (display error message)
   - Reset form after successful submission
   - Navigate to loan list after successful submission (optional)

5. **Responsive Design**
   - Form should be usable on all screen sizes
   - Proper spacing and layout on mobile devices

6. **Accessibility**
   - All form fields have proper labels
   - Error messages are associated with fields (ARIA)
   - Keyboard navigation works throughout the form
   - Focus management (focus on first error field if validation fails)

### API Endpoint
- `POST /api/loans` - Creates a new loan

### Request Body Format
```json
{
  "borrowerName": "Jane Smith",
  "amount": 250000,
  "interestRate": 3.75,
  "termMonths": 360,
  "purpose": "Home Purchase"
}
```

---

## Task 3: Loan Details & Performance Optimization (1 hour)

### Objective
Create a loan details component with performance optimizations and implement lazy loading.

### Requirements

1. **Create a Loan Details Component**
   - Component name: `LoanDetailComponent`
   - Route: `/loans/:id`
   - Display full loan information including:
     - All loan fields
     - Borrower information (fetch from `/api/borrowers/:id` if borrowerId exists)
     - Payment schedule summary (calculate monthly payment)

2. **Performance Optimizations**
   - Implement OnPush change detection strategy
   - Use trackBy function if displaying lists
   - Implement loading states (skeleton screens or spinners)
   - Optimize API calls (avoid duplicate requests)

3. **Lazy Loading**
   - Implement lazy loading for the loans feature module
   - Update routing configuration accordingly

4. **Monthly Payment Calculation**
   - Formula: `M = P * [r(1+r)^n] / [(1+r)^n - 1]`
   - Where:
     - M = Monthly payment
     - P = Principal (loan amount)
     - r = Monthly interest rate (annual rate / 12 / 100)
     - n = Number of payments (term in months)
   - Display the calculated monthly payment prominently

5. **Responsive Design**
   - Details should be readable on all screen sizes
   - Consider using a card layout or two-column layout on desktop

6. **Accessibility**
   - Proper heading hierarchy
   - Semantic HTML elements
   - ARIA landmarks where appropriate

### API Endpoints
- `GET /api/loans/:id` - Get loan by ID
- `GET /api/borrowers/:id` - Get borrower by ID

### Example Borrower Object
```json
{
  "id": 101,
  "name": "John Doe",
  "email": "john.doe@example.com",
  "phone": "555-1234"
}
```

---

## Bonus Tasks (Optional - if time permits)

1. **Error Handling Service**
   - Create a global error handling service
   - Display user-friendly error messages
   - Log errors appropriately

2. **Unit Tests**
   - Write unit tests for at least one component using Jasmine
   - Test form validation logic
   - Test API service methods

3. **Loading Interceptor**
   - Create an HTTP interceptor to show a global loading indicator
   - Show loading spinner during API calls

---

## Notes

- Use Angular best practices throughout
- Follow TypeScript conventions
- Write clean, maintainable code
- Add comments where necessary
- Ensure cross-browser compatibility (Chrome, Firefox, Safari, Edge)
- Test your implementation on different screen sizes
- Consider accessibility from the start, don't add it as an afterthought

## Getting Started

1. Review the existing codebase structure
2. Start with Task 1, then proceed to Task 2 and Task 3
3. Test each task as you complete it
4. Ensure the application runs without errors

Good luck!
