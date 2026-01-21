# Quick Setup Guide

## Prerequisites Check

Before starting, verify you have:
- Node.js v18+ installed: `node --version`
- npm v9+ installed: `npm --version`
- Angular CLI installed: `npm install -g @angular/cli`

## Installation Steps

### 1. Install Backend Dependencies

```bash
cd backend
npm install
```

### 2. Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

## Running the Application

### Start Backend Server

Open a terminal and run:

```bash
cd backend
npm start
```

You should see:
```
Server is running on http://localhost:3000
API endpoints available at http://localhost:3000/api
```

### Start Frontend Application

Open a **new terminal** and run:

```bash
cd frontend
ng serve
```

You should see:
```
✔ Browser application bundle generation complete.
** Angular Live Development Server is listening on localhost:4200 **
```

### Access the Application

- Frontend: http://localhost:4200
- Backend API: http://localhost:3000/api

## Testing the API

You can test the API endpoints using curl or a tool like Postman:

```bash
# Get all loans
curl http://localhost:3000/api/loans

# Get a specific loan
curl http://localhost:3000/api/loans/1

# Get all borrowers
curl http://localhost:3000/api/borrowers
```

## Troubleshooting

### Port Already in Use

If port 3000 or 4200 is already in use:

**Backend:**
```bash
# Set a different port
PORT=3001 npm start
```

**Frontend:**
```bash
# Use a different port
ng serve --port 4201
```
Then update the API URL in `frontend/src/app/services/loan.service.ts` if needed.

### Angular CLI Not Found

If you get an error about Angular CLI not being found:

```bash
npm install -g @angular/cli@15
```

### Module Not Found Errors

If you encounter module not found errors:

1. Delete `node_modules` folders in both backend and frontend
2. Delete `package-lock.json` files
3. Run `npm install` again in both directories

### VPN Interference (Astrill VPN, etc.)

If you're using a VPN and the application doesn't load:

**Option 1: Use 127.0.0.1 instead of localhost**

Update `frontend/proxy.conf.json`:
```json
{
  "/api": {
    "target": "http://127.0.0.1:3000",
    "secure": false,
    "changeOrigin": true,
    "logLevel": "debug"
  }
}
```

Then access the app at: `http://127.0.0.1:4200` instead of `http://localhost:4200`

**Option 2: Configure VPN to bypass localhost**

- In Astrill VPN: Go to Settings → Mode → Enable "Bypass VPN for local addresses"
- Or add `localhost` and `127.0.0.1` to VPN bypass list

**Option 3: Temporarily disable VPN**

For local development, you can temporarily disable the VPN to test if it's the cause.

## Next Steps

1. Read `TASKS.md` for detailed task requirements
2. Review the existing code structure
3. Start implementing the tasks
4. Test your implementation thoroughly

Good luck with your assessment!
