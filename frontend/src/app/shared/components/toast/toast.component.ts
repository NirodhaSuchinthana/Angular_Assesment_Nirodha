import { Component, OnInit } from "@angular/core";
import {
  NotificationService,
  ToastMessage,
} from "src/app/core/services/notification.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-toast",
  template: `
    <div class="toast-container">
      <div
        *ngFor="let toast of toasts$ | async"
        class="toast"
        [ngClass]="toast.type"
        (click)="removeToast(toast.id)"
      >
        <span class="message">{{ toast.message }}</span>
        <span class="close-btn">&times;</span>
      </div>
    </div>
  `,
  styles: [
    `
      .toast-container {
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 9999;
        display: flex;
        flex-direction: column;
        gap: 10px;
        pointer-events: none; /* Allow clicking through container */
      }

      .toast {
        padding: 15px 20px;
        border-radius: 4px;
        background-color: white;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        min-width: 300px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
        animation: slideIn 0.3s ease-out;
        pointer-events: auto; /* Re-enable pointer events for toasts */
        color: white;
        font-weight: 500;
      }

      .toast.success {
        background-color: #28a745;
      }
      .toast.error {
        background-color: #dc3545;
      }
      .toast.info {
        background-color: #17a2b8;
      }

      .close-btn {
        font-size: 1.2rem;
        margin-left: 10px;
        opacity: 0.8;
      }

      .toast:hover .close-btn {
        opacity: 1;
      }

      @keyframes slideIn {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
    `,
  ],
})
export class ToastComponent implements OnInit {
  toasts$: Observable<ToastMessage[]>;

  constructor(private notificationService: NotificationService) {
    this.toasts$ = this.notificationService.toasts$;
  }

  ngOnInit(): void {}

  removeToast(id: number): void {
    this.notificationService.removeToast(id);
  }
}
