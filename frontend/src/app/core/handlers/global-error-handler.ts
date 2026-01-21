import { ErrorHandler, Injectable, Injector, NgZone } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { NotificationService } from "../services/notification.service";

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(
    private injector: Injector,
    private zone: NgZone,
  ) {}

  handleError(error: any): void {
    const notificationService = this.injector.get(NotificationService);

    // Check if it's an error from an HTTP response
    if (error instanceof HttpErrorResponse) {
      // Server or connection error happened
      if (!navigator.onLine) {
        // No Internet connection
        return notificationService.showError("No Internet Connection");
      }

      this.zone.run(() => {
        notificationService.showError(
          `${error.status} - ${error.statusText || "Unknown Error"}`,
        );
      });
    } else {
      // Client Error
      this.zone.run(() => {
        notificationService.showError(
          error.message || "An unexpected error occurred",
        );
      });
      console.error("Global Error Handler:", error);
    }
  }
}
