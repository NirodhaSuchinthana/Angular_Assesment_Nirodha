import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  // TODO: Add routes for loan list, loan application, and loan details
  // { path: 'loans', component: LoanListComponent },
  // { path: 'loans/apply', component: LoanApplicationComponent },
  // { path: 'loans/:id', component: LoanDetailComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
