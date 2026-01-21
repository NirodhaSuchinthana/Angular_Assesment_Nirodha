import { Component } from "@angular/core";
import { LoadingService } from "src/app/core/services/loading.service";

@Component({
  selector: "app-spinner",
  template: `
    <div *ngIf="loadingService.isLoading$ | async" class="overlay">
      <div class="spinner"></div>
    </div>
  `,
  styles: [
    `
      .overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(255, 255, 255, 0.7);
        z-index: 10000;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .spinner {
        width: 50px;
        height: 50px;
        border: 5px solid #f3f3f3;
        border-top: 5px solid #0056b3;
        border-radius: 50%;
        animation: spin 1s linear infinite;
      }

      @keyframes spin {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    `,
  ],
})
export class SpinnerComponent {
  constructor(public loadingService: LoadingService) {}
}
