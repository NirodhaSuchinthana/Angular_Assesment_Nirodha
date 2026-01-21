import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

export interface ToastMessage {
  message: string;
  type: "success" | "error" | "info";
  id: number;
}

@Injectable({
  providedIn: "root",
})
export class NotificationService {
  private toastsSubject = new BehaviorSubject<ToastMessage[]>([]);
  public toasts$: Observable<ToastMessage[]> =
    this.toastsSubject.asObservable();
  private toastId = 0;

  constructor() {}

  showSuccess(message: string): void {
    this.addToast(message, "success");
  }

  showError(message: string): void {
    this.addToast(message, "error");
  }

  showInfo(message: string): void {
    this.addToast(message, "info");
  }

  removeToast(id: number): void {
    const currentToasts = this.toastsSubject.value;
    this.toastsSubject.next(currentToasts.filter((t) => t.id !== id));
  }

  private addToast(message: string, type: "success" | "error" | "info"): void {
    const id = this.toastId++;
    const newToast: ToastMessage = { message, type, id };
    const currentToasts = this.toastsSubject.value;
    this.toastsSubject.next([...currentToasts, newToast]);

    // Auto-remove after 5 seconds
    setTimeout(() => {
      this.removeToast(id);
    }, 5000);
  }
}
