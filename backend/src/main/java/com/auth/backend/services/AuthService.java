package com.auth.backend.services;

import com.auth.backend.dtos.AuthResponse;
import com.auth.backend.dtos.LoginRequest;
import com.auth.backend.dtos.RegisterRequest;
import com.auth.backend.dtos.ResetPasswordRequest;

public interface AuthService {
    AuthResponse register(RegisterRequest request);

    AuthResponse login(LoginRequest request);

    boolean userExists(String email);

    String forgotPassword(String email);

    String resetPassword(ResetPasswordRequest request);
}
