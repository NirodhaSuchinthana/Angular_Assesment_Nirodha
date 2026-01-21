import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { LoanService } from "src/app/core/services/loan.service";

@Component({
  selector: "app-loan-application",
  templateUrl: "./loan-application.component.html",
  styleUrls: ["./loan-application.component.css"],
})
export class LoanApplicationComponent implements OnInit {
  loanForm: FormGroup;
  isSubmitting = false;
  submitError = "";
  submitSuccess = false;
  isEditMode = false;
  loanId: number | null = null;

  purposes = ["Home Purchase", "Refinance", "Home Improvement", "Other"];

  constructor(
    private fb: FormBuilder,
    private loanService: LoanService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.loanForm = this.fb.group({
      borrowerName: ["", [Validators.required, Validators.minLength(2)]],
      amount: [
        null,
        [Validators.required, Validators.min(1000), Validators.max(1000000)],
      ],
      interestRate: [
        null,
        [Validators.required, Validators.min(0.1), Validators.max(20)],
      ],
      termMonths: [
        null,
        [Validators.required, Validators.min(12), Validators.max(360)],
      ],
      purpose: ["", Validators.required],
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get("id");
    if (idParam) {
      this.isEditMode = true;
      this.loanId = +idParam;
      this.loadLoan(this.loanId);
    }
  }

  loadLoan(id: number): void {
    this.loanService.getLoanById(id).subscribe({
      next: (loan) => {
        this.loanForm.patchValue({
          borrowerName: loan.borrowerName,
          amount: loan.amount,
          interestRate: loan.interestRate,
          termMonths: loan.termMonths,
          purpose: loan.purpose,
        });
      },
      error: (err) => {
        console.error("Error loading loan", err);
        this.submitError = "Failed to load loan details.";
      },
    });
  }

  get f() {
    return this.loanForm.controls;
  }

  onSubmit(): void {
    if (this.loanForm.invalid) {
      return;
    }

    this.isSubmitting = true;
    this.submitError = "";

    const request =
      this.isEditMode && this.loanId
        ? this.loanService.updateLoan(this.loanId, this.loanForm.value)
        : this.loanService.createLoan(this.loanForm.value);

    request.subscribe({
      next: (loan) => {
        this.isSubmitting = false;
        this.submitSuccess = true;

        if (!this.isEditMode) {
          this.loanForm.reset();
        }

        // Optional: Navigate back to list after short delay or immediately
        setTimeout(() => {
          this.router.navigate(["/loans"]);
        }, 1500);
      },
      error: (err) => {
        this.isSubmitting = false;
        this.submitError = `Failed to ${this.isEditMode ? "update" : "submit"} loan application. Please try again.`;
        console.error("Error saving loan", err);
      },
    });
  }
}
