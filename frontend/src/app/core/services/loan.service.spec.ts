import { TestBed } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { LoanService, Loan } from "./loan.service";
import { environment } from "src/environments/environment";

describe("LoanService", () => {
  let service: LoanService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LoanService],
    });
    service = TestBed.inject(LoanService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should retrieve loans from the API", () => {
    const dummyLoans: Loan[] = [
      {
        id: 1,
        borrowerId: 101,
        borrowerName: "John Doe",
        amount: 10000,
        interestRate: 5,
        termMonths: 12,
        purpose: "Other",
        status: "Pending",
        createdDate: "2023-01-01",
      },
      {
        id: 2,
        borrowerId: 102,
        borrowerName: "Jane Smith",
        amount: 20000,
        interestRate: 4,
        termMonths: 24,
        purpose: "Home Improvement",
        status: "Active",
        createdDate: "2023-01-02",
      },
    ];

    service.getLoans().subscribe((loans) => {
      expect(loans.length).toBe(2);
      expect(loans).toEqual(dummyLoans);
    });

    const req = httpMock.expectOne(`${environment.baseUrl}/loans`);
    expect(req.request.method).toBe("GET");
    req.flush(dummyLoans);
  });

  it("should retrieve a single loan by ID", () => {
    const dummyLoan: Loan = {
      id: 1,
      borrowerId: 101,
      borrowerName: "John Doe",
      amount: 10000,
      interestRate: 5,
      termMonths: 12,
      purpose: "Other",
      status: "Pending",
      createdDate: "2023-01-01",
    };

    service.getLoanById(1).subscribe((loan) => {
      expect(loan).toEqual(dummyLoan);
    });

    const req = httpMock.expectOne(`${environment.baseUrl}/loans/1`);
    expect(req.request.method).toBe("GET");
    req.flush(dummyLoan);
  });

  it("should create a new loan", () => {
    const newLoan: Loan = {
      id: 3,
      borrowerId: 103,
      borrowerName: "Bob Jones",
      amount: 30000,
      interestRate: 3.5,
      termMonths: 36,
      purpose: "Refinance",
      status: "Pending",
      createdDate: jasmine.any(String) as any,
    };
    const loanData = {
      borrowerName: "Bob Jones",
      amount: 30000,
      interestRate: 3.5,
      termMonths: 36,
      purpose: "Refinance",
    };

    service.createLoan(loanData).subscribe((loan) => {
      expect(loan).toEqual(newLoan);
    });

    const req = httpMock.expectOne(`${environment.baseUrl}/loans`);
    expect(req.request.method).toBe("POST");
    expect(req.request.body).toEqual(jasmine.objectContaining(loanData));
    req.flush(newLoan);
  });
});
