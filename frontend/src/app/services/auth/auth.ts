import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AuthResponse } from '../../models/auth/auth-response';
import { LoginRequest } from '../../models/auth/login-request';
import { RegisterRequest } from '../../models/auth/register-request';
import { ResetPasswordRequest } from '../../models/auth/reset-password-request';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private apiUrl = 'http://localhost:8080/auth';
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'user_data';

  constructor(private http: HttpClient) {}

  register(registerReq: RegisterRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/register`, registerReq)
      .pipe(tap((res) => this.storeAuthData(res)));
  }

  login(loginReq: LoginRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/login`, loginReq)
      .pipe(tap((res) => this.storeAuthData(res)));
  }

  checkEmail(email: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/check-email`, {
      params: { email },
    });
  }

  forgotPassword(email: string): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/forgot-password`, null, {
      params: { email },
    });
  }

  resetPassword(request: ResetPasswordRequest): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/reset-password`, request);
  }

  private storeAuthData(response: AuthResponse): void {
    localStorage.setItem(this.TOKEN_KEY, response.token);
    localStorage.setItem(
      this.USER_KEY,
      JSON.stringify({
        email: response.email,
        role: response.role,
      })
    );
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getUser(): any {
    const user = localStorage.getItem(this.USER_KEY);
    return user ? JSON.parse(user) : null;
  }

  isLoggedIn(): boolean {
    const token = this.getToken();

    if (!token) {
      return false;
    }
    try {
      const tokenParts = token.split('.');
      if (tokenParts.length !== 3) {
        this.logout();
        return false;
      }

      return true;
    } catch (error) {
      this.logout();
      return false;
    }
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
  }
}
