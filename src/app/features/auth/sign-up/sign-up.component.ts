import { Router } from "@angular/router";
import { AuthStore } from "@app/shared/store";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import {
  GlobalService,
  ToastType,
} from "src/app/core/services/global-service.service";

@Component({
  selector: "conduit-sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpComponent implements OnInit {
  form: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authStore: AuthStore,
    private globalService: GlobalService
  ) {}

  ngOnInit(): void {
    this.form = this.initForm();
  }

  initForm() {
    return this.fb.group({
      username: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      password: [
        "",
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(32),
        ],
      ],
    });
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload = this.form.getRawValue();
    this.authStore.signup(payload).subscribe({
      next: (response) => {
        this.globalService.showMessage({
          message: response.message,
        });
        this.router.navigate(["/"]);
      },
      error: (error) => {
        console.log(error);
        this.globalService.showMessage({
          type: ToastType.Error,
          message:
            error?.error?.message ||
            "Something went wrong. Please try again later.",
        });
      },
    });
  }
}
