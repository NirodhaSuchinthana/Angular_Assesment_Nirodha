import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";

export interface DialogOptions {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
}

@Injectable({
  providedIn: "root",
})
export class DialogService {
  private dialogStateSubject = new BehaviorSubject<DialogOptions | null>(null);
  public dialogState$ = this.dialogStateSubject.asObservable();

  private confirmationSubject = new Subject<boolean>();

  constructor() {}

  confirm(
    message: string,
    title: string = "Confirm Action",
  ): Observable<boolean> {
    this.dialogStateSubject.next({
      title,
      message,
      confirmText: "Confirm",
      cancelText: "Cancel",
    });

    // Reset subject for new subscription
    this.confirmationSubject = new Subject<boolean>();
    return this.confirmationSubject.asObservable();
  }

  resolve(result: boolean): void {
    this.dialogStateSubject.next(null);
    this.confirmationSubject.next(result);
    this.confirmationSubject.complete();
  }
}
