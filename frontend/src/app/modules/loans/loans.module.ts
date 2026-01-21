import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

import { LoansRoutingModule } from "./loans-routing.module";
import { LoanListComponent } from "./components/loan-list/loan-list.component";
import { LoanApplicationComponent } from "./components/loan-application/loan-application.component";
import { LoanDetailComponent } from "./components/loan-detail/loan-detail.component";

@NgModule({
  declarations: [
    LoanListComponent,
    LoanApplicationComponent,
    LoanDetailComponent,
  ],
  imports: [CommonModule, LoansRoutingModule, ReactiveFormsModule, FormsModule],
})
export class LoansModule {}
