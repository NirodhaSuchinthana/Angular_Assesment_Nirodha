import {
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { Subject, takeUntil } from "rxjs";
import {
  DialogService,
  DialogOptions,
} from "src/app/core/services/dialog.service";

@Component({
  selector: "app-confirmation-dialog",
  template: `
    <div
      *ngIf="dialogService.dialogState$ | async as options"
      class="dialog-overlay"
    >
      <div class="dialog-content">
        <h2 class="dialog-title">{{ options.title }}</h2>
        <p class="dialog-message">{{ options.message }}</p>
        <div class="dialog-actions">
          <button #cancelBtn (click)="onCancel()" class="btn-cancel">
            {{ options.cancelText || "Cancel" }}
          </button>
          <button #confirmBtn (click)="onConfirm()" class="btn-confirm">
            {{ options.confirmText || "Confirm" }}
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .dialog-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 2000;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .dialog-content {
        background-color: white;
        padding: 24px;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        max-width: 400px;
        width: 90%;
        text-align: center;
      }

      .dialog-title {
        margin-top: 0;
        color: #333;
        font-size: 1.25rem;
      }

      .dialog-message {
        color: #666;
        margin-bottom: 24px;
      }

      .dialog-actions {
        display: flex;
        justify-content: flex-end;
        gap: 12px;
      }

      button {
        padding: 8px 16px;
        border-radius: 4px;
        border: none;
        cursor: pointer;
        font-weight: 500;
        transition: background-color 0.2s;
      }

      .btn-cancel {
        background-color: #e9ecef;
        color: #495057;
      }

      .btn-cancel:hover {
        background-color: #dee2e6;
      }

      .btn-confirm {
        background-color: #dc3545;
        color: white;
      }

      .btn-confirm:hover {
        background-color: #c82333;
      }
    `,
  ],
})
export class ConfirmationDialogComponent implements OnInit, OnDestroy {
  @ViewChild("confirmBtn") confirmBtn!: ElementRef;
  @ViewChild("cancelBtn") cancelBtn!: ElementRef;

  private previousActiveElement: HTMLElement | null = null;
  private destroy$ = new Subject<void>();

  constructor(public dialogService: DialogService) {}

  ngOnInit(): void {
    this.dialogService.dialogState$
      .pipe(takeUntil(this.destroy$))
      .subscribe((options) => {
        if (options) {
          this.previousActiveElement = document.activeElement as HTMLElement;
          setTimeout(() => {
            if (this.cancelBtn) {
              this.cancelBtn.nativeElement.focus();
            }
          });
        } else {
          if (this.previousActiveElement) {
            this.previousActiveElement.focus();
            this.previousActiveElement = null;
          }
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  @HostListener("document:keydown.escape", ["$event"])
  onKeydownHandler(event: KeyboardEvent) {
    this.onCancel();
  }

  @HostListener("document:keydown.tab", ["$event"])
  onTab(event: KeyboardEvent) {
    const dialogState = document.querySelector(".dialog-overlay");
    if (!dialogState) return;

    const focusableElements = dialogState.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[
      focusableElements.length - 1
    ] as HTMLElement;

    if (event.shiftKey) {
      if (document.activeElement === firstElement) {
        lastElement.focus();
        event.preventDefault();
      }
    } else {
      if (document.activeElement === lastElement) {
        firstElement.focus();
        event.preventDefault();
      }
    }
  }

  onConfirm(): void {
    this.dialogService.resolve(true);
  }

  onCancel(): void {
    this.dialogService.resolve(false);
  }
}
