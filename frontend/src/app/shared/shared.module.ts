import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { ToastComponent } from "./components/toast/toast.component";
import { SpinnerComponent } from "./components/spinner/spinner.component";
import { ConfirmationDialogComponent } from "./components/confirmation-dialog/confirmation-dialog.component";

@NgModule({
  declarations: [ToastComponent, SpinnerComponent, ConfirmationDialogComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ToastComponent,
    SpinnerComponent,
    ConfirmationDialogComponent,
  ],
})
export class SharedModule {}
