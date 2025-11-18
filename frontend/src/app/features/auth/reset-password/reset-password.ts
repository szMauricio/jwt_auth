import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Auth } from '../../../services/auth/auth';
import { Notification } from '../../../services/notification/notification';
import { ActivatedRoute, Router } from '@angular/router';
import { ResetPasswordRequest } from '../../../models/auth/reset-password-request';

@Component({
  selector: 'app-reset-password',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.css',
})
export class ResetPassword implements OnInit {
  resetPasswordForm: FormGroup;
  token: string = '';
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: Auth,
    private notificationService: Notification,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.resetPasswordForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.token = params['token'];
      if (!this.token) {
        this.notificationService.showError('Invalid reset link');
        this.router.navigate(['/login']);
      }
    });
  }

  onSubmit(): void {
    if (this.resetPasswordForm.valid) {
      const newPassword = this.resetPasswordForm.get('newPassword')?.value;
      const confirmPassword = this.resetPasswordForm.get('confirmPassword')?.value;

      if (newPassword !== confirmPassword) {
        this.notificationService.showError('Passwords do not match');
        return;
      }

      this.isLoading = true;

      const request: ResetPasswordRequest = {
        token: this.token,
        newPassword: newPassword,
      };

      this.authService.resetPassword(request).subscribe({
        next: (response) => {
          this.notificationService.showSuccess('Password reset successfully!');
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Error resetting password', error);
          this.notificationService.showError('Error resetting password. Please try again.');
        },
        complete: () => {
          this.isLoading = false;
        },
      });
    }
  }
}
