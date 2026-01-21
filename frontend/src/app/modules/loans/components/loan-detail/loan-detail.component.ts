import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { forkJoin, switchMap, map, catchError, of } from "rxjs";
import {
  Borrower,
  Loan,
  LoanService,
} from "src/app/core/services/loan.service";
import { DialogService } from "src/app/core/services/dialog.service";

@Component({
  selector: "app-loan-detail",
  templateUrl: "./loan-detail.component.html",
  styleUrls: ["./loan-detail.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoanDetailComponent implements OnInit {
  loan: Loan | null = null;
  borrower: Borrower | null = null;
  monthlyPayment: number = 0;

  isLoading = true;
  error = "";

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private loanService: LoanService,
    private cdr: ChangeDetectorRef,
    private dialogService: DialogService,
  ) {}

  ngOnInit(): void {
    const loanId = Number(this.route.snapshot.paramMap.get("id"));
    if (!loanId) {
      this.error = "Invalid loan ID";
      this.isLoading = false;
      return;
    }

    this.loadData(loanId);
  }

  loadData(loanId: number): void {
    this.isLoading = true;
    this.error = "";

    this.loanService
      .getLoanById(loanId)
      .pipe(
        switchMap((loan) => {
          this.loan = loan;
          this.calculateMonthlyPayment();

          // Fetch borrower details if borrowerId exists
          if (loan.borrowerId) {
            return this.loanService.getBorrowerById(loan.borrowerId).pipe(
              catchError((err) => {
                console.warn("Could not fetch borrower details", err);
                return of(null);
              }),
            );
          } else {
            return of(null);
          }
        }),
        catchError((err) => {
          this.error = "Failed to load loan details.";
          console.error("Error loading loan", err);
          return of(null);
        }),
      )
      .subscribe({
        next: (borrower) => {
          this.borrower = borrower;
          this.isLoading = false;
          this.cdr.markForCheck(); // Required for OnPush
        },
        error: () => {
          this.isLoading = false;
          this.cdr.markForCheck();
        },
      });
  }

  calculateMonthlyPayment(): void {
    if (
      !this.loan ||
      !this.loan.amount ||
      !this.loan.interestRate ||
      !this.loan.termMonths
    ) {
      return;
    }

    const P = this.loan.amount;
    const r = this.loan.interestRate / 100 / 12;
    const n = this.loan.termMonths;

    // Formula: M = P * [r(1+r)^n] / [(1+r)^n - 1]
    if (r === 0) {
      this.monthlyPayment = P / n;
    } else {
      const numerator = r * Math.pow(1 + r, n);
      const denominator = Math.pow(1 + r, n) - 1;
      this.monthlyPayment = P * (numerator / denominator);
    }
  }

  goBack(): void {
    this.router.navigate(["/loans"]);
  }

  deleteLoan(): void {
    if (this.loan) {
      this.dialogService
        .confirm("Are you sure you want to delete this loan?", "Delete Loan")
        .subscribe((confirmed) => {
          if (confirmed && this.loan) {
            this.loanService.deleteLoan(this.loan.id).subscribe({
              next: () => {
                this.router.navigate(["/loans"]);
              },
              error: (err) => {
                console.error("Error deleting loan", err);
                this.error = "Failed to delete loan.";
                this.cdr.markForCheck();
              },
            });
          }
        });
    }
  }
}
