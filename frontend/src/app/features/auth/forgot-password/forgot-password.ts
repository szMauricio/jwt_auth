import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { Auth } from '../../../services/auth/auth';
import { Notification } from '../../../services/notification/notification';

@Component({
  selector: 'app-forgot-password',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.css',
})
export class ForgotPassword {
  forgotPasswordForm: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: Auth,
    private notificationService: Notification,
    private router: Router
  ) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit(): void {
    if (this.forgotPasswordForm.valid) {
      this.isLoading = true;
      const email = this.forgotPasswordForm.get('email')?.value;

      this.authService.forgotPassword(email).subscribe({
        next: (response) => {
          this.notificationService.showSuccess('Reset password email sent! Check your inbox.');
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Error sending reset email', error);
          this.notificationService.showError('Error sending reset email. Please try again.');
        },
        complete: () => {
          this.isLoading = false;
        },
      });
    }
  }
}
