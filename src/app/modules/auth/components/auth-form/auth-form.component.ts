import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FakeAuthService } from '../../services/fake-auth.service';
import { ToastService } from '../../../shared/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrl: './auth-form.component.scss'
})
export class AuthFormComponent {
  authForm: FormGroup;
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private fakeAuthService: FakeAuthService,
    private toastService: ToastService,
    private router: Router,
  ) {
    this.authForm = this.fb.group({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required])
    });
  }

  getFormControl(control: AbstractControl | null): FormControl {
    return control as FormControl;
  }

  onSubmit(): void {
    this.isLoading = true;
    const body = {
      email: this.authForm.get('email')?.value,
      password: this.authForm.get('password')?.value,
    };
    this.fakeAuthService.login(body)
      .then(() => {
        this.router.navigate(['/admin']);
      })
      .catch(() => {
        this.toastService.show({
          type: 'warning',
          text: 'Wrong password or login',
        });
      })
      .finally(() => {
        this.isLoading = false;
      });
  }
}
