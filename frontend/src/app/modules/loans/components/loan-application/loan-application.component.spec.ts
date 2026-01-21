import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { LoanApplicationComponent } from "./loan-application.component";
import { LoanService } from "src/app/core/services/loan.service";
import { of } from "rxjs";

describe("LoanApplicationComponent", () => {
  let component: LoanApplicationComponent;
  let fixture: ComponentFixture<LoanApplicationComponent>;
  let loanService: jasmine.SpyObj<LoanService>;

  beforeEach(async () => {
    const loanServiceSpy = jasmine.createSpyObj("LoanService", ["createLoan"]);

    await TestBed.configureTestingModule({
      declarations: [LoanApplicationComponent],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientTestingModule,
      ],
      providers: [{ provide: LoanService, useValue: loanServiceSpy }],
    }).compileComponents();

    loanService = TestBed.inject(LoanService) as jasmine.SpyObj<LoanService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("form should be invalid when empty", () => {
    expect(component.loanForm.valid).toBeFalsy();
  });

  it("borrowerName field validity", () => {
    const borrowerName = component.loanForm.controls["borrowerName"];
    expect(borrowerName.valid).toBeFalsy();

    borrowerName.setValue("");
    expect(borrowerName.hasError("required")).toBeTruthy();

    borrowerName.setValue("A");
    expect(borrowerName.hasError("minlength")).toBeTruthy();

    borrowerName.setValue("John Doe");
    expect(borrowerName.valid).toBeTruthy();
  });

  it("amount field validity", () => {
    const amount = component.loanForm.controls["amount"];

    amount.setValue(null);
    expect(amount.hasError("required")).toBeTruthy();

    amount.setValue(500);
    expect(amount.hasError("min")).toBeTruthy();

    amount.setValue(2000000);
    expect(amount.hasError("max")).toBeTruthy();

    amount.setValue(50000);
    expect(amount.valid).toBeTruthy();
  });

  it("should call loanService.createLoan when form is valid and submitted", () => {
    component.loanForm.controls["borrowerName"].setValue("John Doe");
    component.loanForm.controls["amount"].setValue(50000);
    component.loanForm.controls["interestRate"].setValue(5);
    component.loanForm.controls["termMonths"].setValue(24);
    component.loanForm.controls["purpose"].setValue("Refinance");

    expect(component.loanForm.valid).toBeTruthy();

    loanService.createLoan.and.returnValue(of({} as any));

    component.onSubmit();

    expect(loanService.createLoan).toHaveBeenCalled();
  });
});
