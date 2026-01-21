import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoanListComponent } from "./components/loan-list/loan-list.component";
import { LoanApplicationComponent } from "./components/loan-application/loan-application.component";
import { LoanDetailComponent } from "./components/loan-detail/loan-detail.component";

const routes: Routes = [
  { path: "", component: LoanListComponent },
  { path: "apply", component: LoanApplicationComponent },
  { path: "edit/:id", component: LoanApplicationComponent },
  { path: ":id", component: LoanDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoansRoutingModule {}
