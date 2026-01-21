import { Component, OnInit } from "@angular/core";
import { Loan, LoanService } from "src/app/core/services/loan.service";
import { DialogService } from "src/app/core/services/dialog.service";

@Component({
  selector: "app-loan-list",
  templateUrl: "./loan-list.component.html",
  styleUrls: ["./loan-list.component.css"],
})
export class LoanListComponent implements OnInit {
  loans: Loan[] = [];
  filteredLoans: Loan[] = [];

  // Filters
  statusFilter: string = "";
  nameFilter: string = "";

  // Sorting
  sortColumn: keyof Loan | "" = "";
  sortDirection: "asc" | "desc" = "asc";

  isLoading = true;
  error = "";

  constructor(
    private loanService: LoanService,
    private dialogService: DialogService,
  ) {}

  ngOnInit(): void {
    this.loadLoans();
  }

  loadLoans(): void {
    this.isLoading = true;
    this.loanService.getLoans().subscribe({
      next: (data) => {
        this.loans = data;
        this.applyFilters();
        this.isLoading = false;
      },
      error: (err) => {
        this.error = "Failed to load loans. Please try again later.";
        this.isLoading = false;
        console.error("Error loading loans", err);
      },
    });
  }

  applyFilters(): void {
    this.filteredLoans = this.loans.filter((loan) => {
      const matchesStatus = this.statusFilter
        ? loan.status === this.statusFilter
        : true;
      const matchesName = this.nameFilter
        ? loan.borrowerName
            .toLowerCase()
            .includes(this.nameFilter.toLowerCase())
        : true;
      return matchesStatus && matchesName;
    });

    // Re-apply sort if active
    if (this.sortColumn) {
      this.sortLoans(this.sortColumn);
    }
  }

  onFilterChange(): void {
    this.applyFilters();
  }

  sort(column: keyof Loan): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === "asc" ? "desc" : "asc";
    } else {
      this.sortColumn = column;
      this.sortDirection = "asc";
    }
    this.sortLoans(column);
  }

  sortLoans(column: keyof Loan): void {
    this.filteredLoans.sort((a, b) => {
      const valA = a[column];
      const valB = b[column];

      if (valA === undefined || valB === undefined) return 0;

      if (valA < valB) {
        return this.sortDirection === "asc" ? -1 : 1;
      } else if (valA > valB) {
        return this.sortDirection === "asc" ? 1 : -1;
      } else {
        return 0;
      }
    });
  }

  getSortIcon(column: string): string {
    if (this.sortColumn !== column) return "↕";
    return this.sortDirection === "asc" ? "↑" : "↓";
  }

  getSortAriaLabel(column: string): string {
    if (this.sortColumn !== column) {
      return `Sort by ${column}`;
    }
    return `Sort by ${column} ${this.sortDirection === "asc" ? "descending" : "ascending"}`;
  }

  deleteLoan(id: number, event: Event): void {
    event.stopPropagation();
    this.dialogService
      .confirm("Are you sure you want to delete this loan?", "Delete Loan")
      .subscribe((confirmed) => {
        if (confirmed) {
          this.loanService.deleteLoan(id).subscribe({
            next: () => {
              this.loadLoans(); // Reload list
            },
            error: (err) => {
              console.error("Error deleting loan", err);
              this.error = "Failed to delete loan. Please try again.";
            },
          });
        }
      });
  }
}
