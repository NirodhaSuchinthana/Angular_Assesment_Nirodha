import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

export interface Loan {
  id: number;
  borrowerId: number;
  borrowerName: string;
  amount: number;
  interestRate: number;
  status: "Active" | "Pending" | "Closed";
  termMonths?: number;
  purpose?: string;
  createdDate: string;
}

export interface Borrower {
  id: number;
  name: string;
  email: string;
  phone: string;
}

import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class LoanService {
  private apiUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getLoans(): Observable<Loan[]> {
    return this.http.get<Loan[]>(`${this.apiUrl}/loans`);
  }

  getLoanById(id: number): Observable<Loan> {
    return this.http.get<Loan>(`${this.apiUrl}/loans/${id}`);
  }

  createLoan(loan: Partial<Loan>): Observable<Loan> {
    return this.http.post<Loan>(`${this.apiUrl}/loans`, loan);
  }

  updateLoan(id: number, loan: Partial<Loan>): Observable<Loan> {
    return this.http.put<Loan>(`${this.apiUrl}/loans/${id}`, loan);
  }

  deleteLoan(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/loans/${id}`);
  }

  getBorrowers(): Observable<Borrower[]> {
    return this.http.get<Borrower[]>(`${this.apiUrl}/borrowers`);
  }

  getBorrowerById(id: number): Observable<Borrower> {
    return this.http.get<Borrower>(`${this.apiUrl}/borrowers/${id}`);
  }
}
